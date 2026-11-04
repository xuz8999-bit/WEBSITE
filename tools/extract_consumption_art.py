"""Use the supplied PDF's first artboard directly as an interactive SVG scene.
Usage: python3 tools/extract_consumption_art.py source.pdf
Requires PyMuPDF and Pillow. Original vector paths and painting order are retained.
"""
from pathlib import Path
from copy import deepcopy
from collections import defaultdict
import base64, hashlib, io, json, re, sys
import xml.etree.ElementTree as ET
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
MAP = json.loads((ROOT/'tools/consumption-map.json').read_text())
OUT = ROOT/'assets/consumption/original'
(OUT/'textures').mkdir(parents=True, exist_ok=True)
(OUT/'items').mkdir(parents=True, exist_ok=True)
NS = '{http://www.w3.org/2000/svg}'
ET.register_namespace('', NS[1:-1])
page = fitz.open(SOURCE)[0]
root = ET.fromstring(page.get_svg_image(text_as_path=True))
original_paths = []
def collect(node):
    if node.tag == NS+'defs':
        return
    if node.tag == NS+'path':
        original_paths.append(node)
    for child in node:
        collect(child)
collect(root)
drawings = page.get_drawings()
assert len(original_paths) == len(drawings) == 1696, 'Inspect the new PDF before remapping.'

# Extract only the visible parts of the PDF's grain bitmaps, without recoloring,
# resampling or lossy encoding. These are textures, never a page screenshot.
parents = {child: parent for parent in root.iter() for child in parent}
texture_info = []
for image in root.iter(NS+'image'):
    key = next(k for k in image.attrib if k.rsplit('}',1)[-1]=='href')
    value = image.attrib[key]
    assert value.startswith('data:image/png;base64,')
    bitmap = Image.open(io.BytesIO(base64.b64decode(value.split(',',1)[1])))
    ancestor = parents[image]
    transform = ancestor.get('transform','')
    values = [float(x) for x in re.findall(r'-?\d+(?:\.\d+)?', transform)]
    assert values[:4] == [1,0,0,1]
    tx,ty = values[4:]
    x0,y0 = int(max(0,-tx)), int(max(0,-ty))
    x1,y1 = int(min(bitmap.width,1366-tx)), int(min(bitmap.height,768-ty))
    crop = bitmap.crop((x0,y0,x1,y1))
    filename = image.get('id')+'.png'
    crop.save(OUT/'textures'/filename, optimize=True)
    image.set('x',str(x0)); image.set('y',str(y0))
    image.set('width',str(crop.width)); image.set('height',str(crop.height))
    del image.attrib[key]; image.set('href','textures/'+filename)
    texture_info.append({'file':filename,'size':list(crop.size),'mode':crop.mode})
# SVG2 href works in both an external SVG and inline HTML SVG, including glyphs.
for node in root.iter():
    for key in list(node.attrib):
        if key.endswith('}href'):
            node.set('href',node.attrib.pop(key))

# Scene source copy: every original vector path, title glyph and clip preserved.
root.set('role','img');root.set('aria-label','Original Consumption illustration')
(OUT/'scene.svg').write_text(ET.tostring(root,encoding='unicode'),encoding='utf-8')

regions=[]
for slot,(sku,x,y,w,h,*_) in enumerate(MAP['placements']):
    regions.append((sku,fitz.Rect(x*1366/600,y*768/338,(x+w)*1366/600,(y+h)*768/338)))
labels=[]
for drawing in drawings:
    r=drawing['rect'];center=fitz.Point((r.x0+r.x1)/2,(r.y0+r.y1)/2);candidates=[]
    for slot,(sku,bounds) in enumerate(regions):
        expanded=bounds+(-12,-12,12,12)
        if center not in expanded:continue
        overlap=(r&expanded).get_area()/max(r.get_area(),.01)
        if overlap<.8:continue
        score=((center.x-(bounds.x0+bounds.x1)/2)/bounds.width)**2+((center.y-(bounds.y0+bounds.y1)/2)/bounds.height)**2
        candidates.append((score,slot))
    labels.append(min(candidates)[1] if candidates else None)

# Keep shelf architecture, basket handles and carton details stationary. The PDF
# occasionally interleaves paths of distant products; spatial mapping retains
# those correctly. These four overlapping foreground objects need explicit runs.
for index in list(range(0,25))+[28,29,33,34,35]+list(range(52,57))+list(range(68,72))+list(range(1391,1696)):
    labels[index]=None
for start,end,sku in [(121,184,'shop-saba'),(770,824,'shop-rice'),(859,892,'shop-olive'),(893,970,'shop-pasta'),(1293,1313,'shop-mug-dots'),(1314,1337,'shop-mug-blue'),(1521,1528,'shop-small-oil')]:
    slot=next(i for i,(id,_) in enumerate(regions) if id==sku)
    for index in range(start,end+1):labels[index]=slot

slot_members=defaultdict(list)
for index,slot in enumerate(labels):
    if slot is not None:slot_members[slot].append(index)
assert len(slot_members)==len(regions), 'Every visible stock item needs a bound group.'
manifest={}
for slot,indexes in slot_members.items():
    sku,_=regions[slot]
    # Repeated cups/apples use one isolated source icon per SKU in the gallery.
    if sku in manifest:continue
    bounds=fitz.Rect(drawings[indexes[0]]['rect'])
    for index in indexes[1:]:bounds|=drawings[index]['rect']
    bounds+=(-1,-1,1,1)
    asset=ET.Element(NS+'svg',{'viewBox':f'{bounds.x0} {bounds.y0} {bounds.width} {bounds.height}', 'width':str(bounds.width),'height':str(bounds.height)})
    for index in indexes:asset.append(deepcopy(original_paths[index]))
    (OUT/'items'/(sku+'.svg')).write_text(ET.tostring(asset,encoding='unicode'),encoding='utf-8')
    manifest[sku]={**MAP['metadata'][sku],'width':bounds.width,'height':bounds.height,'paths':len(indexes),'file':f'assets/consumption/original/items/{sku}.svg'}
assert set(manifest)==set(MAP['metadata'])

# Wrap paths in place: do not reorder or replace original art, and leave source
# transforms on their original child paths. Only the wrappers receive tiny motion.
path_indexes={node:index for index,node in enumerate(original_paths)}
wrapper_count=0
for parent in list(root.iter()):
    if not any(child in path_indexes for child in parent):continue
    children=[];active=None;active_slot=None
    for child in list(parent):
        index=path_indexes.get(child)
        slot=labels[index] if index is not None else None
        if slot is None:
            children.append(child);active=None;active_slot=None
            continue
        if active is None or active_slot!=slot:
            active=ET.Element(NS+'g',{'class':'pdf-shop-stock','data-stock-slot':str(slot),'style':f'--stock-delay:-{(slot%7)*.8}s'})
            children.append(active);active_slot=slot;wrapper_count+=1
        active.append(child)
    parent[:]=children
print('Independent contiguous motion groups:',wrapper_count)
for node in root.iter(NS+'image'):
    node.set('href','assets/consumption/original/'+node.get('href'))
defs=root.find(NS+'defs')
clip=ET.SubElement(defs,NS+'clipPath',{'id':'shop-bag-pocket-clip','clipPathUnits':'userSpaceOnUse'})
ET.SubElement(clip,NS+'path',{'d':'M596 290H950V421Q855 424 778 416Q679 410 596 415Z'})
pocket=ET.Element(NS+'g',{'data-bag-contents':'','clip-path':'url(#shop-bag-pocket-clip)','aria-hidden':'true'})
current_parents={child:parent for parent in root.iter() for child in parent}
anchor_path=original_paths[1451]
parent=current_parents[anchor_path];parent.insert(list(parent).index(anchor_path),pocket)
root.set('class','illustration original-shop-svg');root.set('aria-hidden','true')
root.attrib.pop('role',None);root.attrib.pop('aria-label',None)
source_svg=ET.tostring(root,encoding='unicode')

# Stable, full-object HTML hit areas preserve keyboard access and do not jitter
# with the stock's decorative motion. Data IDs retain the existing purchase flow.
hitboxes=[]
for slot,(sku,bounds) in enumerate(regions):
    indexes=slot_members[slot];b=fitz.Rect(drawings[indexes[0]]['rect'])
    for index in indexes[1:]:b|=drawings[index]['rect']
    hitboxes.append({'order':max(indexes),'sku':sku,'name':MAP['metadata'][sku]['name'],'slot':slot,'x':b.x0/1366*100,'y':b.y0/768*100,'w':b.width/1366*100,'h':b.height/768*100})
hitboxes.sort(key=lambda item:item['order'])
code='''/* Original first PDF artboard; generated by tools/extract_consumption_art.py. */\n(() => {\n'''
code+='  const sourceSvg='+json.dumps(source_svg,ensure_ascii=False)+';\n'
code+='  const sourceItems='+json.dumps(manifest,ensure_ascii=False)+';\n'
code+='  const hitboxes='+json.dumps(hitboxes,ensure_ascii=False)+';\n'
code+='''  const art={};
  for(const[id,p]of Object.entries(sourceItems)){
    art[id]={name:p.name,tax:p.tax,box:`0 0 ${p.width} ${p.height}`,body:`<image href="${p.file}?v=source-pdf-1" width="${p.width}" height="${p.height}"/>`};
    BUREAU_WORLD.items.push({id,name:p.name,convenience:Math.ceil(p.tax/2),garbage:Math.floor(p.tax/2),tax:p.tax});
  }
  window.BUREAU_SHOP={art,icon:(id,cls='')=>`<svg class="product-icon ${cls}" viewBox="${art[id].box}" aria-hidden="true">${art[id].body}</svg>`};
  const controls=hitboxes.map(p=>`<button class="original-shop-hit" data-product="${p.sku}" data-stock-hit="${p.slot}" aria-label="Add ${p.name} to bag" style="left:${p.x}%;top:${p.y}%;width:${p.w}%;height:${p.h}%"></button>`).join('');
  BUREAU_SCENES.consumption=`<main class="scene world consumption source-shop" aria-label="Consumption"><h1 class="sr-only">CONSUMPTION</h1>${sourceSvg}${controls}<div class="bag-item-controls" data-bag-removers></div><button class="original-shop-bag" data-open-bag aria-label="Open shopping bag" title="Open bag and continue"><output class="shop-bag-count" data-bag-count aria-live="polite" hidden>0</output></button><button class="shop-audio-toggle" data-toggle-sound aria-label="Enable illustration sounds" aria-pressed="false" title="Click to enable illustration sounds">♪</button><button class="original-shop-back" data-route="/tax-system" aria-label="CONSUMPTION — return to TAX SYSTEM"></button></main>`;
})();
'''
(ROOT/'consumption-scene.js').write_text(code,encoding='utf-8')
hover_rules=[]
for slot,indexes in slot_members.items():
    b=fitz.Rect(drawings[indexes[0]]['rect'])
    for index in indexes[1:]:b|=drawings[index]['rect']
    cx,cy=(b.x0+b.x1)/2,(b.y0+b.y1)/2
    hover_rules.append(f'.source-shop [data-stock-slot="{slot}"] {{ transform-origin: {cx}px {cy}px; }}')
    hover_rules.append(f'.source-shop:has([data-stock-hit="{slot}"]:hover) [data-stock-slot="{slot}"], .source-shop:has([data-stock-hit="{slot}"]:focus-visible) [data-stock-slot="{slot}"] {{ scale: 1.025; }}')
    hover_rules.append(f'.source-shop:has([data-stock-hit="{slot}"]:active) [data-stock-slot="{slot}"] {{ scale: .985; }}')
(ROOT/'consumption-original.css').write_text('/* Generated per-object hover rules for the original PDF paths. */\n'+'\n'.join(hover_rules)+'\n',encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps({'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'page':1,'original_paths':len(original_paths),'textures':texture_info,'items':manifest},indent=2),encoding='utf-8')
print('Preserved',len(original_paths),'vector paths,',len(manifest),'isolated SKU assets,',len(hitboxes),'click targets.')
print('Original art bytes:',len(source_svg),'textures:',sum(p.stat().st_size for p in (OUT/'textures').iterdir()))
