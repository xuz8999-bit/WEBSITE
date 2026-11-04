"""Preserve PDF artboards 2–6 as interactive vector scenes, without redrawing.
Usage: python3 tools/extract_later_pages.py source.pdf
Dependencies: PyMuPDF, Pillow, fontTools.
"""
from pathlib import Path
from copy import deepcopy
from collections import defaultdict
import base64,hashlib,io,json,re,sys
import xml.etree.ElementTree as ET
import fitz
from PIL import Image
from fontTools.ttLib import TTFont
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(sys.argv[1]);doc=fitz.open(SOURCE)
OUT=ROOT/'assets/story/original';(OUT/'textures').mkdir(parents=True,exist_ok=True);(OUT/'items').mkdir(exist_ok=True)
NS='{http://www.w3.org/2000/svg}';ET.register_namespace('',NS[1:-1])
font=TTFont(io.BytesIO(doc.extract_font(doc[2].get_fonts()[0][0])[3]));font.save(OUT/'britannic.ttf')
scenes={};manifest={};goods={};keys=[]
regions={'bag':(120,125,495,650),'sundae':(590,130,790,345),'chips':(820,140,1010,350),'box':(1060,140,1310,370),'icepop':(610,420,780,660),'cup':(850,410,1010,650),'donuts':(1050,420,1320,660)}

def collect_paths(root):
 result=[]
 def walk(e):
  if e.tag==NS+'defs':return
  if e.tag==NS+'path':result.append(e)
  for child in e:walk(child)
 walk(root);return result

def wrap(root,paths,labels):
 indexes={e:i for i,e in enumerate(paths)}
 for parent in list(root.iter()):
  children=[];active=None;last=None
  for child in list(parent):
   i=indexes.get(child);label=labels.get(i)
   if label is None:children.append(child);active=None;last=None;continue
   if last!=label or active is None:
    active=ET.Element(NS+'g',{'class':'source-part '+label,'data-source-part':label});last=label
    if label=='source-paper':
     window=ET.Element(NS+'g',{'class':'source-paper-window','clip-path':'url(#story-paper-reveal)'});window.append(active);children.append(window)
    else:children.append(active)
    if label.startswith('source-product-'):active.set('style',f'--part-delay:-{list(regions).index(label[15:])*.73}s')
   active.append(child)
  parent[:]=children

def bound(ds,indexes):
 b=fitz.Rect(ds[indexes[0]]['rect'])
 for i in indexes[1:]:b|=ds[i]['rect']
 return [round(x,4) for x in b]

for pn,name in enumerate(['products','record','account','labor','receipt'],1):
 page=doc[pn];root=ET.fromstring(page.get_svg_image(text_as_path=True));paths=collect_paths(root);ds=page.get_drawings();assert len(paths)==len(ds)+(2 if name=='account' else 0)
 parents={c:e for e in root.iter() for c in e};textures=[]
 for im in root.iter(NS+'image'):
  key=next(k for k in im.attrib if k.endswith('href'));bitmap=Image.open(io.BytesIO(base64.b64decode(im.get(key).split(',',1)[1])))
  values=[float(x) for x in re.findall(r'[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?',parents[im].get('transform',''))];assert all(abs(a-b)<1e-6 for a,b in zip(values[:4],[1,0,0,1]))
  tx,ty=values[4:];x0,y0=max(0,int(-tx)),max(0,int(-ty));x1,y1=min(bitmap.width,int(1366-tx)),min(bitmap.height,int(768-ty))
  if x1<=x0 or y1<=y0:crop=Image.new(bitmap.mode,(1,1));x0=y0=0
  else:crop=bitmap.crop((x0,y0,x1,y1))
  data=io.BytesIO();crop.save(data,format='PNG',optimize=True);filename=hashlib.sha256(data.getvalue()).hexdigest()[:16]+'.png';(OUT/'textures'/filename).write_bytes(data.getvalue())
  im.set('x',str(x0));im.set('y',str(y0));im.set('width',str(crop.width));im.set('height',str(crop.height));im.attrib.pop(key);im.set('href','textures/'+filename);textures.append(filename)
 for e in root.iter():
  for key in list(e.attrib):
   if key.endswith('}href'):e.set('href',e.attrib.pop(key))
 # Save untouched path order and glyph outlines separately for source verification.
 (OUT/(name+'.svg')).write_text(ET.tostring(root,encoding='unicode'))
 labels={};groups=defaultdict(list)
 if name=='products':
  for i,d in enumerate(ds):
   r=d['rect'];center=fitz.Point((r.x0+r.x1)/2,(r.y0+r.y1)/2)
   matches=[id for id,b in regions.items() if center in fitz.Rect(b)]
   assert len(matches)==1,(i,r,matches)
   id=matches[0];labels[i]='source-product-'+id;groups[id].append(i)
  for id,indexes in groups.items():
   b=fitz.Rect(bound(ds,indexes))+(-1,-1,1,1);asset=ET.Element(NS+'svg',{'viewBox':f'{b.x0} {b.y0} {b.width} {b.height}','width':str(b.width),'height':str(b.height)})
   for i in indexes:asset.append(deepcopy(paths[i]))
   (OUT/'items'/(id+'.svg')).write_text(ET.tostring(asset,encoding='unicode'))
   goods[id]={'bounds':bound(ds,indexes),'width':b.width,'height':b.height,'file':f'assets/story/original/items/{id}.svg','paths':len(indexes)}
 if name=='record':
  for i,d in enumerate(ds):
   if i<13:continue
   r=d['rect']
   if r.y0>=560 and r.y1<=720:
    for id,a,b in [('can',240,340),('icepop',410,520),('cup',590,710),('snack',765,905),('mug',940,1120)]:
     if r.x0>=a and r.x1<=b:labels[i]='source-record-'+id;break
  # Mark only the original date glyphs; its outline stays visible until filtering.
  for e in root.iter(NS+'use'):
   v=[float(x) for x in re.findall(r'[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?',e.get('transform',''))]
   if len(v)==6 and 920<v[4]<1130 and 110<v[5]<160:e.set('class','source-record-date-glyph')
 if name=='account':
  # MuPDF emits fill+stroke drawings as two SVG paths. Map those explicitly
  # so the five food packages move independently of the basket and its handles.
  path_cursor=0
  runs={'red':(42,92),'yellow':(93,144),'pickle':(145,579),'blue':(580,843),'front':(845,930)}
  for drawing_index,drawing in enumerate(ds):
   count=2 if drawing['type']=='fs' else 1
   for stock,(start,end) in runs.items():
    if start<=drawing_index<=end:
     for path_index in range(path_cursor,path_cursor+count):labels[path_index]='source-account-stock-'+stock
   path_cursor+=count
  assert path_cursor==len(paths)
  labels[40]='source-avatar'
  for i in range(11,33):keys.append({'index':i,'bounds':bound(ds,[i])});labels[i]='source-key-'+str(i)
  for e in root.iter(NS+'use'):
   v=[float(x) for x in re.findall(r'[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?',e.get('transform',''))]
   if len(v)==6 and 330<v[4]<460 and 190<v[5]<246:e.set('class','source-debt-glyph')
 if name=='labor':
  for label,indexes in {'carton':range(1,6),'cup':range(8,13),'bag':range(13,19),'phone':range(19,27)}.items():
   for i in indexes:labels[i]='source-labor-object-'+label
  for i in [29,30]:labels[i]='source-worker-leg-'+str(i)
  for i in range(32,37):labels[i]='source-worker-arms'
  for i in range(37,42):labels[i]='source-cart'
  for i in range(43,48):labels[i]='source-leaf-'+str(i)
 if name=='receipt':
  for i,d in enumerate(ds):labels[i]='source-printer' if i in [0,1,9] or d['rect'].y1<244.5 else 'source-paper'
  defs=root.find(NS+'defs');clip=ET.SubElement(defs,NS+'clipPath',{'id':'story-paper-reveal','clipPathUnits':'userSpaceOnUse'});ET.SubElement(clip,NS+'rect',{'class':'source-paper-clip','x':'510','y':'244','width':'313','height':'494'})
 wrap(root,paths,labels)
 for e in root.iter(NS+'image'):e.set('href','assets/story/original/'+e.get('href'))
 root.set('class','illustration source-story-svg');root.set('aria-hidden','true')
 scenes[name]=ET.tostring(root,encoding='unicode')
 manifest[name]={'page':pn+1,'vector_paths':len(paths),'textures':textures,'bytes':len(scenes[name])}
 print(name,len(paths),'paths',len(scenes[name]),'bytes')
(ROOT/'story-art.js').write_text('/* Original PDF artboards 2–6. Generated; edit tools/extract_later_pages.py. */\nwindow.BUREAU_STORY_ART='+json.dumps({'scenes':scenes,'goods':goods,'keys':keys},ensure_ascii=False)+';\n')
(OUT/'manifest.json').write_text(json.dumps({'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'pages':manifest,'goods':goods},indent=2))
print('Texture bytes:',sum(p.stat().st_size for p in (OUT/'textures').iterdir()))
feedback=['/* Generated native calculator key centers; hit regions remain fixed. */']
for key in keys:
 x,y,x1,y1=key['bounds'];i=key['index']
 feedback.append(f'.source-account .source-key-{i} {{ transform-origin: {(x+x1)/2}px {(y+y1)/2}px; transition: scale 160ms ease; }}')
 feedback.append(f'.source-account:has([data-source-key="{i}"]:active) .source-key-{i} {{ scale: .94; }}')
feedback.append('@media (prefers-reduced-motion: reduce) { .source-account .source-part { scale: none !important; } }')
(ROOT/'story-parts.css').write_text('\n'.join(feedback)+'\n')
