/* Original first four artboards, retaining approved interactions and food art. */
(() => {
  const art=BUREAU_FRONT_ART;
  const oldAbout=BUREAU_SCENES.about;
  const foodStart=oldAbout.indexOf('<div class="about-floating-items">');
  const foods=oldAbout.slice(foodStart,oldAbout.indexOf('<article class="about-card"',foodStart));
  const sound=oldAbout.match(/<button class="about-audio-toggle"[\s\S]*?<\/button>/)[0];
  const style=([x,y,x1,y1])=>`left:${x/13.66}%;top:${y/7.68}%;width:${(x1-x)/13.66}%;height:${(y1-y)/7.68}%`;
  const hit=(b,attrs,label,cls='')=>`<button class="front-hit ${cls}" style="${style(b)}" ${attrs} aria-label="${label}" title="${label}"></button>`;
  const frame=(page,label,controls,extra='')=>`<main class="scene ${page} source-front ${extra}" aria-label="${label}"><h1 class="sr-only">${label}</h1>${art[page]}${controls}</main>`;
  const smoke=`<svg class="illustration front-smoke-layer" viewBox="0 0 1366 768" aria-hidden="true"><g class="front-smoke"><ellipse cx="1212" cy="203" rx="9" ry="8"/></g><g class="front-smoke" style="animation-delay:-1.2s"><ellipse cx="1212" cy="203" rx="9" ry="8"/></g><g class="front-smoke" style="animation-delay:-2.4s"><ellipse cx="1212" cy="203" rx="9" ry="8"/></g></svg>`;
  BUREAU_SCENES.welcome=frame('welcome','Welcome to Convenience Tax Bureau',smoke+hit([586,292,815,384],'data-start','START')+hit([586,412,814,504],'data-action="continue"','CONTINUE')+hit([586,545,814,637],'data-action="record"','RECORD'));
  const navs=[['Home',[231,44,400,261]],['About',[778,82,958,261]],['Consume',[1128,111,1325,250]],['Tax System',[468,247,754,411]]];
  const menus=[['Record',[594,483,785,526]],['Account',[594,545,785,588]],['Labor',[594,613,785,665]],['Receipt',[594,687,785,740]]];
  const windows=[[3,[244,510,349,584]],[4,[244,613,350,689]],[22,[20,265,87,326]],[24,[20,367,87,428]],[26,[20,458,87,519]],[28,[20,554,87,615]],[31,[1084,317,1185,356]],[32,[1084,379,1185,396]],[33,[1084,420,1185,460]],[34,[1080,480,1181,497]],[36,[1209,518,1342,566]],[37,[1209,599,1342,647]],[38,[1209,679,1342,727]]];
  const fruit=[[46,[262,718,287,741]],[47,[150,691,175,714]],[48,[234,664,260,687]]];
  BUREAU_SCENES.home=frame('home','Home',navs.map(([name,b])=>hit(b,`data-nav="${name}"`,name)).join('')+menus.map(([name,b])=>hit(b,`data-menu="${name}"`,name)).join('')+windows.map(([id,b])=>hit(b,`data-window="${id}"`,'Move window')).join('')+fruit.map(([id,b])=>hit(b,`data-fruit="${id}"`,'Drop fruit')).join(''));
  const tabs=[['History',[227,84,386,161]],['Background',[228,188,387,265]],['Regulation',[228,291,387,368]],['Structure',[229,390,388,467]]];
  BUREAU_SCENES.about=frame('about','ABOUT',sound+hit([35,661,138,717],'data-route="/home"','Back','about-back')+hit([603,17,785,87],'data-route="/home"','ABOUT — return to HOME','about-heading')+`<nav class="front-about-sections" aria-label="About sections">${tabs.map(([name,b])=>hit(b,`data-about="${name}" aria-pressed="${name==='Background'}"`,name)).join('')}</nav>`+foods+`<article class="about-card" aria-live="polite"><h2>{{ABOUT_TITLE}}</h2><p>{{ABOUT_COPY}}</p></article>`,'background-copy');
  BUREAU_SCENES.tax=frame('tax','TAX SYSTEM',hit([470,20,790,90],'data-route="/about"','TAX SYSTEM — return to ABOUT')+hit([92,519,294,660],'data-route="/consumption"','Open the convenience shop','tax-shop-hotspot'),'world');
})();
