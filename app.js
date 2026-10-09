const T={
fr:{nav0:"Réalisations",nav1:"Services",nav2:"Contact",h1:"Vos idées prennent forme.",intro:"Design, motion, web et production.",cta:"Voir nos réalisations",wTitle:"Nos réalisations",f0:"Tout",f1:"Menus",f2:"Affiches & roll-up",f3:"Bannières & enseignes",f4:"Habillage véhicule",sTitle:"Nos services",s1:"Design graphique",s2:"Motion & vidéo",s3:"Web & UI/UX",s4:"Réseaux sociaux",s5:"Impression & publicité",s6:"CNC, laser & DTF",cTitle:"Parlons de votre projet",send:"Envoyer sur WhatsApp",ph1:"Nom",ph2:"Votre besoin"},
en:{nav0:"Work",nav1:"Services",nav2:"Contact",h1:"Your ideas, brought to life.",intro:"Design, motion, web and production.",cta:"See our work",wTitle:"Our work",f0:"All",f1:"Menus",f2:"Posters & roll-ups",f3:"Banners & signs",f4:"Vehicle wrap",sTitle:"Our services",s1:"Graphic design",s2:"Motion & video",s3:"Web & UI/UX",s4:"Social media",s5:"Print & advertising",s6:"CNC, laser & DTF",cTitle:"Let’s talk about your project",send:"Send on WhatsApp",ph1:"Name",ph2:"Your need"},
ar:{nav0:"أعمالنا",nav1:"الخدمات",nav2:"تواصل",h1:"أفكارك تتحوّل إلى واقع.",intro:"تصميم، موشن، ويب وإنتاج.",cta:"شاهد أعمالنا",wTitle:"أعمالنا",f0:"الكل",f1:"قوائم الطعام",f2:"ملصقات وRoll-up",f3:"لافتات وبانرات",f4:"تغليف المركبات",sTitle:"خدماتنا",s1:"التصميم الجرافيكي",s2:"موشن وفيديو",s3:"تصميم الويب وUI/UX",s4:"السوشيال ميديا",s5:"الطباعة والإعلان",s6:"CNC وليزر وDTF",cTitle:"لنتحدث عن مشروعك",send:"إرسال عبر واتساب",ph1:"الاسم",ph2:"ما الذي تحتاجه؟"}};
let L="fr";
const W=[
["master-events","Master Event’s",4],["empire-gym","Empire Gym",2],["creche","Crèche Éclo Maternelle & Garderie",3],
["escale-menu","Grand Espace L’Escale",1],["escale-prix","L’Escale — Pizza, Sandwich, Tacos",1],["menu-fastfood","Menu Fast-food",1],["menu-pizza","Menu Pizza",1],
["rollup-coca","Roll-up Café & Coca",2],["poulet-oeufs","Poulet & Œufs",2],["ramses-travel","Ramses Travel",2],
["pet-shop","Pet Shop Thafsuth",3],["alico-bonde","Menuiserie Alum PVC Alico Bonde",3],["amena-alu","Entreprise Amena",3],
["clim-auto","Réparation chaud & froid Clim Auto",3],["saveurs-dorees","Saveurs Dorées",3],["coffee-banner","Bannière Coffee",3]];
let F=0,cur=[];
function render(){const g=document.getElementById("gal"),fl=document.getElementById("filters");
fl.innerHTML=[0,1,2,3,4].map(i=>`<button data-f="${i}" class="${i===F?"on":""}">${T[L]["f"+i]}</button>`).join("");
fl.querySelectorAll("button").forEach(b=>b.onclick=()=>{F=+b.dataset.f;render()});
cur=W.filter(w=>!F||w[2]===F);
g.innerHTML=cur.map((w,i)=>`<figure class="card" data-i="${i}"><div class="im"><img loading="lazy" src="${w[0]}-t.webp" alt="${w[1]}"></div><div class="t"><b>${w[1]}</b><small>${T[L]["f"+w[2]]}</small></div></figure>`).join("");
g.querySelectorAll(".card").forEach((c,i)=>{c.onclick=()=>open_(i);io.observe(c)})}
const lb=document.getElementById("lb");let k=0;
function open_(i){k=(i+cur.length)%cur.length;const w=cur[k];lb.hidden=false;lb.querySelector("img").src=`${w[0]}.webp`;lb.querySelector("figcaption").innerHTML=`${w[1]}<small>${T[L]["f"+w[2]]}</small>`}
lb.onclick=e=>{if(e.target===lb||e.target.classList.contains("x"))lb.hidden=true};
lb.querySelector(".pv").onclick=()=>open_(k-1);lb.querySelector(".nx").onclick=()=>open_(k+1);
addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")lb.hidden=true;if(e.key==="ArrowRight")open_(k+1);if(e.key==="ArrowLeft")open_(k-1)});
function setLang(l){L=l;const d=document.documentElement;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";
document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[l][e.dataset.i18n]);
document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=T[l][e.dataset.ph]);
document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.lang===l));if(typeof io!=="undefined")render()}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
document.getElementById("y").textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("in"),[...e.target.parentNode.children].indexOf(e.target)%3*120);io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll("article").forEach(a=>io.observe(a));render();
// parallax 3D réaliste (interpolation fluide)
const st=document.getElementById("stage"),P=[...st.querySelectorAll(".plate")].reverse();
let tx=0,ty=0,x=0,y=0;
addEventListener("pointermove",e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
(function loop(){x+=(tx-x)*.07;y+=(ty-y)*.07;
P.forEach((p,i)=>p.style.transform=`translate3d(${x*-24*(i+1)+(i*-70)}px,${y*-16*(i+1)+(i*-10)}px,${-i*60}px) rotateY(${x*22+(-12)}deg) rotateX(${y*-16+6}deg) rotateZ(${-3-i*2}deg)`);
requestAnimationFrame(loop)})();
document.getElementById("f").onsubmit=e=>{e.preventDefault();const f=e.target;
open("https://wa.me/213564628260?text="+encodeURIComponent("NOUVURA — "+f.n.value+"\n"+f.m.value),"_blank")};
