!function(){"use strict";
var e = document.getElementById("weiOverlay"),
    t = document.getElementById("weiVideoWrap"),
    n = document.getElementById("weiVideo"),
    i = document.getElementById("weiAudio"),
    o = document.getElementById("weiAudioBtn"),
    c = !1;

// Music removed as requested
if (i) {
  try { i.pause(); i.currentTime = 0; i.src = ""; i.remove(); } catch(err){}
}
if (o) {
  o.style.display = "none";
  o.style.visibility = "hidden";
}

function l(e){
  var t = document.getElementById("fadeVideo");
  t ? e(t) : setTimeout(function(){ l(e); }, 100);
}

function s(){
  setTimeout(function(){
    l(function(e){
      e.currentTime = 0;
      var t = e.play();
      t && t.catch && t.catch(function(e){ console.log("fadeVideo play:", e); });
    });
  }, 2e3);
}

function u(){
  if (!c) {
    c = !0;
    e.style.opacity = "0";
    e.style.pointerEvents = "none";
    setTimeout(function(){ e.style.display = "none"; }, 1400);
    s();
    n.readyState >= 2 ? d() : (n.addEventListener("loadeddata", d, {once: !0}), n.load());
  }
}

function d(){
  t.classList.add("wei-video-in");
  requestAnimationFrame(function(){
    var e = n.play();
    e && e.catch && e.catch(function(e){ console.log("Envelope video:", e); });
  });
}

if (e) {
  e.addEventListener("click", u);
  e.addEventListener("touchstart", u, {passive: !0});
}

if (n) {
  n.addEventListener("timeupdate", function(){
    n.duration && n.currentTime >= n.duration - .8 && !n.dataset.fading && (
      n.dataset.fading = "1",
      window.dispatchEvent(new Event("webgencyIntroDone")),
      t.classList.remove("wei-video-in"),
      t.classList.add("wei-video-out"),
      setTimeout(function(){ t.style.display = "none"; }, 1400)
    );
  });
  n.preload = "auto";
  n.load();
}
}();
