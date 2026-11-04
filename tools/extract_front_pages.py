"""Extract the user-supplied first four artboards without redrawing their paths.
Usage: python3 tools/extract_front_pages.py source.pdf
Dependencies: PyMuPDF, Pillow, fontTools.
"""
from pathlib import Path
from collections import defaultdict
import base64,hashlib,io,json,re,sys
import xml.etree.ElementTree as E
import fitz
from PIL import Image
from fontTools.ttLib import TTFont
ROOT=Path(__file__).resolve().parents[1];SOURCE=Path(sys.argv[1]);doc=fitz.open(SOURCE)
OUT=ROOT/'assets/front/original';(OUT/'textures').mkdir(parents=True,exist_ok=True)
NS='{http://www.w3.org/2000/svg}';E.register_namespace('',NS[1:-1]);NUMBER=r'[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?'
font=TTFont(io.BytesIO(doc.extract_font(16)[3]),recalcTimestamp=False);font.save(OUT/'broadway.ttf')
scenes={};manifest={}
for n,name in enumerate(['welcome','home','about','tax']):
 page=doc[n];root=E.fromstring(page.get_svg_image(text_as_path=True));parents={c:e for e in root.iter() for c in e};textures=[]
 for im in root.iter(NS+'image'):
  key=next(k for k in im.attrib if k.endswith('href'));bitmap=Image.open(io.BytesIO(base64.b64decode(im.get(key).split(',',1)[1])))
  v=[float(x) for x in re.findall(NUMBER,parents[im].get('transform',''))];assert all(abs(a-b)<1e-6 for a,b in zip(v[:4],[1,0,0,1])),v
  tx,ty=v[4:];x0,y0=max(0,int(-tx)),max(0,int(-ty));x1,y1=min(bitmap.width,int(1366-tx)),min(bitmap.height,int(768-ty))
  if x1<=x0 or y1<=y0:crop=Image.new(bitmap.mode,(1,1));x0=y0=0
  else:crop=bitmap.crop((x0,y0,x1,y1))
  data=io.BytesIO();crop.save(data,format='PNG',optimize=True);filename=hashlib.sha256(data.getvalue()).hexdigest()[:16]+'.png';(OUT/'textures'/filename).write_bytes(data.getvalue())
  im.set('x',str(x0));im.set('y',str(y0));im.set('width',str(crop.width));im.set('height',str(crop.height));im.attrib.pop(key);im.set('href','textures/'+filename);textures.append(filename)
 for e in root.iter():
  for k in list(e.attrib):
   if k.endswith('}href'):e.set('href',e.attrib.pop(k))
 (OUT/(name+'.svg')).write_text(E.tostring(root,encoding='unicode'))
 paths=[]
 def walk(e):
  if e.tag==NS+'defs':return
  if e.tag==NS+'path':paths.append(e)
  for c in e:walk(c)
 walk(root);ds=page.get_drawings();drawing_paths=[];cursor=0
 for d in ds:
  count=2 if d['type']=='fs' else 1;drawing_paths.append(paths[cursor:cursor+count]);cursor+=count
 assert cursor==len(paths),(name,cursor,len(paths))
 labels={};removed=[]
 def mark(indexes,label):
  for i in indexes:
   for e in drawing_paths[i]:labels[e]=label
 def drop(e):
  if e in parents:parents[e].remove(e)
 def text_label(e):
  v=[float(x) for x in re.findall(NUMBER,e.get('transform',''))]
  return v[4:] if len(v)==6 else [-999,-999]
 if name=='welcome':
  mark([0,5,8],'front-clock-tower');mark([15,16],'front-clock-hands')
  mark([17,19,20,22],'front-welcome-house');mark([18],'front-welcome-roof');mark([21],'front-welcome-chimney')
  for i,label in [(23,'record'),(24,'continue'),(25,'start')]:mark([i],'front-welcome-'+label)
  # The blank capsule is an off-artboard duplicate, not a fourth action.
  for e in drawing_paths[26]:drop(e)
  for e in root.iter(NS+'use'):
   x,y=text_label(e)
   if 580<x<820:
    if 300<y<380:labels[e]='front-welcome-start'
    elif 420<y<500:labels[e]='front-welcome-continue'
    elif 550<y<635:labels[e]='front-welcome-record'
 if name=='home':
  mark([0],'front-home-sun');mark([20],'front-home-dome')
  mark([1,2,3,4,5,6,18,19,21,*range(22,45)],'front-home-building')
  mark([7,8,9,10,11],'front-home-menu-building')
  mark(range(12,18),'front-home-tree');mark([45],'front-home-bush');mark([49],'front-home-pink-stem')
  for i in range(46,49):mark([i],'front-home-fruit-'+str(i))
  for i in range(50,55):mark([i],'front-home-leaf-'+str(i))
  for start,end,label in [(55,69,'Tax System'),(70,81,'About'),(82,202,'Home'),(203,224,'Consume')]:mark(range(start,end+1),'front-nav-'+label.replace(' ','-'))
  for i in [3,4,22,24,26,28,31,32,33,34,36,37,38]:mark([i],'front-home-window-'+str(i))
  for i,j in [(5,3),(6,4),(23,22),(25,24),(27,26),(29,28)]:mark([i],'front-home-window-'+str(j))
  for e in root.iter(NS+'use'):
   x,y=text_label(e)
   if y<430:
    label='Home' if x<420 else 'Tax-System' if x<780 else 'About' if x<1030 else 'Consume';labels[e]='front-nav-'+label
   else:
    label='Record' if y<540 else 'Account' if y<600 else 'Labor' if y<675 else 'Receipt';labels[e]='front-menu-'+label
 if name=='about':
  tabs={'History':[16,17],'Background':[6,7],'Regulation':[10,11],'Structure':[18,19]}
  for label,indexes in tabs.items():mark(indexes,'front-about-tab-'+label)
  for e in list(root.iter(NS+'use')):
   x,y=text_label(e)
   if x>530 and 205<y<335 and e.get('data-text')=='a':drop(e);continue
   if x>530 and 140<y<205:labels[e]='front-about-original-title'
   elif 225<x<400:
    label='History' if y<180 else 'Background' if y<290 else 'Regulation' if y<390 else 'Structure';labels[e]='front-about-tab-'+label
 if name=='tax':
  for i in [4,34,40,55]:
   for e in drawing_paths[i]:e.set('class','tax-card-shape')
  mark(range(35,40),'front-tax-citizen');mark([48],'front-tax-bag');mark([45,46,47,49,50],'front-tax-box')
  mark([56,57,58,59,60,61,62,63],'front-tax-phone');mark([41,42,43,44],'front-tax-hourglass')
  for i in [51,52,53]:
   mark([i],'front-tax-link front-tax-link-'+str(i)+' flow-lines');drawing_paths[i][0].set('pathLength','1')
  for e in list(root.iter(NS+'use')):
   x,y=text_label(e)
   if x>1100 and y>680:drop(e)
 # Group adjacent shapes/glyphs in place: source paint order and transforms stay.
 for parent in list(root.iter()):
  children=[];active=None;previous=None
  for child in list(parent):
   label=labels.get(child)
   if label is None:children.append(child);active=None;previous=None;continue
   if active is None or previous!=label:
    active=E.Element(NS+'g',{'class':'front-part '+label,'data-front-part':label});children.append(active);previous=label
   active.append(child)
  parent[:]=children
 for im in root.iter(NS+'image'):im.set('href','assets/front/original/'+im.get('href'))
 root.set('class','illustration front-source-svg');root.set('aria-hidden','true')
 scenes[name]=E.tostring(root,encoding='unicode');manifest[name]={'page':n+1,'original_drawings':len(ds),'original_paths':len(paths),'textures':textures,'bytes':len(scenes[name])}
 print(name,len(paths),'original paths',len(scenes[name]),'bytes')
(ROOT/'front-art.js').write_text('/* Original first four artboards; generated by tools/extract_front_pages.py. */\nwindow.BUREAU_FRONT_ART='+json.dumps(scenes,ensure_ascii=False)+';\n')
(OUT/'manifest.json').write_text(json.dumps({'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'pages':manifest},indent=2))
print('Texture bytes',sum(p.stat().st_size for p in (OUT/'textures').iterdir()))
