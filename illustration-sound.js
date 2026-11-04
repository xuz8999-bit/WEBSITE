/* Short local Web Audio cues, unlocked only by a genuine user gesture. */
(() => {
  let context=null,unlocked=false,muted=false,lastItem='',playCount=0;
  let previousTime=0;
  try{muted=localStorage.getItem('bureau-illustration-muted')==='1';}catch{}
  const state=()=>({unlocked,muted,lastItem,playCount,contextState:context?.state||'uninitialized'});
  const notify=()=>window.dispatchEvent(new CustomEvent('bureau-sound-state',{detail:state()}));
  const unlock=async()=>{
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      if(!context)context=new Audio();
      if(context.state==='suspended')await context.resume();
      unlocked=context.state==='running';notify();
    }catch{/* Audio remains optional when browser policy or hardware blocks it. */}
  };
  const tone=(frequency,duration,volume,delay=0)=>{
    const t=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(frequency,t);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(volume,t+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);osc.connect(gain);gain.connect(context.destination);osc.start(t);osc.stop(t+duration+.01);osc.onended=()=>{osc.disconnect();gain.disconnect();};
  };
  const rustle=(duration,cutoff,volume)=>{
    const count=Math.floor(context.sampleRate*duration),buffer=context.createBuffer(1,count,context.sampleRate),samples=buffer.getChannelData(0);
    for(let i=0;i<count;i++)samples[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/count)*(.6+.4*Math.sin(i/context.sampleRate*110));
    const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();source.buffer=buffer;filter.type='bandpass';filter.frequency.value=cutoff;filter.Q.value=.6;gain.gain.value=volume;source.connect(filter);filter.connect(gain);gain.connect(context.destination);source.start();source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
  };
  const play=item=>{
    if(!unlocked||muted||context?.state!=='running')return;
    const now=performance.now();if(now-previousTime<250)return;previousTime=now;
    if(item==='flour')rustle(.18,1500,.04);
    else if(item==='donuts'){rustle(.13,2500,.028);tone(720,.08,.016,.025);}
    else if(item==='sundae'){tone(660,.24,.035);tone(990,.18,.01,.01);}
    else if(item==='cone'){tone(280,.12,.04);tone(190,.09,.018,.015);}
    else return;
    lastItem=item;playCount++;notify();
  };
  const toggle=async()=>{
    if(!unlocked){muted=false;await unlock();}else muted=!muted;
    try{localStorage.setItem('bureau-illustration-muted',muted?'1':'0');}catch{}
    notify();
  };
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('[data-toggle-sound]'))unlock();},{capture:true,passive:true});
  document.addEventListener('keydown',e=>{if(['Enter',' ','Tab'].includes(e.key)&&!e.target.closest('[data-toggle-sound]'))unlock();},{capture:true});
  window.BUREAU_SOUND={play,toggle,state};
})();
