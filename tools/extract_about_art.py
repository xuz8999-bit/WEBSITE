"""Extract the four original vector objects from the supplied Illustrator PDF.
Usage: python3 tools/extract_about_art.py path/to/甜点.pdf assets/about/original
Requires PyMuPDF (fitz). No rasterization, smoothing or path redrawing.
"""
from copy import deepcopy
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
import fitz

source, destination = Path(sys.argv[1]), Path(sys.argv[2])
destination.mkdir(parents=True, exist_ok=True)
page = fitz.open(source)[0]
root = ET.fromstring(page.get_svg_image(text_as_path=True))
ns = '{http://www.w3.org/2000/svg}'
ET.register_namespace('', ns[1:-1])
defs = root.find(ns + 'defs')
layer = root.find(ns + 'g').find(ns + 'g')
paths = list(layer)
drawings = page.get_drawings()
assert len(paths) == len(drawings) == 343, 'Unexpected PDF structure; inspect before extracting.'
groups = {name: [] for name in ('flour', 'donuts', 'sundae', 'cone')}
for index, drawing in enumerate(drawings):
    rect = drawing['rect']
    x, y = (rect.x0 + rect.x1) / 2, (rect.y0 + rect.y1) / 2
    name = 'flour' if x < 170 and y > 310 else 'sundae' if 420 < x < 625 else 'cone' if x > 690 else 'donuts'
    groups[name].append((index, rect))
for name, entries in groups.items():
    bounds = fitz.Rect(entries[0][1])
    for _, rect in entries[1:]:
        bounds |= rect
    bounds += (-1, -1, 1, 1)
    vector = ET.Element(ns + 'svg', {'version': '1.1', 'width': str(bounds.width), 'height': str(bounds.height),
        'viewBox': f'{bounds.x0} {bounds.y0} {bounds.width} {bounds.height}'})
    if defs is not None:
        vector.append(deepcopy(defs))
    group = ET.SubElement(vector, ns + 'g', dict(layer.attrib))
    for index, _ in entries:
        group.append(deepcopy(paths[index]))
    (destination / (name + '.svg')).write_text(ET.tostring(vector, encoding='unicode'), encoding='utf-8')
    print(name, len(entries), 'original paths, transparent SVG')
