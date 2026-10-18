/* Procedural original game audio. No outside media files or third-party licenses. */
(function(){
  'use strict';
  let ctx=null, master=null, ambiance=null, noiseBuffer=null, atmosphereTimer=null;
  let beatClock=0, stepNumber=0, danger=0;
  let enabled=true, playable=false, lastScene='';
  const PREF='napolitan-audio-enabled-v1';
  try{enabled=localStorage.getItem(PREF)!=='0'}catch(e){}
  function init(){
    if(ctx)return true;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return false;
    try{
      ctx=new AC();master=ctx.createGain();master.gain.value=0.65;master.connect(ctx.destination);
      noiseBuffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
      const a=noiseBuffer.getChannelData(0);
      for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*0.65;
      return true;
    }catch(e){ctx=null;return false}
  }
  function gain(v,start,duration){
    let g=ctx.createGain(),t=ctx.currentTime+start;
    g.gain.setValueAtTime(.0001,t);
    g.gain.linearRampToValueAtTime(Math.max(v,.0002),t+.018);
    g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(duration,.07));
    g.connect(master);return g;
  }
  function tone(f,at,dur,vol,type='sine',end=null){
    if(!ctx)return;
    let t=ctx.currentTime+at,o=ctx.createOscillator(),g=gain(vol,at,dur);
    o.type=type;o.frequency.setValueAtTime(f,t);
    if(end)o.frequency.exponentialRampToValueAtTime(Math.max(10,end),t+dur);
    o.connect(g);o.start(t);o.stop(t+dur+.04);
  }
  function hiss(at,dur,vol,cut=950,high=false){
    if(!ctx||!noiseBuffer)return;
    const t=ctx.currentTime+at,s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=gain(vol,at,dur);
    s.buffer=noiseBuffer;f.type=high?'highpass':'lowpass';f.frequency.value=cut;
    s.connect(f);f.connect(g);s.start(t);s.stop(t+dur+.03);
  }
  function thump(at=0,vol=.14){
    tone(125,at,.12,vol,'triangle',38);
    hiss(at,.07,.035,420);
  }
  function play(name){
    if(!enabled||!init()||!playable)return;
    try{
      switch(name){
        case 'tap':tone(520,0,.055,.044,'triangle',360);break;
        case 'type':tone(440+Math.random()*85,0,.027,.022,'square',310);break;
        case 'heartbeat':thump(0,.16);thump(.24,.1);break;
        case 'select':tone(350,0,.09,.085,'sine',230);tone(630,.07,.15,.05,'sine',450);break;
        case 'paper':hiss(0,.23,.075,2600,true);hiss(.08,.32,.06,2000,true);tone(120,.04,.12,.016,'triangle');break;
        case 'clue':hiss(0,.16,.075,3200,true);tone(730,.08,.24,.055,'sine',1010);tone(1070,.22,.33,.035,'sine');break;
        case 'door':hiss(0,.85,.20,700);tone(160,.07,.57,.09,'sawtooth',80);hiss(.64,.24,.15,1350);thump(.81,.21);break;
        case 'bell':tone(850,0,.36,.11,'sine',690);tone(1250,.075,.56,.074,'sine');tone(1600,.19,.61,.035,'sine');break;
        case 'phone':for(let i=0;i<2;i++){tone(420,i*.67,.40,.066,'square');tone(480,i*.67,.40,.056,'square')}break;
        case 'knock':for(let i=0;i<3;i++){thump(i*.31,.24);hiss(i*.31,.09,.08,510)}break;
        case 'static':hiss(0,1.15,.17,4900,true);tone(60,0,1,.03,'sawtooth',42);break;
        case 'suspense':tone(88,0,1.25,.10,'sawtooth',64);tone(740,.34,1.5,.025,'sine',530);break;
        case 'bad':thump(0,.3);tone(77,.12,2.2,.17,'sawtooth',36);hiss(.08,2,.13,320);break;
        case 'good':tone(262,0,.70,.07,'sine');tone(392,.20,1.0,.06,'sine');tone(523,.44,1.3,.05,'sine');break;
        case 'steps':for(let i=0;i<3;i++){thump(i*.40,.10)}break;
        default:play('tap');
      }
    }catch(e){}
  }
  // An original, copyright-independent retro horror score.
  // Scheduled notes form a repeating four-bar D-minor theme; underneath it,
  // a two-part heartbeat grows stronger toward each episode's climax.
  const SEMI=f=>440*Math.pow(2,(f-69)/12);
  const BASS=[38,34,31,33];  // D2, Bb1, G1, A1
  const MELODY=[
    [0,74],[5,77],[11,76],
    [18,69],[22,72],[29,74],
    [32,77],[37,76],[43,73],
    [49,72],[54,69],[61,73]
  ];
  function musicNote(note,at,duration,volume,wave){
    let t=ctx.currentTime+at,o=ctx.createOscillator(),g=ctx.createGain();
    o.type=wave||'triangle';o.frequency.setValueAtTime(SEMI(note),t);
    g.gain.setValueAtTime(.0001,t);
    g.gain.linearRampToValueAtTime(volume,t+.055);
    g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    o.connect(g);g.connect(ambiance);
    o.start(t);o.stop(t+duration+.03);
  }
  function stepSound(i,at){
    const pos=i%64,bar=Math.floor(pos/16),inBar=pos%16;
    // Every bar begins with a low two-note pad, and a minor-second rub.
    if(inBar===0){
      musicNote(BASS[bar]+12,at,3.2,.026,'triangle');
      musicNote(BASS[bar]+24,at,2.7,.016,'sine');
      musicNote(BASS[bar]+25,at+.10,2.5,.010,'sine');
    }
    // Recognizable but sparse unease; a true musical line rather than a drone.
    const lead=MELODY.find(n=>n[0]===pos);
    if(lead){musicNote(lead[1],at,1.3,.025,'triangle');musicNote(lead[1]-12,at,1.5,.008,'sine')}
    if(pos%4===2)musicNote(BASS[bar]+36,at,.36,.006,'sine');
    // Double heartbeat, always audible even through small phone speakers.
    if(pos%4===0){
      const vol=(danger>=2?.21:danger===1?.16:.105);
      tone(158,at,.14,vol,'triangle',72);
      tone(106,at,.20,vol*.64,'sine',54);
      tone(153,at+.27,.12,vol*.67,'triangle',68);
      hiss(at,.13,vol*.19,390);
      hiss(at+.27,.08,vol*.14,420);
    }
  }
  function scheduleScore(){
    if(!ctx||!playable||!enabled||ctx.state!=='running')return;
    if(beatClock<ctx.currentTime-.25)beatClock=ctx.currentTime+.04;
    const stepTime=60/74/2; // eighth notes at 74 BPM
    let count=0;
    while(beatClock<ctx.currentTime+.55&&count++<5){
      stepSound(stepNumber++,Math.max(0,beatClock-ctx.currentTime));
      beatClock+=stepTime;
    }
  }
  function startAmbient(){
    if(!ctx)return;
    if(!ambiance){
      ambiance=ctx.createGain();ambiance.gain.value=0;ambiance.connect(master);
      const notes=[[88,'sine',.028],[92,'triangle',.012],[171,'sine',.018]];
      for(const [f,w,v] of notes){
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.type=w;o.frequency.value=f;g.gain.value=v;
        o.connect(g);g.connect(ambiance);o.start();
      }
      const n=ctx.createBufferSource(),low=ctx.createBiquadFilter(),ng=ctx.createGain();
      n.buffer=noiseBuffer;n.loop=true;low.type='lowpass';low.frequency.value=750;ng.gain.value=.018;
      n.connect(low);low.connect(ng);ng.connect(ambiance);n.start();
    }
    ambiance.gain.setTargetAtTime(.8,ctx.currentTime,.35);
    if(!atmosphereTimer&&typeof window.setInterval==='function'){
      beatClock=ctx.currentTime+.06;
      atmosphereTimer=window.setInterval(scheduleScore,160);
      scheduleScore();
    }
  }
  function unlock(){
    if(!init())return false;
    playable=true;
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    if(enabled)startAmbient();
    return true;
  }
  function toggle(){
    enabled=!enabled;try{localStorage.setItem(PREF,enabled?'1':'0')}catch(e){}
    if(enabled){unlock();play('select')}
    if(ambiance)ambiance.gain.setTargetAtTime(enabled?.75:0,ctx.currentTime,.12);
    return enabled;
  }
  function scene(index,episode,force=false){
    danger=index>=5?2:index>=3?1:0;
    if(!enabled||!playable||!ctx)return;
    const marker=episode+':'+index;
    if(!force && marker===lastScene)return;
    lastScene=marker;
    if(index===0){play('paper');return}
    if(episode===0){
      play(({1:'door',2:'static',3:'phone',4:'suspense',5:'bell',6:'knock',7:'knock'})[index]||'suspense');
    }else if(episode===1){
      play(({1:'bell',2:'suspense',3:'phone',4:'knock',5:'door'})[index]||'suspense');
    }else{
      play(({1:'steps',2:'bell',3:'static',4:'door',5:'knock'})[index]||'suspense');
    }
  }
  function ending(success){if(!enabled)return;if(ambiance)ambiance.gain.setTargetAtTime(.08,ctx.currentTime,.25);play(success?'good':'bad');}
  function revive(){if(!enabled)return;unlock();if(ambiance)ambiance.gain.setTargetAtTime(.75,ctx.currentTime,.3);lastScene=''}
  window.HorrorAudio={unlock,toggle,play,scene,ending,revive,get enabled(){return enabled},get supported(){return !!(window.AudioContext||window.webkitAudioContext)}};
})();
