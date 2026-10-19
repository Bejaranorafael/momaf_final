(function(){
  var U = window.MOMAF.utils;
  var S = window.MOMAF.simulator;
  var Q = window.MOMAF.quote;
  var $ = U.$;

  var ICONOS = {
    instagram:'<svg viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>',
    facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.3 3.5c-2.7 0-4.4 1.6-4.4 4.5v2.5H7v3.3h2.9V22h3.6z"/></svg>',
    tiktok:'<svg viewBox="0 0 24 24"><path d="M16.6 2h-3.2v13.2a2.8 2.8 0 1 1-2.8-2.8c.3 0 .6 0 .8.1V9.2a6 6 0 1 0 5.2 5.9V8.7a7.3 7.3 0 0 0 4.2 1.3V6.8A4.3 4.3 0 0 1 16.6 2z"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>'
  };
  var NOMBRES = {instagram:"Instagram",facebook:"Facebook",tiktok:"TikTok",whatsapp:"WhatsApp"};

  function setupIntro(){
    var intro = $("intro");
    var site  = $("site");
    var LS_INTRO_KEY = window.MOMAF.CONFIG.LS_INTRO_KEY;

    function cerrarIntro(){
      intro.classList.add("is-closing");
      document.body.classList.remove("intro-active");
      site.classList.remove("is-hidden");
      site.classList.add("is-visible");
      setTimeout(function(){
        if(intro.parentNode) intro.parentNode.removeChild(intro);
      }, 600);
    }

    var yaVista = false;
    try{ yaVista = localStorage.getItem(LS_INTRO_KEY) === "1"; }catch(e){}
    if(yaVista){
      if(intro.parentNode) intro.parentNode.removeChild(intro);
      site.classList.remove("is-hidden");
      site.classList.add("is-visible");
      return;
    }

    document.body.classList.add("intro-active");
    $("introEnter").addEventListener("click", function(){
      try{ localStorage.setItem(LS_INTRO_KEY, "1"); }catch(e){}
      cerrarIntro();
    });
    $("introSkip").addEventListener("click", function(){
      try{ localStorage.setItem(LS_INTRO_KEY, "1"); }catch(e){}
      cerrarIntro();
    });
  }

  function initPlaceholders(){
    Array.prototype.forEach.call(document.querySelectorAll("img[data-ph]"), function(img){
      var src = img.getAttribute("src");
      if(src && src.indexOf("data:") !== 0) return;
      img.src = U.placeholderSVG(img.dataset.ph);
    });
  }

  function initSocial(){
    var redes = window.MOMAF.CONFIG.REDES;
    var cont = $("social");
    var map = {
      instagram: redes.instagram,
      facebook:  redes.facebook,
      tiktok:    redes.tiktok,
      whatsapp:  U.waUrl("Hola MOMAF! Quiero hacer una consulta.")
    };
    Object.keys(ICONOS).forEach(function(k){
      var a = document.createElement("a");
      a.innerHTML = ICONOS[k];
      a.setAttribute("aria-label", NOMBRES[k]);
      if(map[k]){
        a.href = map[k]; a.target = "_blank"; a.rel = "noopener";
        a.title = NOMBRES[k];
      } else {
        a.className = "off";
        a.title = NOMBRES[k] + " (enlace pendiente)";
        a.setAttribute("aria-disabled","true");
        a.addEventListener("click", function(e){ e.preventDefault(); });
      }
      cont.appendChild(a);
    });
  }

  function initPlacaSpotlight(){
    Array.prototype.forEach.call(document.querySelectorAll(".placa"), function(el){
      el.addEventListener("pointermove", function(e){
        var r = el.getBoundingClientRect();
        el.style.setProperty("--x", (e.clientX - r.left) + "px");
        el.style.setProperty("--y", (e.clientY - r.top) + "px");
      });
    });
  }

  function init(){
    setupIntro();
    U.cargar(S.state);
    S.buildUI();
    initPlaceholders();
    initSocial();
    initPlacaSpotlight();
    Q.initListeners();

    S.onChange(function(){ Q.actualizar(); });

    S.setZone("body");
    S.refrescarToggleModo();

    if(S.state.mode === "set"){
      S.setAmbiente(S.state.set);
    } else {
      S.setFurniture(S.state.furniture);
    }

    Q.actualizar();
    $("y").textContent = new Date().getFullYear();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();