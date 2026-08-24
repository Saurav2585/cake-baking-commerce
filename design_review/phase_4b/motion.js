const motionQuery=new URLSearchParams(location.search);
const motionRoot=document.documentElement;
const captureState=motionQuery.get('motionState');
if(captureState)motionRoot.classList.add(`capture-${captureState}`);
if(motionQuery.get('motion')==='off')motionRoot.classList.add('motion-off');
const reduceRequested=matchMedia('(prefers-reduced-motion: reduce)').matches||motionRoot.classList.contains('force-reduced-motion')||motionRoot.classList.contains('motion-off');
if(captureState){motionRoot.classList.add('motion-ready','motion-run')}else if(!reduceRequested){motionRoot.classList.add('motion-ready');requestAnimationFrame(()=>requestAnimationFrame(()=>motionRoot.classList.add('motion-run')))}else{motionRoot.classList.add('motion-run')}
const toggle=document.querySelector('#motion-toggle');
const setReduced=(reduced)=>{motionRoot.classList.toggle('force-reduced-motion',reduced);toggle.setAttribute('aria-pressed',String(reduced));toggle.textContent=reduced?'Motion: reduced':'Motion: full';status.textContent=reduced?'Reduced motion enabled. Content and controls are unchanged.':'Full motion enabled.'};
setReduced(reduceRequested);
toggle.addEventListener('click',()=>setReduced(toggle.getAttribute('aria-pressed')!=='true'));
const observed=[...document.querySelectorAll('.making-sequence,.editorial-product-stage')];
if(!reduceRequested&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.2});observed.forEach(el=>observer.observe(el))}else observed.forEach(el=>el.classList.add('in-view'));
let activeFeedback;
const restart=(element,className)=>{if(activeFeedback?.cancel)activeFeedback.cancel();element.classList.remove(className);void element.offsetWidth;element.classList.add(className);const clear=()=>element.classList.remove(className);element.addEventListener('animationend',clear,{once:true})};
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{restart(button,'feedback-pop');activeFeedback=button.getAnimations?.()[0]}));
document.querySelectorAll('.view-pdp .choice').forEach(choice=>choice.addEventListener('click',()=>{document.querySelectorAll('.view-pdp .choice').forEach(item=>item.setAttribute('aria-pressed','false'));choice.setAttribute('aria-pressed','true');restart(choice,'pack-changed');const media=document.querySelector('.product-media');if(media)restart(media,'pack-changed');status.textContent=`Selected demo pack ${choice.textContent.trim()}. Price and availability remain variant-owned demo facts.`}));
document.querySelectorAll('.notice.error').forEach(notice=>notice.addEventListener('click',()=>restart(notice,'feedback-pop')));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const close=document.querySelector('.drawer .button.secondary');if(close){close.focus();status.textContent='Drawer ready to close. No focus was lost.'}}});
