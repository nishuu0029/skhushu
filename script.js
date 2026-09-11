const COUNTER_START = new Date("2025-09-20T00:00:00").getTime();
const PASSWORD_HASH = "449cf124ac016fb50f28ce736a547ae39831c485c6d4abbc3826fa242f57a214";
const STORAGE_KEY = "motuuUnlocked";
const GITHUB_API = "https://api.github.com/repos/nishuu0029/bacchaa/contents";

async function sha256(text){
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

function setUnlocked(){
  localStorage.setItem(STORAGE_KEY,"true");
  const screen=document.getElementById("passwordScreen");
  const main=document.getElementById("mainContent");
  if(screen) screen.classList.add("hidden");
  if(main) main.classList.remove("hidden");
  startCounter();
}

async function checkPassword(event){
  if(event) event.preventDefault();
  const input=document.getElementById("passwordInput");
  const error=document.getElementById("passwordError");
  if(!input) return;
  const value=input.value.trim();
  if(!value){ if(error) error.textContent="Our little secret is waiting... ♡"; return; }
  const hash=await sha256(value);
  if(hash===PASSWORD_HASH){
    setUnlocked();
    if(error) error.textContent="";
    createHeartBurst();
  }else{
    if(error) error.textContent="Hmm... that's not our secret. Try again, love. ♡";
    input.value="";
    input.classList.add("wrong-password");
    setTimeout(()=>input.classList.remove("wrong-password"),400);
  }
}

function initializeOpening(){
  const opening=document.getElementById("openingScreen");
  const enter=document.getElementById("enterBtn");
  if(!opening||!enter)return;
  enter.addEventListener("click",()=>{
    opening.classList.add("fade-out");
    setTimeout(()=>{
      opening.remove();
      const screen=document.getElementById("passwordScreen");
      if(screen){
        screen.classList.remove("hidden");
        setTimeout(()=>document.getElementById("passwordInput")?.focus(),250);
      }
    },1050);
  });
}

function initializePassword(){
  const screen=document.getElementById("passwordScreen");
  const main=document.getElementById("mainContent");
  if(!screen||!main)return;
  if(localStorage.getItem(STORAGE_KEY)==="true"){
    screen.classList.add("hidden"); main.classList.remove("hidden"); startCounter();
  }else{
    screen.classList.remove("hidden"); main.classList.add("hidden");
  }
}

function calculateTime(){
  let diff=Math.max(0,Date.now()-COUNTER_START);
  const totalSeconds=Math.floor(diff/1000);
  const totalDays=Math.floor(totalSeconds/86400);
  const hours=Math.floor((totalSeconds%86400)/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;
  const start=new Date(COUNTER_START), now=new Date();
  let years=now.getFullYear()-start.getFullYear();
  let months=now.getMonth()-start.getMonth();
  if(now.getDate()<start.getDate()) months--;
  if(months<0){years--;months+=12;}
  const exactMonths=years*12+months;
  return {years,months:exactMonths,totalDays, hours,minutes,seconds,totalSeconds};
}

function updateCounter(){
  const d=calculateTime();
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=Number(value).toLocaleString();};
  set("years",d.years);set("months",d.months);set("days",d.totalDays);
  set("hours",d.hours);set("minutes",d.minutes);set("seconds",String(d.seconds).padStart(2,"0"));
  const total=document.getElementById("totalTime");
  if(total) total.textContent=`${d.totalDays.toLocaleString()} days • ${d.hours} hours • ${d.minutes} minutes • ${String(d.seconds).padStart(2,"0")} seconds`;
}
function startCounter(){
  updateCounter();
  clearInterval(window.counterInterval);
  window.counterInterval=setInterval(updateCounter,1000);
}

function initializeReveal(){
  const items=document.querySelectorAll(".reveal");
  if(!items.length)return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(x=>x.classList.add("visible"));return;}
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  items.forEach(item=>observer.observe(item));
}

function initializeNav(){
  const btn=document.getElementById("navMenuBtn"), nav=document.getElementById("navLinks");
  if(!btn||!nav)return;
  btn.addEventListener("click",()=>{nav.classList.toggle("open");btn.textContent=nav.classList.contains("open")?"×":"☰";});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");btn.textContent="☰";}));
}

function initializeMusicToggle(){
  const button=document.getElementById("musicToggle");
  if(!button)return;
  let audio=null;
  button.addEventListener("click",()=>{
    if(!audio){audio=new Audio("songs/mal-mal.mp3");audio.loop=true;}
    if(audio.paused){
      audio.play().then(()=>{button.textContent="♫";button.classList.add("playing");}).catch(()=>{});
    }else{
      audio.pause();button.textContent="♪";button.classList.remove("playing");
    }
  });
}

const gifts=[
 {emoji:"🎁",title:"Tere bin sab adhuraa lagta hai",text:"Tere bin sab adhuraa lagta hai, tere sath hi to mera jahan puraa lagta hai 🥹❤️"},
 {emoji:"🎀",title:"A little dream",text:"Tum jis khwaab m aakhein kholo uska roop amar tum jis rang ka kapda pehno bo mausam ka rang tum jis phool has kr dekho bo kabhi na murjhaye tum jis harf pr ungli rakh do bo roshan ho jaye 💕"},
 {emoji:"💌",title:"A Small Message",text:"Teri Aankhon Ke Saamne Ye Shehar Kon Dekhega Tu Dariya Si Hai Ye Lehar Kon Dekhega Tu Khubsurat Se Bhi Jada Khubsurat Tujhe Dekhne Ke Bad Ye Tajmahal Kon Dekhegaa. ❤️"},
 {emoji:"💖",title:"One More Thing",text:"Thank you for being a beautiful part of my story and for all the memories we have created together and i want to spend my whole life with you. 🫶"}
];

function openGift(index){
  const gift=gifts[index], modal=document.getElementById("giftModal");
  if(!gift||!modal)return;
  document.getElementById("giftEmoji").textContent=gift.emoji;
  document.getElementById("giftTitle").textContent=gift.title;
  document.getElementById("giftText").textContent=gift.text;
  modal.classList.add("active");modal.setAttribute("aria-hidden","false");
  createHeartBurst();
}
function closeGift(){
  const modal=document.getElementById("giftModal");
  if(modal){modal.classList.remove("active");modal.setAttribute("aria-hidden","true");}
}

function createFloatingHeart(){
  const holder=document.querySelector(".hearts-container"); if(!holder)return;
  const heart=document.createElement("span");heart.className="floating-heart";
  heart.textContent=["♡","♥","✦","❤"][Math.floor(Math.random()*4)];
  heart.style.left=Math.random()*100+"%";
  heart.style.fontSize=(13+Math.random()*18)+"px";
  heart.style.animationDuration=(6+Math.random()*5)+"s";
  holder.appendChild(heart);setTimeout(()=>heart.remove(),11000);
}
function createHeartBurst(){
  const holder=document.querySelector(".hearts-container");if(!holder)return;
  for(let i=0;i<10;i++){
    const h=document.createElement("span");h.className="floating-heart";h.textContent="♥";
    h.style.left=(45+Math.random()*10)+"%";h.style.bottom=(35+Math.random()*20)+"%";
    h.style.fontSize=(12+Math.random()*15)+"px";h.style.animationDuration=(2+Math.random()*2)+"s";
    holder.appendChild(h);setTimeout(()=>h.remove(),5000);
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  initializeOpening();
  document.getElementById("passwordForm")?.addEventListener("submit",checkPassword);
  initializePassword();
  initializeReveal();
  initializeNav();
  initializeMusicToggle();
  setInterval(createFloatingHeart,1800);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeGift();});
});