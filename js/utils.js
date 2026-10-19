window.MOMAF = window.MOMAF || {};

window.MOMAF.utils = (function(){
  function $(id){ return document.getElementById(id); }
  function peso(n){ return "$" + (Math.round(n/10000)*10000).toLocaleString("es-AR"); }
  function esMovil(){ return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); }

  function waUrl(texto){
    var cfg = window.MOMAF.CONFIG;
    var t = encodeURIComponent(texto);
    return esMovil()
      ? ("https://wa.me/" + cfg.WHATSAPP + "?text=" + t)
      : ("https://web.whatsapp.com/send?phone=" + cfg.WHATSAPP + "&text=" + t);
  }

  function guardar(state){
    try{
      var data = {
        mode: state.mode,
        furniture: state.furniture,
        set: state.set,
        body: state.body,
        front: state.front,
        globalBody: state.globalBody,
        globalFront: state.globalFront,
        memberColors: state.memberColors,
        modulesByFurniture: state.modulesByFurniture,
        totalWidthByFurniture: state.totalWidthByFurniture
      };
      localStorage.setItem(window.MOMAF.CONFIG.LS_KEY, JSON.stringify(data));
    }catch(e){}
  }

  function cargar(state){
    try{
      var raw = localStorage.getItem(window.MOMAF.CONFIG.LS_KEY);
      if(!raw) return;
      var s = JSON.parse(raw);
      var F = window.MOMAF.FURNITURES;
      var C = window.MOMAF.CONFIG.COLORES;
      var A = window.MOMAF.CONFIG.AMBIENTES;

      if(s.mode === "single" || s.mode === "set") state.mode = s.mode;
      if(F[s.furniture]) state.furniture = s.furniture;
      if(A.filter(function(a){return a.id === s.set;}).length) state.set = s.set;
      if(typeof s.body === "number" && C[s.body]) state.body = s.body;
      if(typeof s.front === "number" && C[s.front]) state.front = s.front;
      if(typeof s.globalBody === "number" && C[s.globalBody]) state.globalBody = s.globalBody;
      if(typeof s.globalFront === "number" && C[s.globalFront]) state.globalFront = s.globalFront;
      if(s.memberColors && typeof s.memberColors === "object") state.memberColors = s.memberColors;
      if(s.modulesByFurniture && typeof s.modulesByFurniture === "object") state.modulesByFurniture = s.modulesByFurniture;
      if(s.totalWidthByFurniture && typeof s.totalWidthByFurniture === "object") state.totalWidthByFurniture = s.totalWidthByFurniture;
    }catch(e){}
  }

  function placeholderSVG(txt){
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>"
      + "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>"
      + "<stop offset='0' stop-color='#1a2335'/><stop offset='1' stop-color='#0b0f19'/>"
      + "</linearGradient></defs>"
      + "<rect width='800' height='600' fill='url(#g)'/>"
      + "<rect x='160' y='150' width='480' height='300' rx='6' fill='none' stroke='#b07a4f' stroke-width='2' stroke-dasharray='10 8'/>"
      + "<text x='400' y='305' font-family='sans-serif' font-size='34' fill='#f3f4f6' text-anchor='middle'>"+txt+"</text>"
      + "<text x='400' y='345' font-family='sans-serif' font-size='18' fill='#a3abb8' text-anchor='middle'>Foto de muestra</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function clone(o){ return JSON.parse(JSON.stringify(o)); }

  return {
    $: $, peso: peso, esMovil: esMovil, waUrl: waUrl,
    guardar: guardar, cargar: cargar, placeholderSVG: placeholderSVG, clone: clone
  };
})();