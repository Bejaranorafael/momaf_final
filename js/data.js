/* ============================================================
   MUEBLES — SVG estáticos + fábrica automática para modulares
   ============================================================ */
window.MOMAF = window.MOMAF || {};

window.MOMAF.FURNITURES = {
  "Bajo mesada":     { label: "Bajo mesada",     modular: true },
  "Alacena":         { label: "Alacena",         modular: true },
  "Bajo pileta":     { label: "Bajo pileta",     modular: true },
  "Placard":         { label: "Placard",         modular: true },
  "Vestidor":        { label: "Vestidor",        modular: true },
  "Biblioteca":      { label: "Biblioteca",      modular: true },
  "Estante":         { label: "Estante",         modular: true },
  "Escritorio":      { label: "Escritorio",      modular: true },
  "Mesa de luz":     { label: "Mesa de luz",     modular: true },
  "Cómoda":          { label: "Cómoda",          modular: true },
  "Mueble de baño":  { label: "Mueble de baño",  modular: true }
};

window.MOMAF.MODULE_ENGINE = (function(){
  var VIEW_W = 900;
  var VIEW_H = 500;
  var PAD = 30;
  var TOP = 50;
  var BOTTOM = 50;

  function calcularAnchos(modules, totalCm, innerW){
    if(!modules.length) return [];
    var sumLockedCm = 0, freeCount = 0;
    modules.forEach(function(m){
      if(m.locked && m.width > 0){ sumLockedCm += m.width; }
      else { freeCount++; }
    });
    var restCm = Math.max(0, totalCm - sumLockedCm);
    var autoCm = freeCount > 0 ? restCm / freeCount : 0;
    var cm = modules.map(function(m){
      return (m.locked && m.width > 0) ? m.width : autoCm;
    });
    var sumCm = cm.reduce(function(a,b){return a+b;}, 0);
    if(sumCm > 0 && sumCm > totalCm){
      var factor = totalCm / sumCm;
      cm = cm.map(function(v,i){ return modules[i].locked ? v : v * factor; });
    }
    var sumFinal = cm.reduce(function(a,b){return a+b;}, 0) || 1;
    var escala = innerW / sumFinal;
    var out = [], acc = 0;
    for(var i=0; i<modules.length; i++){
      var w = cm[i] * escala;
      out.push({ start: acc, width: w, cm: Math.round(cm[i]) });
      acc += w;
    }
    return out;
  }

  function render(modules, opts){
    var MODULES = window.MOMAF.MODULES;
    var totalCm = (opts && opts.totalCm) || 240;

    var partes = [];
    var innerX = PAD;
    var innerY = TOP;
    var innerW = VIEW_W - PAD*2;
    var innerH = VIEW_H - TOP - BOTTOM;

    var anchos = calcularAnchos(modules, totalCm, innerW);

    partes.push('<rect class="fb" x="'+innerX+'" y="'+innerY+'" width="'+innerW+'" height="'+innerH+'" rx="4"/>');

    modules.forEach(function(m, i){
      var def = MODULES[m.type];
      if(!def) return;
      var a = anchos[i];
      if(!a) return;
      var ctx = { qty: m.qty || def.defaultQty || 1 };
      var sub = def.draw(
        innerX + a.start + 6,
        innerY + 6,
        Math.max(10, a.width - 12),
        innerH - 12,
        ctx
      );
      partes.push('<g data-module="'+i+'" data-type="'+m.type+'">' + sub + '</g>');
    });

    for(var j=0; j<anchos.length - 1; j++){
      var sepX = innerX + anchos[j].start + anchos[j].width;
      partes.push('<line class="fl" x1="'+sepX+'" y1="'+innerY+'" x2="'+sepX+'" y2="'+(innerY+innerH)+'" stroke-width="2"/>');
    }

    partes.push('<rect class="fb" x="'+(innerX-8)+'" y="'+(innerY-18)+'" width="'+(innerW+16)+'" height="16" rx="3"/>');
    partes.push('<rect class="fb" x="'+(innerX-2)+'" y="'+(innerY+innerH)+'" width="'+(innerW+4)+'" height="12" rx="2"/>');
    partes.push('<rect class="fs" x="'+(innerX-2)+'" y="'+(innerY+innerH+12)+'" width="'+(innerW+4)+'" height="4" rx="2"/>');

    var svg = '<svg viewBox="0 0 '+VIEW_W+' '+VIEW_H+'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">'
      + partes.join("") + '</svg>';

    return { svg: svg, contenido: partes.join(""), anchos: anchos, totalCm: totalCm };
  }

  return { render: render, calcularAnchos: calcularAnchos };
})();

(function generarSVGsDeFabrica(){
  var cfg = window.MOMAF.CONFIG;
  var F   = window.MOMAF.FURNITURES;
  var ENG = window.MOMAF.MODULE_ENGINE;
  if(!cfg || !F || !ENG) return;

  Object.keys(F).forEach(function(tipo){
    if(!F[tipo].modular) return;
    var preset = (cfg.PRESETS && cfg.PRESETS[tipo]) || [];
    if(!preset.length) return;
    var totalCm = (cfg.ANCHOS_DEFAULT && cfg.ANCHOS_DEFAULT[tipo]) || 240;

    F[tipo]._presetDefault = JSON.parse(JSON.stringify(preset));
    F[tipo]._totalCmDefault = totalCm;

    var res = ENG.render(preset, { totalCm: totalCm });
    var s = 400/900;
    var newH = 500 * s;
    var ty = (300 - newH) / 2;

    F[tipo].svg = '<g transform="translate(0,'+ty+') scale('+s+','+s+')">'
      + res.contenido + '</g>';
  });
})();