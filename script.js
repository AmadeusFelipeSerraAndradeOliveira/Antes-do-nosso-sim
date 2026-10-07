const screens=[...document.querySelectorAll('.screen')];
const progress=document.querySelector('#progress span');
const music=document.querySelector('#music');
const musicToggle=document.querySelector('#musicToggle');
let current=0;
let musicStarted=false;

function show(i){
  current=Math.max(0,Math.min(i,screens.length-1));
  screens.forEach((s,n)=>s.classList.toggle('active',n===current));
  progress.style.width=((current)/(screens.length-1))*100+'%';
  window.scrollTo({top:0,behavior:'instant'});
  if(screens[current].dataset.screen==='proposal') startProposal();
}
function next(){show(current+1)}
function startMusic(){
  musicStarted=true;
  musicToggle.hidden=false;
  music.volume=.72;
  music.play().then(()=>musicToggle.classList.add('playing')).catch(()=>{});
}

document.querySelector('[data-action="start"]').addEventListener('click',()=>{startMusic();next()});

document.querySelector('[data-action="checkDate"]').addEventListener('click',()=>{
  const input=document.querySelector('#date');
  const value=input.value.replace(/\D/g,'');
  if(value==='18042026'){
    document.querySelector('#dateError').classList.remove('show');
    next();
  }else document.querySelector('#dateError').classList.add('show');
});

document.querySelector('#date').addEventListener('input',e=>{
  let v=e.target.value.replace(/\D/g,'').slice(0,8);
  if(v.length>4)v=v.slice(0,2)+'/'+v.slice(2,4)+'/'+v.slice(4);
  else if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);
  e.target.value=v;
});

document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',next));

document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{
  const fb=document.querySelector('#quizFeedback');
  if(b.dataset.choice==='ok'){
    b.classList.add('correct');fb.textContent='Exatamente. Foi no cinema. E o filme nem ajudou muito. 😂';
    setTimeout(next,850);
  }else{b.classList.add('wrong');fb.textContent='Não foi dessa vez. Lembra do nosso primeiro encontro.';}
}));

document.querySelectorAll('[data-word]').forEach(b=>b.addEventListener('click',()=>{
  const fb=document.querySelector('#wordFeedback');
  if(b.textContent==='Encontro'){
    b.classList.add('correct');fb.textContent='Encontro. Porque foi assim que tudo começou.';
  }else{fb.textContent='Pode ser... mas eu escolheria outra palavra. 😉';}
  setTimeout(next,900);
}));

musicToggle.addEventListener('click',()=>{
  if(!musicStarted){startMusic();return}
  if(music.paused){music.play().then(()=>musicToggle.classList.add('playing')).catch(()=>{})}
  else{music.pause();musicToggle.classList.remove('playing')}
});

let proposalTimer;
function startProposal(){
  clearInterval(proposalTimer);
  const count=document.querySelector('#proposalCount');
  const final=document.querySelector('#proposalFinal');
  count.textContent='';
  final.classList.remove('show');
  setTimeout(()=>{ count.textContent=''; final.classList.add('show'); },2000);
  setTimeout(()=>{ if(musicStarted&&!music.paused){ music.volume=.52; } },2200);
}

// teclado apenas para testes no computador
window.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight' || e.key==='Enter'){
    if(current!==1 && current!==2 && current!==3 && current!==9) next();
  }
});
