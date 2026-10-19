/* ============================================================
   CATÁLOGO DE MÓDULOS + funciones de dibujo SVG
   ============================================================ */
window.MOMAF = window.MOMAF || {};

window.MOMAF.MODULES = {

  "cajonera-2": {
    label: "Cajonera 2 cajones",
    unitLabel: "cajones", minQty: 2, maxQty: 5, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, Math.max(2, ctx.qty||2)); }
  },
  "cajonera-3": {
    label: "Cajonera 3 cajones",
    unitLabel: "cajones", minQty: 2, maxQty: 5, defaultQty: 3,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, ctx.qty||3); }
  },
  "cajonera-4": {
    label: "Cajonera 4 cajones",
    unitLabel: "cajones", minQty: 2, maxQty: 6, defaultQty: 4,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, ctx.qty||4); }
  },
  "cajonera-baño": {
    label: "Cajonera de baño",
    unitLabel: "cajones", minQty: 2, maxQty: 4, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, ctx.qty||2); }
  },
  "cajonera-interna": {
    label: "Cajonera interna",
    unitLabel: "cajones", minQty: 2, maxQty: 5, defaultQty: 3,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, ctx.qty||3); }
  },
  "cajonera-lateral": {
    label: "Cajonera lateral",
    unitLabel: "cajones", minQty: 2, maxQty: 4, defaultQty: 3,
    draw: function(x,y,w,h,ctx){ return drawCajonera(x,y,w,h, ctx.qty||3); }
  },

  "puerta-simple": {
    label: "Puerta batiente",
    unitLabel: "puertas", minQty: 1, maxQty: 3, defaultQty: 1,
    draw: function(x,y,w,h,ctx){ return drawPuertas(x,y,w,h, ctx.qty||1); }
  },
  "puerta-doble": {
    label: "Puertas dobles",
    unitLabel: "puertas", minQty: 2, maxQty: 4, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawPuertas(x,y,w,h, Math.max(2, ctx.qty||2)); }
  },
  "puerta-batiente": {
    label: "Puerta batiente",
    unitLabel: "puertas", minQty: 1, maxQty: 4, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawPuertas(x,y,w,h, ctx.qty||2); }
  },
  "puerta-corrediza": {
    label: "Puertas corredizas",
    unitLabel: "puertas", minQty: 2, maxQty: 4, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawPuertasCorredizas(x,y,w,h, ctx.qty||2); }
  },
  "puerta-vidriera": {
    label: "Puerta vidriera",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawPuertaVidriera(x,y,w,h); }
  },
  "puertas-inferiores": {
    label: "Puertas inferiores",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawPuertasInferiores(x,y,w,h); }
  },
  "puerta-cajon": {
    label: "Cajón + Puerta",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawCajonPuerta(x,y,w,h); }
  },
  "puerta-bajo-pileta": {
    label: "Puerta bajo pileta",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawPuertaSimple(x,y,w,h); }
  },

  "hueco-tacho": {
    label: "Hueco para tacho de basura",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawHuecoTacho(x,y,w,h); }
  },
  "hueco-microondas": {
    label: "Espacio para microondas",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawHuecoMicroondas(x,y,w,h); }
  },
  "hueco-horno": {
    label: "Espacio para horno",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawHuecoHorno(x,y,w,h); }
  },
  "soporte-vajilla": {
    label: "Soporte para vajilla",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawSoporteVajilla(x,y,w,h); }
  },
  "lavavajillas": {
    label: "Lavavajillas",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawLavavajillas(x,y,w,h); }
  },
  "bajo-pileta": {
    label: "Hueco bajo pileta",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawBajoPileta(x,y,w,h); }
  },

  "canasto-extraible": {
    label: "Canasto extraíble",
    unitLabel: "canastos", minQty: 1, maxQty: 3, defaultQty: 2,
    draw: function(x,y,w,h,ctx){ return drawCanastos(x,y,w,h, ctx.qty||2); }
  },
  "cajon-base": {
    label: "Cajón base",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawCajonBase(x,y,w,h); }
  },

  "abierto-1": {
    label: "Abierto (1 estante)",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAbierto(x,y,w,h, 1); }
  },
  "abierto-2": {
    label: "Abierto (2 estantes)",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAbierto(x,y,w,h, 2); }
  },
  "abierto-3": {
    label: "Abierto (3 estantes)",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAbierto(x,y,w,h, 3); }
  },
  "abierto-4": {
    label: "Abierto (4 estantes)",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAbierto(x,y,w,h, 4); }
  },

  "barral-1": {
    label: "Barral simple",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawBarral(x,y,w,h, 1); }
  },
  "barral-2": {
    label: "Doble barral",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawBarral(x,y,w,h, 2); }
  },
  "estantes-3": {
    label: "3 estantes",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawEstantesInternos(x,y,w,h, 3); }
  },
  "estantes-5": {
    label: "5 estantes",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawEstantesInternos(x,y,w,h, 5); }
  },
  "zapatera": {
    label: "Zapatera",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawZapatera(x,y,w,h); }
  },

  "ala-extension": {
    label: "Ala de extensión",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAlaExtension(x,y,w,h); }
  },
  "estante-superior": {
    label: "Estante superior",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawEstanteSuperior(x,y,w,h); }
  },

  "espejo-con-luz": {
    label: "Espejo con luz",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawEspejoConLuz(x,y,w,h); }
  },
  "columna-abierta": {
    label: "Columna abierta",
    unitLabel: null,
    draw: function(x,y,w,h){ return drawAbierto(x,y,w,h, 3); }
  }
};

/* HELPERS */
function svgRect(x, y, w, h, cls, rx){
  return '<rect class="'+(cls||'ff')+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'"/>';
}
function svgLine(x1, y1, x2, y2, cls){
  return '<line class="'+(cls||"fl")+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>';
}
function svgHandle(x, y, w, h){
  var r = Math.min(w,h)/2;
  return '<rect class="fh" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'"/>';
}
function svgDarkRect(x, y, w, h, rx){
  return '<rect class="fd" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'"/>';
}

function drawCajonera(x, y, w, h, n){
  var parts = [], gap = 3;
  var cH = (h - gap*(n-1)) / n;
  for(var i=0; i<n; i++){
    var cy = y + i*(cH+gap);
    parts.push(svgRect(x, cy, w, cH, "ff", 2));
    parts.push(svgHandle(x + w/2 - 12, cy + cH/2 - 1.5, 24, 3));
  }
  return parts.join("");
}

function drawPuertaSimple(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  parts.push(svgHandle(x + w - 10, y + h/2 - 11, 3, 22));
  return parts.join("");
}

function drawPuertas(x, y, w, h, n){
  var parts = [], gap = 2;
  var pW = (w - gap*(n-1)) / n;
  for(var i=0; i<n; i++){
    var px = x + i*(pW+gap);
    parts.push(svgRect(px, y, pW, h, "ff", 2));
    var isLeft = (i % 2 === 0);
    var hx = isLeft ? (px + pW - 8) : (px + 5);
    parts.push(svgHandle(hx, y + h/2 - 11, 3, 22));
  }
  return parts.join("");
}

function drawPuertasCorredizas(x, y, w, h, n){
  var parts = [];
  var pW = w/2;
  parts.push(svgRect(x, y, pW, h, "ff", 2));
  parts.push(svgHandle(x + pW - 10, y + h/2 - 11, 3, 22));
  parts.push('<rect class="ff" x="'+(x+pW-6)+'" y="'+(y+4)+'" width="'+(w-pW+6)+'" height="'+(h-8)+'" rx="2" style="filter:brightness(0.85)"/>');
  parts.push(svgHandle(x + pW + 6, y + h/2 - 11, 3, 22));
  return parts.join("");
}

function drawPuertaVidriera(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  var ix = x+6, iy = y+6, iw = w-12, ih = h-12;
  parts.push('<rect x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" rx="2" fill="rgba(74,144,226,.15)" stroke="rgba(255,255,255,.25)"/>');
  parts.push(svgLine(ix, iy + ih/2, ix + iw, iy + ih/2, "fl"));
  parts.push(svgHandle(x + w - 10, y + h/2 - 11, 3, 22));
  return parts.join("");
}

function drawPuertasInferiores(x, y, w, h){
  var parts = [];
  var pW = w/2;
  var pY = y + h*0.45;
  var pH = h*0.55;
  parts.push(svgRect(x, pY, pW - 2, pH, "ff", 2));
  parts.push(svgRect(x + pW + 2, pY, pW - 2, pH, "ff", 2));
  parts.push(svgHandle(x + pW - 12, pY + pH/2 - 1.5, 10, 3));
  parts.push(svgHandle(x + pW + 2, pY + pH/2 - 1.5, 10, 3));
  var izY = y, izH = h*0.42;
  parts.push(svgDarkRect(x, izY, w, izH, 2));
  for(var i=1; i<=3; i++){
    var ly = izY + (izH/4)*i;
    parts.push('<rect class="fb" x="'+x+'" y="'+(ly-1)+'" width="'+w+'" height="2"/>');
  }
  return parts.join("");
}

function drawCajonPuerta(x, y, w, h){
  var parts = [];
  var cajonH = h * 0.32;
  parts.push(svgRect(x, y, w, cajonH, "ff", 2));
  parts.push(svgHandle(x + w/2 - 12, y + cajonH/2 - 1.5, 24, 3));
  var py = y + cajonH + 3;
  var ph = h - cajonH - 3;
  parts.push(svgRect(x, py, w, ph, "ff", 2));
  parts.push(svgHandle(x + w - 10, py + ph/2 - 11, 3, 22));
  return parts.join("");
}

function drawHuecoTacho(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  var ix = x+6, iy = y+6, iw = w-12, ih = h-12;
  parts.push(svgDarkRect(ix, iy, iw, ih, 2));
  var tw = iw * 0.55;
  var th = ih * 0.7;
  var tx = ix + (iw - tw)/2;
  var ty = iy + ih - th - 4;
  parts.push('<rect x="'+tx+'" y="'+(ty+6)+'" width="'+tw+'" height="'+(th-6)+'" rx="3" fill="#3a4048" stroke="rgba(255,255,255,.2)"/>');
  parts.push('<rect x="'+(tx-2)+'" y="'+ty+'" width="'+(tw+4)+'" height="6" rx="2" fill="#4a5058"/>');
  parts.push('<rect x="'+(tx+tw/2-4)+'" y="'+(ty+th-2)+'" width="8" height="3" rx="1.5" fill="#5a6068"/>');
  parts.push('<text x="'+(ix+iw/2)+'" y="'+(iy+12)+'" font-size="10" fill="#a3abb8" text-anchor="middle" font-family="sans-serif">Tacho</text>');
  return parts.join("");
}

function drawHuecoMicroondas(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  var mx = x+6, my = y+6, mw = w-12, mh = h-12;
  parts.push('<rect x="'+mx+'" y="'+my+'" width="'+mw+'" height="'+mh+'" rx="3" fill="#1e2126" stroke="rgba(255,255,255,.15)"/>');
  parts.push('<rect x="'+(mx+4)+'" y="'+(my+4)+'" width="'+(mw*0.65)+'" height="'+(mh-8)+'" rx="2" fill="rgba(0,0,0,.6)"/>');
  var px2 = mx + mw*0.72;
  parts.push('<rect x="'+px2+'" y="'+(my+4)+'" width="'+(mw*0.24)+'" height="'+((mh-8)*0.5)+'" rx="2" fill="#2a2d33"/>');
  parts.push('<circle cx="'+(px2 + mw*0.12)+'" cy="'+(my + mh*0.65)+'" r="3" fill="#4a90e2"/>');
  return parts.join("");
}

function drawHuecoHorno(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  var mx = x+8, my = y+8, mw = w-16, mh = h-16;
  parts.push('<rect x="'+mx+'" y="'+my+'" width="'+mw+'" height="'+mh+'" rx="2" fill="#14161a" stroke="rgba(255,255,255,.15)"/>');
  parts.push('<rect x="'+(mx+6)+'" y="'+(my+6)+'" width="'+(mw-12)+'" height="'+(mh*0.55)+'" rx="2" fill="rgba(0,0,0,.75)" stroke="rgba(255,255,255,.1)"/>');
  parts.push(svgHandle(mx + mw/2 - 20, my + mh*0.72, 40, 4));
  return parts.join("");
}

function drawSoporteVajilla(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  parts.push(svgDarkRect(x+6, y+6, w-12, h-12, 2));
  /* Platos apilados */
  var cx = x + w/2;
  var cy = y + h*0.5;
  parts.push('<ellipse cx="'+cx+'" cy="'+(cy-4)+'" rx="'+(w*0.32)+'" ry="'+(h*0.08)+'" fill="#e8e8e8" opacity="0.75"/>');
  parts.push('<ellipse cx="'+cx+'" cy="'+(cy+6)+'" rx="'+(w*0.32)+'" ry="'+(h*0.08)+'" fill="#e8e8e8" opacity="0.6"/>');
  parts.push('<text x="'+cx+'" y="'+(y+16)+'" font-size="10" fill="#a3abb8" text-anchor="middle" font-family="sans-serif">Vajilla</text>');
  return parts.join("");
}

function drawLavavajillas(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  parts.push('<rect x="'+(x+4)+'" y="'+(y+4)+'" width="'+(w-8)+'" height="'+(h*0.18)+'" rx="2" fill="rgba(0,0,0,.35)"/>');
  for(var i=0; i<3; i++){
    parts.push('<circle cx="'+(x+12+i*10)+'" cy="'+(y + h*0.13)+'" r="2.5" fill="#4a90e2"/>');
  }
  parts.push(svgHandle(x + w/2 - 18, y + h*0.28, 36, 4));
  parts.push(svgLine(x+4, y + h*0.55, x+w-4, y + h*0.55, "fl"));
  return parts.join("");
}

function drawBajoPileta(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  parts.push(svgDarkRect(x+6, y+6, w-12, h-12, 2));
  var cx = x + w/2;
  parts.push('<rect x="'+(cx-3)+'" y="'+(y+h*0.3)+'" width="6" height="'+(h*0.5)+'" fill="#7a8088" rx="2"/>');
  parts.push('<path d="M '+(x+4)+' '+(y+4)+' Q '+(cx)+' '+(y-2)+' '+(x+w-4)+' '+(y+4)+' L '+(x+w-4)+' '+(y+h*0.18)+' L '+(x+4)+' '+(y+h*0.18)+' Z" fill="#8a9099" opacity="0.85"/>');
  parts.push('<rect x="'+(cx-2)+'" y="'+(y+2)+'" width="4" height="10" fill="#a0a4a8" rx="1"/>');
  return parts.join("");
}

function drawCanastos(x, y, w, h, n){
  var parts = [], gap = 4;
  var cH = (h - gap*(n-1)) / n;
  for(var i=0; i<n; i++){
    var cy = y + i*(cH+gap);
    parts.push(svgRect(x, cy, w, cH, "ff", 2));
    for(var j=1; j<5; j++){
      var lx = x + (w/5)*j;
      parts.push(svgLine(lx, cy+6, lx, cy + cH - 6, "fl"));
    }
    parts.push(svgHandle(x + w/2 - 12, cy + cH/2 - 1.5, 24, 3));
  }
  return parts.join("");
}

function drawCajonBase(x, y, w, h){
  var parts = [];
  var cajonH = h * 0.22;
  parts.push(svgRect(x, y + h - cajonH, w, cajonH, "ff", 2));
  parts.push(svgHandle(x + w/2 - 12, y + h - cajonH/2 - 1.5, 24, 3));
  return parts.join("");
}

function drawAbierto(x, y, w, h, n){
  var parts = [];
  parts.push(svgDarkRect(x, y, w, h, 2));
  parts.push('<rect class="fb" x="'+x+'" y="'+y+'" width="3" height="'+h+'"/>');
  parts.push('<rect class="fb" x="'+(x+w-3)+'" y="'+y+'" width="3" height="'+h+'"/>');
  for(var i=1; i<=n; i++){
    var ly = y + (h/(n+1))*i;
    parts.push('<rect class="fb" x="'+x+'" y="'+(ly-1.5)+'" width="'+w+'" height="3" rx="1"/>');
  }
  return parts.join("");
}

function drawBarral(x, y, w, h, n){
  var parts = [];
  parts.push(svgDarkRect(x, y, w, h, 2));
  for(var i=0; i<n; i++){
    var ly = y + (h/(n+1))*(i+1);
    parts.push('<rect class="fh" x="'+(x+8)+'" y="'+(ly-2)+'" width="'+(w-16)+'" height="4" rx="2"/>');
  }
  return parts.join("");
}

function drawEstantesInternos(x, y, w, h, n){
  var parts = [];
  parts.push(svgDarkRect(x, y, w, h, 2));
  parts.push('<rect class="fb" x="'+x+'" y="'+y+'" width="3" height="'+h+'"/>');
  parts.push('<rect class="fb" x="'+(x+w-3)+'" y="'+y+'" width="3" height="'+h+'"/>');
  for(var i=1; i<=n; i++){
    var ly = y + (h/(n+1))*i;
    parts.push('<rect class="fb" x="'+x+'" y="'+(ly-1.5)+'" width="'+w+'" height="3" rx="1"/>');
  }
  return parts.join("");
}

function drawZapatera(x, y, w, h){
  var parts = [];
  parts.push(svgDarkRect(x, y, w, h, 2));
  var n = 4;
  for(var i=0; i<n; i++){
    var ly = y + (h/(n+1))*(i+1);
    parts.push('<rect class="fb" x="'+x+'" y="'+ly+'" width="'+w+'" height="3" transform="rotate(-8 '+(x+w/2)+' '+ly+')"/>');
  }
  return parts.join("");
}

function drawAlaExtension(x, y, w, h){
  var parts = [];
  parts.push(svgRect(x, y, w, h, "ff", 2));
  parts.push(svgHandle(x + w/2 - 12, y + h/2 - 1.5, 24, 3));
  return parts.join("");
}

function drawEstanteSuperior(x, y, w, h){
  var parts = [];
  var alto = h * 0.5;
  parts.push(svgRect(x, y + h - alto, w, alto, "ff", 2));
  parts.push(svgDarkRect(x, y, w, h - alto - 4, 2));
  return parts.join("");
}

function drawEspejoConLuz(x, y, w, h){
  var parts = [];
  parts.push('<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="3" fill="#3a4048" stroke="rgba(255,255,255,.2)"/>');
  parts.push('<rect x="'+(x+6)+'" y="'+(y+6)+'" width="'+(w-12)+'" height="'+(h-12)+'" rx="2" fill="rgba(120,160,200,.35)"/>');
  parts.push('<rect x="'+(x+6)+'" y="'+(y+2)+'" width="'+(w-12)+'" height="3" fill="#e8d6a0" opacity="0.8" rx="1.5"/>');
  return parts.join("");
}