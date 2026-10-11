"""Import observed public Behance modules without redrawing or flattening media."""
import json,re,html,sys
from pathlib import Path
from html.parser import HTMLParser
class CleanText(HTMLParser):
    tags={'div','p','span','b','strong','i','em','u','br','a','ul','ol','li','h1','h2','h3','h4'}
    props={'text-align','color','background-color','font-size','font-family','font-weight','font-style','text-decoration','line-height','letter-spacing'}
    def __init__(self):super().__init__(convert_charrefs=True);self.out=[]
    def handle_starttag(self,t,attrs):
        if t not in self.tags:return
        a=dict(attrs);out=[]
        if 'style' in a:
            styles=[]
            for v in a['style'].split(';'):
                k,sep,val=v.partition(':')
                if sep and k.strip() in self.props and not re.search(r'url\(|expression|javascript',val,re.I):styles.append(k+':'+val)
            if styles:out.append('style="'+html.escape(';'.join(styles),quote=True)+'"')
        classes=set(a.get('class','').split())&{'bold','italic','underline'}
        if classes:out.append('class="'+' '.join(sorted(classes))+'"')
        if t=='a' and a.get('href','').startswith(('https://','mailto:')):out.extend(['href="'+html.escape(a['href'],quote=True)+'"','target="_blank"','rel="noopener"'])
        self.out.append('<'+t+(' '+' '.join(out) if out else '')+'>')
    def handle_endtag(self,t):
        if t in self.tags and t!='br':self.out.append('</'+t+'>')
    def handle_data(self,s):self.out.append(html.escape(s))
raw=json.loads(Path(sys.argv[1]).read_text())
existing=json.loads(Path('src/studio/curated-projects.json').read_text())
by_url={p['behance']:p for p in existing}
ids=['munddak','hansik','sukchwi','soju','happybirth','greek','global-cosmetics','candles','persimmon','boksoondoga','hair','msg-branding','health-food','mokpo','roll-pizza','groove-grub','penguinality','kotra','intraw','persimmon-2']
short=['문딱라면','한식바탕','숙취해소제','일품 안동소주','Happy Birthday Beer','COCONEST','Global Cosmetic','Candle','홍시크림떡','복순도가','Hair Product','MSG Design Studio','Health Functional Food','낭만목포항','Roll Pizza','Groove & Grub','What Is Your Penguinality','KOTRA','Intraw','홍시크림떡']
result=[]
for n,x in enumerate(raw):
    old=by_url.get(x['url'],{})
    cats=old.get('categories') or (['branding'] if n in [21,24,26,28] else ['others'] if n in [25,27] else ['packaging'])
    p={**old,'id':old.get('id',ids[n-10] if n>=10 else str(n)),'t':x['title'],'b':old.get('b',short[n-10] if n>=10 else x['title']),'en':old.get('en',short[n-10] if n>=10 else x['title']),'category':cats[0],'cat':cats[0],'categories':cats,'field':' · '.join({'packaging':'패키지','branding':'브랜딩','others':'그래픽'}[c] for c in cats),'scope':old.get('scope',''),'y':'','intro':'','d':[],'img':x['img'],'behance':x['url'],'sourceBackground':x['background'],'modules':[]}
    for m in x['modules']:
        if not m['images'] and not m['text'] and not m['embeds'] and not m['height']:continue
        clean=CleanText();clean.feed(m['text']);m['text']=''.join(clean.out)
        for e in m['embeds']: e.pop('html',None)
        if any(i['w']<=0 or i['h']<=0 for i in m['images']):raise ValueError('Invalid media bounds')
        p['modules'].append(m)
    p['images']=[im['src'] for m in p['modules'] for im in m['images']]
    result.append(p)
assert len(result)==30 and len({p['id'] for p in result})==30
Path('src/studio/curated-projects.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'projects':len(result),'images':sum(len(p['images']) for p in result),'gifs':sum(s.endswith('.gif') for p in result for s in p['images'])}))
