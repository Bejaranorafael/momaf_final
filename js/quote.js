window.MOMAF = window.MOMAF || {};

window.MOMAF.quote = (function(){
  var U = window.MOMAF.utils;
  var $ = U.$;

  function medidas(){
    return { a: +$("ancho").value || 0, h: +$("alto").value || 0, p: +$("prof").value || 0 };
  }

  function extras(){
    var arr = [];
    if($("cajones").checked)  arr.push("con cajones extra");
    if($("herrajes").checked) arr.push("herrajes premium");
    return arr;
  }

  function estimado(){
    var cfg = window.MOMAF.CONFIG;
    var S = window.MOMAF.simulator;
    var m = medidas();
    var activos = S.coloresActivos();
    if(!activos.length) return null;

    var total = 0, hayAlguna = false;

    activos.forEach(function(item){
      var base = cfg.PRECIO_M2[item.tipo];
      if(!base) return;

      var a, h;
      if(item.dims){ a = item.dims.a; h = item.dims.h; }
      else { a = m.a; h = m.h; }
      if(!a || !h) return;

      total += (a*h/10000) * base;
      hayAlguna = true;

      if(item.modules && item.modules.length){
        item.modules.forEach(function(mod){
          var def = window.MOMAF.MODULES[mod.type];
          var qty = (mod.qty && def && def.unitLabel) ? mod.qty : 1;
          var precio = cfg.PRECIO_MODULO[mod.type] || 0;
          total += precio * qty;
        });
      }
    });

    if(!hayAlguna) return null;
    if($("herrajes").checked) total *= (1 + cfg.EXTRA_HERRAJES);

    return U.peso(total*(1-cfg.MARGEN)) + " a " + U.peso(total*(1+cfg.MARGEN));
  }

  function validar(){
    var S = window.MOMAF.simulator;
    var req = ["nombre","zona"];
    if(S.state.mode === "single") req.push("ancho","alto");
    var ok = true;
    req.forEach(function(id){
      var el = $(id);
      var malo = !el.value.trim() || (el.type === "number" && +el.value <= 0);
      el.classList.toggle("err", malo);
      if(malo) ok = false;
    });
    return ok;
  }

  function mensaje(){
    var S = window.MOMAF.simulator;
    var C = window.MOMAF.CONFIG.COLORES;
    var F = window.MOMAF.FURNITURES;

    function v(id){ return $(id).value.trim(); }
    var m = medidas();
    var activos = S.coloresActivos();
    var ex = extras();
    var est = estimado();

    var enc = "Hola MOMAF! Quiero cotizar:\n"
      + "Nombre: " + (v("nombre")||"-") + "\n"
      + "Localidad: " + (v("zona")||"-") + "\n"
      + (v("contacto") ? "Contacto: " + v("contacto") + "\n" : "")
      + "Modo: " + S.nombreModo() + "\n";

    var cuerpo = "";
    if(S.state.mode === "single"){
      var item = activos[0];
      cuerpo += "Mueble: " + F[item.tipo].label + "\n";
      if(item.totalCm) cuerpo += "Ancho total: " + item.totalCm + " cm\n";
      cuerpo += "Color cuerpo: " + C[item.body].n + "\n"
             + "Color frentes: " + C[item.front].n + "\n";
      cuerpo += "Medidas: "
        + ((m.a||m.h||m.p)
            ? ((m.a||"?") + " x " + (m.h||"?") + " x " + (m.p||"?") + " cm")
            : "a definir")
        + "\n";
      if(item.modules && item.modules.length){
        cuerpo += "Módulos:\n";
        item.modules.forEach(function(mod, i){
          var def = window.MOMAF.MODULES[mod.type];
          var qty = (mod.qty && def && def.unitLabel) ? (" ×" + mod.qty) : "";
          var anchoTxt = mod.locked && mod.width ? (" — " + mod.width + " cm") : "";
          cuerpo += "  " + (i+1) + ". " + (def ? def.label : mod.type) + qty + anchoTxt + "\n";
        });
      }
    } else {
      cuerpo += "Muebles del ambiente:\n";
      activos.forEach(function(item, i){
        var d = item.dims || {};
        cuerpo += (i+1) + ". " + item.tipo
          + " — " + (d.a||"?") + "x" + (d.h||"?") + "x" + (d.p||"?") + " cm"
          + " — Cuerpo: " + C[item.body].n
          + " / Frentes: " + C[item.front].n
          + "\n";
        if(item.modules && item.modules.length){
          item.modules.forEach(function(mod){
            var def = window.MOMAF.MODULES[mod.type];
            var qty = (mod.qty && def && def.unitLabel) ? (" ×" + mod.qty) : "";
            cuerpo += "     · " + (def ? def.label : mod.type) + qty + "\n";
          });
        }
      });
      if(m.a || m.h || m.p){
        cuerpo += "Medidas del espacio: " + (m.a||"?") + " x " + (m.h||"?") + " x " + (m.p||"?") + " cm\n";
      }
    }

    var cola = (ex.length ? "Extras: " + ex.join(", ") + "\n" : "")
      + (est ? "Estimado de la web: " + est + "\n" : "")
      + "¡Gracias!";

    return enc + cuerpo + cola;
  }

  function actualizar(){
    var S = window.MOMAF.simulator;
    var C = window.MOMAF.CONFIG.COLORES;
    var F = window.MOMAF.FURNITURES;
    var m = medidas();
    var activos = S.coloresActivos();

    $("sModo").textContent = S.nombreModo();

    var listEl = $("summaryList");
    listEl.innerHTML = "";
    if(S.state.mode === "set"){
      activos.forEach(function(item){
        var li = document.createElement("li");
        var d = item.dims || {};
        var modsTxt = "";
        if(item.modules && item.modules.length){
          var defs = item.modules.map(function(md){
            var def = window.MOMAF.MODULES[md.type];
            return def ? def.label : md.type;
          });
          modsTxt = "<small>" + defs.join(" · ") + "</small>";
        }
        li.innerHTML = '<div><b>' + item.tipo + '</b>'
          + '<small>' + (d.a||"?") + 'x' + (d.h||"?") + 'x' + (d.p||"?") + ' cm</small>'
          + modsTxt
          + '</div>'
          + '<div style="display:flex;gap:4px;">'
          + '<span class="sw-mini" style="background:' + C[item.body].c + '" title="Cuerpo"></span>'
          + '<span class="sw-mini" style="background:' + C[item.front].c + '" title="Frentes"></span>'
          + '</div>';
        listEl.appendChild(li);
      });
    }

    if(S.state.mode === "single"){
      var item = activos[0];
      $("sTipo").textContent = item ? F[item.tipo].label : "-";
      $("sBody").textContent = item ? C[item.body].n : "-";
      $("sFront").textContent = item ? C[item.front].n : "-";
    } else {
      $("sTipo").textContent  = activos.length + " muebles";
      $("sBody").textContent  = "Varios";
      $("sFront").textContent = "Varios";
    }

    $("sMed").textContent = (m.a||m.h||m.p)
      ? ((m.a||"?") + " x " + (m.h||"?") + " x " + (m.p||"?") + " cm")
      : (S.state.mode === "single" ? "Sin completar" : "Medidas de referencia");

    var ex = extras();
    $("sExtras").textContent = ex.length ? ex.join(" + ") : "—";
    $("sEst").textContent    = estimado() || "Cargá las medidas";

    var ok = validar(), send = $("send");
    if(ok){
      send.href = U.waUrl(mensaje());
      send.target = "_blank"; send.rel = "noopener";
      send.style.opacity = ""; send.style.pointerEvents = "";
      $("sendNote").textContent = "El estimado es orientativo. Te confirmamos el precio final por WhatsApp, sin compromiso.";
    } else {
      send.href = "#"; send.style.opacity = ".5"; send.style.pointerEvents = "none";
      $("sendNote").textContent = "Completá nombre, localidad y medidas para enviar.";
    }

    $("waFloat").href = U.waUrl("Hola MOMAF! Quiero hacer una consulta.");
  }

  function initListeners(){
    ["nombre","zona","contacto","ancho","alto","prof","cajones","herrajes"].forEach(function(id){
      var el = $(id);
      el.addEventListener("input",  actualizar);
      el.addEventListener("change", actualizar);
    });
  }

  return { actualizar: actualizar, initListeners: initListeners };
})();