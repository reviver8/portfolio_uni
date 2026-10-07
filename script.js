// Routing
const pages=[...document.querySelectorAll('.page')],links=[...document.querySelectorAll('nav a:not(.brand)')];
function route() {
    const id=(location.hash||'#home').slice(1);
    const t=document.getElementById(id)?id:'home';
    pages.forEach(p=>p.classList.toggle('on',p.id===t));
    links.forEach(a=>a.getAttribute('href')==='#'+t?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
    window.scrollTo(0,0)
}
addEventListener('hashchange',route);route();

// Typing greeting
(function(){
    const el=document.getElementById('typed'),s="Hi, I'm Tedy.";
    let i=0;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){
    el.textContent=s;
    return
}
const t=setInterval(()=>{
    el.textContent=s.slice(0,++i);
    if(i>=s.length)clearInterval(t)},70)})();

// Get-to-know-me game
const facts={
    laptop:["Computer Science at Georgia Tech","I graduate in December 2026 with a B.S. in Computer Science and a minor in French. I like data structures, databases, and object-oriented design, and I build with Java, Python, JavaScript, React, and AWS."],
    printer:["Hive Makerspace","I'm a Master Peer Instructor teaching 3D printing with OrcaSlicer and OnShape. I help run a student makerspace with 200 instructors."],
    books:["Languages","English is my first language. I'm intermediate in Latin and have basic French and American Sign Language."],
    board:["Teaching and teamwork","I was a TA for Object-Oriented Design, and I've worked in Agile teams at Cargill with up to 30 engineers."]};
let seen=new Set();
document.querySelectorAll('.hot').forEach(g=>{const open=()=>{const f=facts[g.dataset.k];
document.getElementById('info').innerHTML='<h3></h3><p></p>';
document.querySelector('#info h3').textContent=f[0];
document.querySelector('#info p').textContent=f[1];
g.classList.add('seen');
seen.add(g.dataset.k);
document.getElementById('count').textContent=seen.size===4?'All 4 found!':seen.size+' of 4 found'};
g.addEventListener('click',open);
g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});

// Pixel background: sky, stars, moon, clouds, city
const cv=document.getElementById('bg'),cx=cv.getContext('2d');

function paint() {
    const S=innerWidth<600?4:5,w=Math.ceil(innerWidth/S),h=Math.ceil(innerHeight/S);
    cv.width=w;cv.height=h;

    const bands=['#0D0221','#150536','#1d0a4a','#2a1066','#3a1585'];
    bands.forEach((c,i)=>{cx.fillStyle=c;cx.fillRect(0,Math.floor(h*i/5),w,Math.ceil(h/5))});

    // Stars
    let r=7;const rnd=()=>(r=(r*9301+49297)%233280)/233280;
    for(let i=0;i<w*h/90;i++) {
        cx.fillStyle=['#FFE25A','#a8d8ff','#FFF8E7'][i%3];cx.fillRect(Math.floor(rnd()*w),Math.floor(rnd()*h*.6),1,1)
    }
    const mr=Math.max(7,Math.min(14,Math.floor(w/9))),mx=Math.floor(w*.78),my=Math.floor(h*.2);
    cx.fillStyle='#ffffff';for(let y=-mr;y<=mr;y++)for(let x=-mr;x<=mr;x++)if(x*x+y*y<=mr*mr)cx.fillRect(mx+x,my+y,1,1);
    cx.fillStyle='#FFF8E7';[[-3,-2,2],[2,3,3],[-1,4,1]].forEach(([a,b,c])=>{cx.fillRect(mx+a,my+b,c,c)});

    //Clouds 
    // const cloud=(x,y,c)=>{
    //     cx.fillStyle=c;
    //     cx.fillRect(x,y+2,16,3);
    //     cx.fillRect(x+3,y,8,3);
    //     cx.fillRect(x+10,y+1,5,2)
    // };
    // cloud(Math.floor(w*.08),Math.floor(h*.16),'#EC89C3');
    // cloud(Math.floor(w*.45),Math.floor(h*.3),'#893BFF');
    // cloud(Math.floor(w*.62),Math.floor(h*.1),'#EC89C3');
    // cloud(Math.floor(w*.25),Math.floor(h*.42),'#893BFF');


    //City
    r=21;
    const base=h;
    let x=0;
    while(x<w) {
        const bw=4+Math.floor(rnd()*7),bh=Math.floor(h*(.12+rnd()*.25));
        cx.fillStyle=rnd()>.5?'#1a0840':'#120430';
        cx.fillRect(x,base-bh,bw,bh);
        for(let wy=base-bh+2;
            wy<base-2;wy+=3)for(let wx=x+1;wx<x+bw-1;wx+=2)
            if(rnd()>.72) {
                cx.fillStyle=rnd()>.5?'#FFE25A':'#a8d8ff';
                cx.fillRect(wx,wy,1,1)
            }
        x+=bw+(rnd()>.7?1:0)
    }
}
paint();addEventListener('resize',paint);