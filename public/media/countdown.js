!function(){"use strict";
// Valima Ceremony: Tuesday 20th October 2026 at 10:00 PM (Gathering)
var e = new Date("2026-10-20T22:00:00+05:00"),
t = document.getElementById("wcb-num-days"),
n = document.getElementById("wcb-num-hours"),
o = document.getElementById("wcb-num-mins"),
c = document.getElementById("wcb-num-secs"),
s = {days:null,hours:null,minutes:null,seconds:null},
r = !1;

function i(e,t){
  if(!e) return;
  e.textContent!==t&&(e.classList.add("wcb-flip-out"),setTimeout(function(){
    e.classList.remove("wcb-flip-out"),e.classList.add("wcb-flip-in"),e.textContent=t,e.offsetHeight,e.classList.remove("wcb-flip-in")
  },520));
}

function l(){
  var cur=new Date,diff=e-cur;
  var cont=document.getElementById("wcbContainer");
  if(diff<=0){
    if(cont) cont.innerHTML="<div style='font-size:24px;font-family:Cinzel,serif;color:#a87132;text-align:center;'>The Blessed Valima Ceremony Has Begun!</div>";
  } else {
    var a=String(Math.floor(diff/864e5)),
    u=String(Math.floor(diff%864e5/36e5)).padStart(2,"0"),
    d=String(Math.floor(diff%36e5/6e4)).padStart(2,"0"),
    m=String(Math.floor(diff%6e4/1e3)).padStart(2,"0");
    a!==s.days&&(i(t,a),s.days=a);
    u!==s.hours&&(i(n,u),s.hours=u);
    d!==s.minutes&&(i(o,d),s.minutes=d);
    m!==s.seconds&&(i(c,m),s.seconds=m);
  }
}

function a(){
  if(!r){
    r=!0;
    document.querySelectorAll(".wcb-number").forEach(function(e){e.classList.add("wcb-revealed")});
    document.querySelectorAll(".wcb-label").forEach(function(e){e.classList.add("wcb-revealed")});
    document.querySelectorAll(".wcb-separator").forEach(function(e){e.classList.add("wcb-revealed")});
  }
}

l();
setInterval(l,1e3);

var u=new IntersectionObserver(function(e){
  e[0].isIntersecting&&(a(),u.disconnect());
},{threshold:.2});

var container=document.getElementById("wcbContainer");
if(container){
  u.observe(container);
  setTimeout(function(){
    var rect=container.getBoundingClientRect();
    rect.top<window.innerHeight&&rect.bottom>0&&a();
  },200);
}
}();
