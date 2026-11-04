/* React orchestrates ten stable scene templates and local illustration motion. */
(() => {
  const {createElement:h,useState,useRef,useEffect,useLayoutEffect}=React;
  const M=BUREAU_MOTION, routes=M.routes;
  const routeNow=()=>{
    let value=location.hash.replace(/^#/,'');
    if(value==='/product-display')value='/products';
    return routes[value]?value:(location.pathname.endsWith('/home.html')?'/home':'/');
  };
  const initial=()=>{
    const defaults={debt:63,selected:'chips',minutes:'10',records:[],receipt:null,filterDate:'',task:0,productReady:false,calculatorUsed:false,receiptExpanded:false,taskChosen:false,receiptPage:0};
    try{
      const saved=JSON.parse(localStorage.getItem('temporal-federation-v1')||'null');
      if(!saved)return defaults;
      return {...defaults,debt:Number.isFinite(saved.debt)?Math.max(0,saved.debt):63,
        selected:BUREAU_WORLD.items.some(p=>p.id===saved.selected)?saved.selected:'chips',
        records:Array.isArray(saved.records)?saved.records.filter(r=>r&&typeof r.name==='string'&&Number.isFinite(r.tax)).slice(0,100):[],
        receipt:saved.receipt&&typeof saved.receipt.id==='string'?saved.receipt:null};
    }catch{return defaults;}
  };
  function App(){
    const [route,setRoute]=useState(routeNow),[data,setData]=useState(initial),[motion,setMotion]=useState(null),[arrival,setArrival]=useState(''),[aboutTab,setAboutTab]=useState('Background'),[notice,setNotice]=useState(''),[soundState,setSoundState]=useState(()=>BUREAU_SOUND.state());
    const inputFocus=useRef(null);
    const timers=useRef(new Set()),locked=useRef(false),pending=useRef(null),frame=useRef(0),previousDebt=useRef(0),serial=useRef(0);
    const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
    const schedule=(fn,ms)=>{const id=setTimeout(()=>{timers.current.delete(id);fn();},ms);timers.current.add(id);return id;};
    const clearTimers=()=>{timers.current.forEach(clearTimeout);timers.current.clear();cancelAnimationFrame(frame.current);};
    const showNotice=text=>{setNotice(text);schedule(()=>setNotice(''),2400);};
    const commit=(next,push=true)=>{if(push&&routeNow()!==next)history.pushState({},'',`#${next}`);setRoute(next);};
    const beginArrival=next=>{
      if(reduced()){setArrival('');return;}
      const page=routes[next].page;setArrival(page);
      schedule(()=>setArrival(''),page==='home'?M.homeEntrance:M.pageEntrance);
    };
    const navigate=(next,origin=null)=>{
      if(!routes[next]){showNotice('This page is not available yet.');return;}
      if(locked.current||next===route)return;
      setNotice('');locked.current=true;
      if(reduced()){commit(next);setArrival('');locked.current=false;return;}
      const variant=M.transitions[`${route}>${next}`]||(next==='/home'?'return':next==='/about'?'book':'paper');
      const duration=M.transition,id=++serial.current;
      const stage=document.querySelector('.transition-stage').getBoundingClientRect();
      const box=origin?.getBoundingClientRect();
      const anchor=box?{x:box.x+box.width/2-stage.x-stage.width/2,y:box.y+box.height/2-stage.y-stage.height/2,scale:Math.max(.12,box.width/(stage.width*.3))}:null;
      pending.current={next,committed:false};setMotion({variant,from:route,to:next,id,anchor});
      schedule(()=>{pending.current.committed=true;commit(next);beginArrival(next);},duration/2);
      schedule(()=>{setMotion(null);pending.current=null;locked.current=false;},duration);
    };
    useEffect(()=>{
      const sync=()=>{clearTimers();locked.current=false;pending.current=null;setMotion(null);setArrival('');setNotice('');setRoute(routeNow());};
      const preference=matchMedia('(prefers-reduced-motion: reduce)');
      const stop=()=>{if(!preference.matches)return;const next=pending.current?.next;clearTimers();if(next)commit(next);pending.current=null;locked.current=false;setMotion(null);setArrival('');document.querySelectorAll('.fruit-falling,.window-wiggle,.menu-pressed').forEach(e=>e.classList.remove('fruit-falling','window-wiggle','menu-pressed'));};
      window.addEventListener('popstate',sync);window.addEventListener('hashchange',sync);preference.addEventListener('change',stop);
      return()=>{clearTimers();window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync);preference.removeEventListener('change',stop);};
    },[]);
    useEffect(()=>{const update=e=>setSoundState(e.detail);window.addEventListener('bureau-sound-state',update);return()=>window.removeEventListener('bureau-sound-state',update);},[]);
    useEffect(()=>{document.title=`${routes[route].title} — Convenience Tax Bureau`;},[route]);
    useEffect(()=>{try{localStorage.setItem('temporal-federation-v1',JSON.stringify({debt:data.debt,selected:data.selected,records:data.records,receipt:data.receipt}));}catch{/* Browsing remains functional without storage. */}},[data]);
    const respond=target=>{
      if(reduced()||arrival||route!=='/home')return;
      const fruit=target.hasAttribute('data-fruit'),cls=fruit?'fruit-falling':'window-wiggle';
      if(target.classList.contains(cls))return;target.classList.add(cls);schedule(()=>target.classList.remove(cls),fruit?3600:480);
    };
    const onPointerOver=e=>{
      const item=e.target.closest('[data-about-sound]');if(item&&!item.contains(e.relatedTarget))BUREAU_SOUND.play(item.dataset.aboutSound);
      const tab=e.target.closest('[data-about]');if(tab&&!tab.contains(e.relatedTarget)){setAboutTab(tab.dataset.about);return;}
      const target=e.target.closest('[data-fruit],[data-window]');if(target&&!target.contains(e.relatedTarget))respond(target);
    };
    const onFocus=e=>{const item=e.target.closest('[data-about-sound]');if(item)BUREAU_SOUND.play(item.dataset.aboutSound);const tab=e.target.closest('[data-about]');if(tab)setAboutTab(tab.dataset.about);};
    const onKeyDown=e=>{if(!['Enter',' '].includes(e.key))return;const product=e.target.closest('[data-product]');if(product){e.preventDefault();setData(d=>({...d,selected:product.dataset.product,productReady:true}));navigate('/products',product);return;}const item=e.target.closest('[data-about-sound]');if(item){e.preventDefault();BUREAU_SOUND.play(item.dataset.aboutSound);return;}const target=e.target.closest('[data-fruit],[data-window]');if(target){e.preventDefault();respond(target);}};
    const purchase=()=>{
      const item=BUREAU_WORLD.items.find(p=>p.id===data.selected)||BUREAU_WORLD.items[2],now=new Date();
      const entry={...item,id:`purchase-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,date:now.toLocaleDateString('en-CA'),time:now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),paid:false};
      setData(d=>({...d,records:[entry,...d.records].slice(0,100),debt:d.debt+item.tax}));navigate('/record',document.querySelector('.selected-product .product-icon'));
    };
    const complete=()=>{
      const issuedAt=new Date();
      const amount=Math.min(Math.max(1,Number(data.minutes)||10),data.debt),remaining=data.debt-amount;
      const tasks=['Paper cup recycling','Carton disassembly','Plastic bag sorting','E-waste disassembly'];
      setData(d=>({...d,debt:remaining,records:remaining===0?d.records.map(r=>({...r,paid:true})):d.records,
        receipt:{id:`TF-${Date.now().toString().slice(-8)}`,date:issuedAt.toLocaleString('en-GB'),issuedAt:issuedAt.toISOString(),minutes:amount,task:tasks[d.task],balanceBefore:d.debt,balance:remaining,records:d.records.map(r=>({...r,paid:remaining===0?true:r.paid}))},receiptExpanded:false,receiptPage:0}));navigate('/receipt');
    };
    const onClick=e=>{
      const control=e.target.closest('[data-start],[data-nav],[data-route],[data-about],[data-action],[data-menu],[data-fruit],[data-window],[data-product],[data-select],[data-purchase],[data-key],[data-task],[data-complete-labor],[data-filter-all],[data-toggle-sound],[data-about-sound],[data-set-minutes],[data-receipt-toggle],[data-reprint-receipt],[data-account-stock],[data-receipt-page]');
      if(!control)return;e.preventDefault();if(locked.current)return;
      if(control.hasAttribute('data-toggle-sound')){BUREAU_SOUND.toggle();return;}
      if(control.dataset.aboutSound){BUREAU_SOUND.play(control.dataset.aboutSound);return;}
      if(control.dataset.about){setAboutTab(control.dataset.about);return;}
      if(control.hasAttribute('data-fruit')||control.hasAttribute('data-window')){respond(control);return;}
      if(control.hasAttribute('data-start')){navigate('/home');return;}
      if(control.dataset.route){navigate(control.dataset.route);return;}
      if(control.dataset.nav){navigate({Home:'/',About:'/about',Consume:'/consumption','Tax System':'/tax-system'}[control.dataset.nav]);return;}
      if(control.dataset.menu){navigate({Record:'/record',Account:'/account',Labor:'/labor',Receipt:'/receipt'}[control.dataset.menu]);return;}
      if(control.dataset.product){setData(d=>({...d,selected:control.dataset.product,productReady:true}));navigate('/products',control);return;}
      if(control.dataset.select){setData(d=>({...d,selected:control.dataset.select,productReady:true}));return;}
      if(control.hasAttribute('data-purchase')){purchase();return;}
      if(control.hasAttribute('data-receipt-toggle')){const card=document.querySelector('.source-receipt-summary');const open=card?.classList.toggle('is-open');document.querySelectorAll('[data-receipt-toggle]').forEach(el=>el.setAttribute('aria-expanded',String(!!open)));return;}
      if(control.dataset.receiptPage!==undefined){setData(d=>({...d,receiptPage:Math.max(0,Number(control.dataset.receiptPage)||0)}));return;}
      if(control.dataset.accountStock){const part=control.dataset.accountStock;control.classList.add('stock-tapped');document.querySelectorAll('.source-account-stock-'+part).forEach(el=>{el.style.animation='none';void el.getBoundingClientRect();el.style.animation='';});schedule(()=>control.classList.remove('stock-tapped'),900);return;}
      if(control.hasAttribute('data-reprint-receipt')){const scene=control.closest('.source-receipt');scene.classList.remove('receipt-printing');void scene.offsetWidth;scene.classList.add('receipt-printing');return;}
      if(control.dataset.setMinutes){setData(d=>({...d,minutes:control.dataset.setMinutes,calculatorUsed:true}));return;}
      if(control.dataset.key){const key=control.dataset.key;setData(d=>({...d,calculatorUsed:true,minutes:key==='C'?'':key==='⌫'?d.minutes.slice(0,-1):(d.minutes+key).slice(-3)}));return;}
      if(control.dataset.task!==undefined){setData(d=>({...d,task:Number(control.dataset.task),taskChosen:true}));return;}
      if(control.hasAttribute('data-complete-labor')){complete();return;}
      if(control.hasAttribute('data-filter-all')){setData(d=>({...d,filterDate:''}));return;}
      if(control.dataset.action==='continue'){navigate('/home');return;}
      if(control.dataset.action==='record'){navigate('/record');}
    };
    const onChange=e=>{if(e.target.hasAttribute('data-repayment-minutes')){const value=e.target.value.replace(/\D/g,'').slice(0,3);inputFocus.current={start:e.target.selectionStart,end:e.target.selectionEnd};setData(d=>({...d,minutes:value,calculatorUsed:true}));return;}if(e.target.hasAttribute('data-filter-date')){const value=e.target.value;setData(d=>({...d,filterDate:value}));}};
    const aboutCopy = {
      History: 'As technology and convenience services developed, people gained more personal time. Yet waste, resource use and public labor became a shared burden. The government introduced the Convenience Tax to redistribute these hidden costs.',
      Background: 'The Temporal Federation is a future state built around time as a shared resource. The Convenience Tax turns the public labor behind consumption into time debt in personal accounts. Citizens repay it through work, keeping time in circulation.',
      Regulation: 'Each convenience purchase creates a measurable time debt, recorded in the citizen’s personal time account. Citizens repay the time costs of the convenience they enjoy through labor.',
      Structure: 'Personal time accounts connect consumption with public labor. Citizens repay the time debt created by convenience through work, forming a social system sustained by the circulation of time.'
    };    const page=routes[route].page;
    // Updating section text does not replace the illustration DOM or restart its animations.
    useLayoutEffect(()=>{
      if(page==='about'){
        document.querySelector('.source-front.about')?.classList.toggle('background-copy',aboutTab==='Background');
        const card=document.querySelector('.about-card');if(card){card.querySelector('h2').textContent=aboutTab==='Background'?'Temporal Federation':aboutTab;card.querySelector('p').textContent=aboutCopy[aboutTab];}
        document.querySelectorAll('[data-about]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.about===aboutTab)));
      }
    },[page,aboutTab,arrival,motion]);
    useLayoutEffect(()=>{const el=document.querySelector('[data-toggle-sound]');if(!el)return;const active=soundState.unlocked&&!soundState.muted;el.textContent=active?'♪':'♩';el.setAttribute('aria-pressed',String(active));el.setAttribute('aria-label',active?'Mute illustration sounds':'Enable illustration sounds');el.title=active?'Mute illustration sounds':'Click to enable illustration sounds';},[page,soundState]);
    useLayoutEffect(()=>{
      if(page!=='account')return;
      const el=document.querySelector('[data-debt-counter]');if(!el)return;
      const start=previousDebt.current,end=data.debt;previousDebt.current=end;
      if(reduced()){el.textContent=end;return;}
      const time=performance.now();const tick=now=>{const p=Math.min(1,(now-time)/700);el.textContent=Math.round(start+(end-start)*(1-Math.pow(1-p,3)));if(p<1)frame.current=requestAnimationFrame(tick);};frame.current=requestAnimationFrame(tick);
      return()=>cancelAnimationFrame(frame.current);
    },[page,data.debt]);
    useLayoutEffect(()=>{if(page!=='account'||!inputFocus.current)return;const el=document.querySelector('[data-repayment-minutes]');if(el){el.focus({preventScroll:true});el.setSelectionRange(inputFocus.current.start,inputFocus.current.end);}inputFocus.current=null;},[page,data.minutes,data.calculatorUsed]);
    let markup=page==='about'?BUREAU_SCENES.about.replace('{{ABOUT_TITLE}}','Temporal Federation').replace('{{ABOUT_COPY}}',aboutCopy.Background):BUREAU_SCENES[page]||BUREAU_WORLD.render(page,data);
    const classes=`scene ${page}${page==='home'&&arrival==='home'?' entering':''}${page==='about'&&arrival==='about'?' about-entering':''}${!['welcome','home','about','receipt'].includes(page)&&arrival===page?' world-entering':''}${motion?.variant==='clock'&&page==='welcome'?' start-playing':''}${motion&&route===motion.from?' exiting exit-'+motion.variant:''}`;
    markup=markup.replace(/(<main\b[^>]*\bclass=")([^"]*)(")/,(_,prefix,original,suffix)=>{
      const flags=classes.split(' ').filter(name=>name!=='scene'&&name!==page);
      return prefix+[...new Set([...original.split(' '),...flags])].join(' ')+suffix;
    });
    const motif=motion?({clock:'',book:'',flow:'— · —',shelves:BUREAU_WORLD.icon(data.selected)+BUREAU_WORLD.icon('soda'),product:BUREAU_WORLD.icon(data.selected),file:BUREAU_WORLD.icon(data.selected),debt:`${data.debt} min`,task:`<span class="task-time">${data.debt} min</span><svg class="task-broom" viewBox="0 0 100 140"><path d="m65 12-30 77" stroke="#00a600" stroke-width="8"/><path fill="#ffd329" d="m25 74 26 10 5 37-49-17z"/><path d="m21 89-6 20m16-17-6 20m16-17-6 20" stroke="#d58232" stroke-width="3"/></svg>`,print:'',return:''}[motion.variant]||''):'';
    return h('div',{className:`transition-stage${motion?' is-transitioning':''}`,onClick,onPointerOver,onFocus,onKeyDown,onChange,onInput:onChange,'aria-busy':!!motion,
      style:{'--route-duration':`${M.transition}ms`,'--hover-time':`${M.hover}ms`,'--float-time':`${M.float}ms`,'--cloud-time':`${M.cloud}ms`,'--person-time':`${M.person}ms`,'--source-x':`${motion?.anchor?.x||0}px`,'--source-y':`${motion?.anchor?.y||0}px`,'--source-scale':motion?.anchor?.scale||.35}},
      h('div',{className:'scene-content',dangerouslySetInnerHTML:{__html:markup}}),
      motion&&h('div',{key:motion.id,className:`story-transition transition-${motion.variant}`,'aria-hidden':true},h('div',{className:'transition-motif',dangerouslySetInnerHTML:{__html:motif}})),
      h('output',{className:notice?'route-notice':'sr-only',role:'status','aria-live':'polite'},notice));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
