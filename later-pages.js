/* Original artboards, with stationary HTML hit regions and live account data. */
(() => {
  const {scenes,goods,keys}=BUREAU_STORY_ART;
  const {esc}=BUREAU_WORLD;
  const sourceIds=Object.keys(goods);
  // Reuse the source product silhouettes in the existing purchase/transition flow.
  for(const[id,p]of Object.entries(goods)){
    BUREAU_SHOP.art[id]={box:`0 0 ${p.width} ${p.height}`,body:`<image href="${p.file}" width="${p.width}" height="${p.height}"/>`};
  }
  BUREAU_WORLD.items.find(p=>p.id==='chips').name='Fish-shaped crackers';
  BUREAU_WORLD.items.find(p=>p.id==='donuts').name='Packaged tomatoes';
  const boxStyle=([x,y,x1,y1])=>`left:${x/13.66}%;top:${y/7.68}%;width:${(x1-x)/13.66}%;height:${(y1-y)/7.68}%`;
  const hit=(bounds,attributes,label,extra='')=>`<button class="source-hit ${extra}" style="${boxStyle(bounds)}" ${attributes} aria-label="${esc(label)}" title="${esc(label)}"><span class="source-tip">${esc(label)}</span></button>`;
  const nativeControls=(back,next)=>`<nav class="story-controls source-native-controls" aria-label="Page navigation">${back}${next}</nav>`;
  const frame=(page,label,body='',flags='')=>`<main class="scene world ${page} source-story source-${page} ${flags}" aria-label="${label}"><h1 class="sr-only">${label}</h1>${scenes[page]}${body}</main>`;
  const products=state=>{
    const item=BUREAU_WORLD.items.find(p=>p.id===state.selected)||BUREAU_WORLD.items[2];
    const replacement=!sourceIds.includes(item.id);
    const body=sourceIds.map(id=>{
      const shown=id==='chips'&&replacement?item.id:id;
      const p=BUREAU_WORLD.items.find(p=>p.id===shown);
      return `<button class="source-hit source-product-hit${shown===item.id?' selected-product':''}" data-select="${shown}" data-gallery-slot="${id}" aria-label="Select ${esc(p.name)}" aria-pressed="${shown===item.id}" style="${boxStyle(goods[id].bounds)}">${id==='chips'&&replacement?BUREAU_WORLD.icon(item.id,'source-chosen-product'):''}<span class="source-tip">${esc(p.name)} · ${p.tax} min</span></button>`;
    }).join('');
    const actions=`<nav class="source-product-actions${state.productReady?' is-ready':''}" aria-label="Product actions"><button data-route="/consumption">Back</button><button data-purchase>Record ${esc(item.name)} · ${item.tax} min</button><button data-route="/record">Records →</button></nav>`;
    return frame('products','Product display',body+actions, replacement?'source-replaced-product':'');
  };
  const record=state=>{
    const rows=state.records.filter(r=>!state.filterDate||r.date===state.filterDate);
    const table=`<div class="source-record-data" role="region" aria-label="Consumption records" tabindex="0"><table><caption class="sr-only">Consumption Records</caption><colgroup>${[265,180,292,250,162,217].map(w=>`<col style="width:${w/13.66}%">`).join('')}</colgroup><thead class="sr-only"><tr>${['TIME','ITEM','CONVENIENCE','GARBAGE','TAX','STATUS'].map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody>${Array.from({length:Math.max(3,rows.length)},(_,i)=>{const r=rows[i];return `<tr style="--row:${Math.min(i,3)}">${r?`<td>${esc(r.time)}</td><td>${esc(r.name)}</td><td>${r.convenience} min</td><td>${r.garbage} min</td><td>${r.tax} min</td><td>${r.paid?'REPAID':'OWED'}</td>`:'<td></td>'.repeat(6)}</tr>`;}).join('')}</tbody></table></div>`;
    const filter=`<label class="source-date-control" style="${boxStyle([914,103,1138,164])}"><span class="sr-only">Filter records by date</span><input type="date" data-filter-date aria-label="Filter records by date" value="${esc(state.filterDate)}"></label>${hit([1186,104,1295,162],'data-filter-all','Show all records')}`;
    const controls=nativeControls(hit([70,645,205,708],'data-route="/products"','Back to products'),hit([1170,632,1325,705],'data-route="/account"','Details — view account'));
    const stock=[['shop-fish-can',[246,561,334,702]],['icepop',[417,574,514,720]],['cup',[598,558,700,703]],['shop-pasta',[773,561,893,704]]].map(([id,b])=>hit(b,`data-product="${id}"`,'View '+BUREAU_WORLD.items.find(p=>p.id===id).name)).join('')+hit([944,586,1114,711],'data-route="/account"','View account');
    return frame('record','RECORD',table+filter+stock+controls,state.filterDate?'has-date-filter':'');
  };
  const account=state=>{
    const left=keys.filter(k=>k.bounds[0]<1100).sort((a,b)=>Math.round(a.bounds[1]/20)-Math.round(b.bounds[1]/20)||a.bounds[0]-b.bounds[0]);
    const right=keys.filter(k=>k.bounds[0]>1100).sort((a,b)=>Math.round(a.bounds[1]/20)-Math.round(b.bounds[1]/20)||a.bounds[0]-b.bounds[0]);
    const keyValues=['7','8','9','⌫','4','5','6','C','1','2','3','0'];
    const keypad=left.map((k,i)=>i<12?hit(k.bounds,`data-key="${keyValues[i]}" data-source-key="${k.index}"`,keyValues[i],'source-key-hit'):hit(k.bounds,`data-set-minutes="${[5,10,15,30][i-12]}" data-source-key="${k.index}"`,`${[5,10,15,30][i-12]} min`,'source-key-hit')).join('')+right.map((k,i)=>hit(k.bounds,`data-set-minutes="${[5,10,15,20,30,60][i]}" data-source-key="${k.index}"`,`${[5,10,15,20,30,60][i]} min`,'source-key-hit')).join('');
    const counter=state.debt===63?`<span class="sr-only" data-debt-counter>63</span>`:`<svg class="illustration source-live-debt" viewBox="0 0 1366 768"><text x="333.5" y="233.2" fill="#231815" font-family="Source Britannic,serif" font-size="43.5047"><tspan data-debt-counter>${state.debt}</tspan>Min</text></svg>`;
    const input=`<input class="account-time-input source-time-input" style="${boxStyle([910,260,1230,310])}" aria-label="Labor repayment minutes" value="${state.calculatorUsed?esc(state.minutes):''}" inputmode="numeric" maxlength="3" data-repayment-minutes>`;
    const controls=nativeControls(hit([679,205,790,347],'data-route="/record"','Back to records'),hit([684,657,1233,710],'data-route="/labor"','Account status — repay time'));
    return frame('account','ACCOUNT',counter+input+keypad+controls+hit([684,563,1233,617],'data-route="/record"','Borrowed time — view records')+hit([31,476,426,692],'data-route="/record"','Current status — view records')+hit([1117,416,1251,445],'data-key="C"','Clear minutes','source-key-hit')+hit([1117,454,1251,483],'data-route="/labor"','Repay selected time','source-key-hit'),state.debt===63?'':'has-live-debt');
  };
  const labor=state=>{
    const names=['Paper cup recycling','Carton disassembly','Plastic bag sorting','E-waste disassembly'];
    const objectBounds=[[57,462,138,580],[190,482,298,571],[390,438,498,579],[608,456,700,575]];
    const textBounds=[[377,42,515,119],[208,39,317,176],[55,39,155,145],[575,40,751,115]];
    const tasks=objectBounds.map((b,i)=>hit(b,`data-task="${i}" aria-pressed="${state.task===i}"`,'Select '+names[i],'source-task-hit')).join('')+textBounds.map((b,i)=>hit(b,`data-task="${i}" aria-pressed="${state.task===i}"`,'Select '+names[i])).join('');
    const completeLabel=state.debt?`Complete ${names[state.task]} · repay ${Math.min(Number(state.minutes)||10,state.debt)} min`:'Task complete · print receipt';
    return frame('labor','LABOR',tasks+hit([740,301,1111,579],'data-complete-labor',completeLabel,'source-complete-labor')+nativeControls(hit([69,652,272,734],'data-route="/account"','Back to account'),hit([1133,55,1254,112],'data-route="/receipt"','View receipt')),state.taskChosen?'task-chosen':'');
  };
  const receipt=state=>{
    const r=state.receipt;
    const summary=`<article class="source-receipt-summary${state.receiptExpanded?' is-open':''}" aria-label="Printed time repayment receipt"><h2>TIME REPAYMENT RECEIPT</h2><p>${r?esc(r.id):'PREVIEW'}</p><p>${r?esc(r.task):'Complete a labor task to issue a receipt.'}</p><p>REPAID ${r?r.minutes:0} MIN</p><p>BALANCE ${state.debt} MIN</p>${r?`<small>${esc(r.date)}</small>`:''}<button data-receipt-toggle aria-expanded="${!!state.receiptExpanded}">Close</button></article>`;
    return frame('receipt','RECEIPT',hit([512,245,820,737],'data-receipt-toggle aria-expanded="'+!!state.receiptExpanded+'"','View repayment details')+summary+nativeControls(hit([483,117,847,242],'data-route="/labor"','Back to labor'),hit([597,32,748,86],'data-route="/home"','Return home')));
  };
  const renderOld=BUREAU_WORLD.render;
  const renderers={products,record,account,labor,receipt};
  BUREAU_WORLD.render=(page,state)=>renderers[page]?renderers[page](state):renderOld(page,state);
})();
