window.MOMAF = window.MOMAF || {};

window.MOMAF.simulator = (function(){
  var U = window.MOMAF.utils;
  var $ = U.$;

  var state = {
    mode: "single",
    furniture: "Bajo mesada",
    set: "cocina",
    body: 4,
    front: 1,
    globalBody: 4,
    globalFront: 1,
    memberColors: {},
    modulesByFurniture: {},
    totalWidthByFurniture: {},
    editingMember: null,
    zone: "body"
  };

  var onChange = function(){};

  function buildUI(){
    var F = window.MOMAF.FURNITURES;
    var C = window.MOMAF.CONFIG.COLORES;
    var A = window.MOMAF.CONFIG.AMBIENTES;
    var tabsEl = $("tabs");
    var selEl  = $("tipo");

    Object.keys(F).forEach(function(key){
      var b = document.createElement("button");
      b.type = "button"; b.className = "tab"; b.setAttribute("role","tab");
      b.textContent = F[key].label;
      b.dataset.key = key;
      b.addEventListener("click", function(){
        if(state.mode !== "single"){
          state.mode = "single";
          state.editingMember = null;
          refrescarToggleModo();
        }
        setFurniture(key);
      });
      tabsEl.appendChild(b);
      selEl.add(new Option(F[key].label, key));
    });

    selEl.addEventListener("change", function(e){
      if(state.mode !== "single"){
        state.mode = "single";
        state.editingMember = null;
        refrescarToggleModo();
      }
      setFurniture(e.target.value);
    });

    var setTabsEl = $("setTabs");
    A.forEach(function(amb){
      var b = document.createElement("button");
      b.type = "button"; b.className = "tab"; b.setAttribute("role","tab");
      b.textContent = amb.emoji + " " + amb.nombre;
      b.dataset.key = amb.id;
      b.title = amb.desc;
      b.addEventListener("click", function(){
        if(state.mode !== "set"){
          state.mode = "set";
          refrescarToggleModo();
        }
        setAmbiente(amb.id);
      });
      setTabsEl.appendChild(b);
    });

    var swEl = $("swatches");
    C.forEach(function(col, i){
      var b = document.createElement("button");
      b.type = "button"; b.className = "sw";
      b.style.setProperty("--c", col.c);
      b.innerHTML = '<div class="chip"></div><strong>'+col.n+'</strong><span class="ok">✓</span>';
      b.dataset.idx = i;
      b.title = col.n + " · " + col.t;
      b.addEventListener("click", function(){ setColor(i); });
      swEl.appendChild(b);
    });

    document.querySelectorAll(".zone").forEach(function(z){
      z.addEventListener("click", function(){ setZone(z.dataset.zone); });
    });

    document.querySelectorAll(".mode-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        var mode = btn.dataset.mode;
        state.mode = mode;
        state.editingMember = null;
        refrescarToggleModo();
        if(mode === "single") setFurniture(state.furniture);
        else                  setAmbiente(state.set);
      });
    });

    $("meTotalWidth").addEventListener("input", function(e){
      var v = +e.target.value;
      if(v > 0){
        var key = muebleActivoKey();
        if(!key) return;
        state.totalWidthByFurniture[key] = v;
        renderModulos();
        pintarSVG();
        U.guardar(state);
        onChange();
      }
    });

    $("meAddBtn").addEventListener("click", function(){
      var type = $("meAddSelect").value;
      if(!type) return;
      var key = muebleActivoKey();
      if(!key) return;
      agregarModulo(key, type);
    });
  }

  function muebleActivoKey(){
    if(state.mode === "single") return state.furniture;
    if(state.mode === "set"){
      var amb = getAmbiente();
      if(!amb) return null;
      return state.editingMember || amb.muebles[0].tipo;
    }
    return null;
  }

  function getAmbiente(){
    var A = window.MOMAF.CONFIG.AMBIENTES;
    return A.filter(function(a){ return a.id === state.set; })[0] || null;
  }

  function refrescarToggleModo(){
    document.querySelectorAll(".mode-btn").forEach(function(b){
      b.setAttribute("aria-pressed", b.dataset.mode === state.mode);
    });
    $("tabs").style.display       = (state.mode === "single") ? "flex" : "none";
    $("setTabs").style.display    = (state.mode === "set")    ? "flex" : "none";
    $("setMembers").style.display = (state.mode === "set")    ? "flex" : "none";
    $("stageMode").textContent    = (state.mode === "single") ? "Mueble" : "Ambiente";
    $("simPickLabel").textContent = (state.mode === "single") ? "Elegí el mueble" : "Elegí el ambiente";
  }

  function setFurniture(key){
    var F = window.MOMAF.FURNITURES;
    if(!F[key]) return;
    state.furniture = key;
    state.editingMember = null;

    prepararModulos(key);
    poblarAddSelect(key);
    $("meTotalWidth").value = state.totalWidthByFurniture[key] || 240;
    $("meTitle").textContent = "⚙️ Módulos · " + F[key].label;

    renderModulos();
    pintarSVG();

    Array.prototype.forEach.call($("tabs").children, function(t){
      t.setAttribute("aria-selected", t.dataset.key === key);
    });

    $("stageName").textContent = F[key].label;
    $("tipo").value = key;
    actualizarDots();
    U.guardar(state);
    onChange();
  }

  function prepararModulos(key){
    var F = window.MOMAF.FURNITURES;
    var cfg = window.MOMAF.CONFIG;
    if(!F[key] || !F[key].modular) return;
    if(!state.modulesByFurniture[key]){
      state.modulesByFurniture[key] = F[key]._presetDefault
        ? U.clone(F[key]._presetDefault)
        : (cfg.PRESETS && cfg.PRESETS[key] ? U.clone(cfg.PRESETS[key]) : []);
    }
    if(!state.totalWidthByFurniture[key]){
      state.totalWidthByFurniture[key] =
        F[key]._totalCmDefault ||
        (cfg.ANCHOS_DEFAULT && cfg.ANCHOS_DEFAULT[key]) ||
        240;
    }
  }

  function setAmbiente(id){
    var A = window.MOMAF.CONFIG.AMBIENTES;
    var amb = A.filter(function(a){ return a.id === id; })[0];
    if(!amb) return;
    state.set = id;
    state.editingMember = null;

    amb.muebles.forEach(function(m){
      if(!state.memberColors[m.tipo]){
        state.memberColors[m.tipo] = { body: state.globalBody, front: state.globalFront };
      }
      prepararModulos(m.tipo);
    });

    state.editingMember = amb.muebles[0].tipo;
    var key = state.editingMember;
    $("meTotalWidth").value = state.totalWidthByFurniture[key] || 240;
    $("meTitle").textContent = "⚙️ Módulos · " + key;
    poblarAddSelect(key);
    renderModulos();
    pintarSVG();
    construirMembers(amb);

    Array.prototype.forEach.call($("setTabs").children, function(t){
      t.setAttribute("aria-selected", t.dataset.key === id);
    });
    $("stageName").textContent = amb.nombre;
    actualizarDots();
    U.guardar(state);
    onChange();
  }

  function construirMembers(amb){
    var cont = $("setMembers");
    cont.innerHTML = "";

    var allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "member all";
    allBtn.dataset.member = "__all__";
    allBtn.setAttribute("aria-pressed", state.editingMember === null ? "true" : "false");
    allBtn.innerHTML = '<span class="m-dot" style="background:' + window.MOMAF.CONFIG.COLORES[state.globalBody].c + '"></span> Todos';
    allBtn.addEventListener("click", function(){
      state.editingMember = null;
      actualizarMembersActivos();
      renderModulos();
      pintarSwatchesActivos();
      onChange();
    });
    cont.appendChild(allBtn);

    amb.muebles.forEach(function(m){
      var col = state.memberColors[m.tipo] || { body: state.globalBody, front: state.globalFront };
      var b = document.createElement("button");
      b.type = "button";
      b.className = "member";
      b.dataset.member = m.tipo;
      b.setAttribute("aria-pressed", state.editingMember === m.tipo ? "true" : "false");
      b.innerHTML = '<span class="m-dot" style="background:' + window.MOMAF.CONFIG.COLORES[col.body].c + '"></span> ' + m.tipo;
      b.addEventListener("click", function(){
        state.editingMember = m.tipo;
        actualizarMembersActivos();
        var key = state.editingMember;
        poblarAddSelect(key);
        $("meTotalWidth").value = state.totalWidthByFurniture[key] || 240;
        $("meTitle").textContent = "⚙️ Módulos · " + key;
        renderModulos();
        pintarSVG();
        pintarSwatchesActivos();
        onChange();
      });
      cont.appendChild(b);
    });
  }

  function actualizarMembersActivos(){
    Array.prototype.forEach.call($("setMembers").children, function(b){
      var key = b.dataset.member;
      var active = (key === "__all__" && state.editingMember === null) || (key === state.editingMember);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function poblarAddSelect(key){
    var sel = $("meAddSelect");
    var list = (window.MOMAF.CONFIG.MODULOS_POR_MUEBLE || {})[key] || [];
    sel.innerHTML = "";
    if(!list.length){
      sel.add(new Option("— este mueble no admite módulos —", ""));
      sel.disabled = true;
      $("meAddBtn").disabled = true;
      return;
    }
    sel.disabled = false;
    $("meAddBtn").disabled = false;
    list.forEach(function(t){
      var def = window.MOMAF.MODULES[t];
      if(def) sel.add(new Option(def.label, t));
    });
  }

  function renderModulos(){
    var cont = $("meModules");
    var bar  = $("meBar");
    var key  = muebleActivoKey();
    var F    = window.MOMAF.FURNITURES;
    var MODULES = window.MOMAF.MODULES;

    cont.innerHTML = "";
    bar.innerHTML = "";

    if(!key || !F[key]){
      cont.innerHTML = '<div class="me-empty">Elegí un mueble para ver sus módulos.</div>';
      return;
    }

    var modules = state.modulesByFurniture[key] || [];
    var totalCm = state.totalWidthByFurniture[key] || 240;

    if(!modules.length){
      cont.innerHTML = '<div class="me-empty">Sin módulos. Agregá uno abajo.</div>';
      return;
    }

    var anchos = window.MOMAF.MODULE_ENGINE.calcularAnchos(modules, totalCm, 100);

    modules.forEach(function(m, i){
      var def = MODULES[m.type];
      if(!def) return;
      var seg = document.createElement("div");
      seg.className = "seg";
      seg.dataset.type = m.type;
      seg.style.flex = anchos[i].cm + " 1 0";
      seg.textContent = anchos[i].cm + " cm";
      seg.title = def.label + " — " + anchos[i].cm + " cm";
      bar.appendChild(seg);
    });

    modules.forEach(function(m, i){
      var def = MODULES[m.type];
      if(!def) return;
      var item = document.createElement("div");
      item.className = "me-item";

      var order = document.createElement("div");
      order.className = "me-order";
      var up = document.createElement("button");
      up.type = "button"; up.textContent = "▲"; up.title = "Subir";
      up.disabled = (i === 0);
      up.addEventListener("click", function(){ moverModulo(i, -1); });
      var dn = document.createElement("button");
      dn.type = "button"; dn.textContent = "▼"; dn.title = "Bajar";
      dn.disabled = (i === modules.length - 1);
      dn.addEventListener("click", function(){ moverModulo(i, +1); });
      order.appendChild(up); order.appendChild(dn);

      var label = document.createElement("div");
      label.className = "me-label";
      label.innerHTML = "<strong>" + def.label + "</strong>" +
        "<small>" + anchos[i].cm + " cm</small>";

      var config = document.createElement("div");
      config.className = "me-config";
      if(def.unitLabel){
        var lbl = document.createElement("label");
        lbl.textContent = def.unitLabel + ":";
        var inp = document.createElement("input");
        inp.type = "number";
        inp.min = def.minQty; inp.max = def.maxQty;
        inp.value = m.qty || def.defaultQty;
        inp.addEventListener("change", function(e){
          var v = Math.max(def.minQty, Math.min(def.maxQty, +e.target.value || def.defaultQty));
          m.qty = v;
          e.target.value = v;
          pintarSVG();
          U.guardar(state);
          onChange();
        });
        config.appendChild(lbl);
        config.appendChild(inp);
      }

      var width = document.createElement("div");
      width.className = "me-width";
      var winp = document.createElement("input");
      winp.type = "number";
      winp.min = 20; winp.max = 400; winp.step = 5;
      winp.value = m.width || anchos[i].cm;
      winp.disabled = !m.locked;
      winp.title = "Ancho en cm";
      winp.addEventListener("change", function(e){
        var v = +e.target.value;
        if(v > 0){
          m.width = v;
          renderModulos();
          pintarSVG();
          U.guardar(state);
          onChange();
        }
      });
      width.appendChild(winp);

      var lock = document.createElement("button");
      lock.type = "button";
      lock.className = "me-lock";
      lock.setAttribute("aria-pressed", m.locked ? "true" : "false");
      lock.textContent = m.locked ? "🔒" : "🔓";
      lock.title = m.locked ? "Desbloquear" : "Fijar ancho";
      lock.addEventListener("click", function(){
        m.locked = !m.locked;
        if(m.locked && !m.width) m.width = anchos[i].cm;
        renderModulos();
        pintarSVG();
        U.guardar(state);
        onChange();
      });

      var del = document.createElement("button");
      del.type = "button";
      del.className = "me-del";
      del.textContent = "×";
      del.title = "Eliminar módulo";
      del.addEventListener("click", function(){ eliminarModulo(i); });

      item.appendChild(order);
      item.appendChild(label);
      item.appendChild(config);
      item.appendChild(width);
      item.appendChild(lock);
      item.appendChild(del);
      cont.appendChild(item);
    });
  }

  function agregarModulo(key, type){
    var def = window.MOMAF.MODULES[type];
    if(!def) return;
    if(!state.modulesByFurniture[key]) state.modulesByFurniture[key] = [];
    state.modulesByFurniture[key].push({
      type: type,
      qty: def.defaultQty || 1,
      width: null,
      locked: false
    });
    renderModulos();
    pintarSVG();
    U.guardar(state);
    onChange();
  }

  function eliminarModulo(i){
    var key = muebleActivoKey();
    if(!key) return;
    var arr = state.modulesByFurniture[key];
    if(!arr || i < 0 || i >= arr.length) return;
    arr.splice(i, 1);
    renderModulos();
    pintarSVG();
    U.guardar(state);
    onChange();
  }

  function moverModulo(i, dir){
    var key = muebleActivoKey();
    if(!key) return;
    var arr = state.modulesByFurniture[key];
    var j = i + dir;
    if(j < 0 || j >= arr.length) return;
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    renderModulos();
    pintarSVG();
    U.guardar(state);
    onChange();
  }

  function pintarSVG(){
    if(state.mode === "single") pintarSVGSingle();
    else                        pintarSVGAmbiente();
    actualizarDots();
    pintarSwatchesActivos();
  }

  function pintarSVGSingle(){
    var F = window.MOMAF.FURNITURES;
    var def = F[state.furniture];
    if(!def) return;

    var stage = $("stageSvg");

    if(def.modular){
      var modules = state.modulesByFurniture[state.furniture] || [];
      var totalCm = state.totalWidthByFurniture[state.furniture] || 240;
      var res = window.MOMAF.MODULE_ENGINE.render(modules, { totalCm: totalCm });
      stage.innerHTML = res.svg;
    } else if(def.svg){
      stage.innerHTML = '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">' + def.svg + '</svg>';
    }

    pintarColoresSingle();
  }

  function pintarColoresSingle(){
    var C = window.MOMAF.CONFIG.COLORES;
    var bodySol  = C[state.body].s;
    var frontSol = C[state.front].s;

    Array.prototype.forEach.call(document.querySelectorAll("#stageSvg .fb"), function(el){
      el.setAttribute("fill", bodySol); el.style.fill = bodySol;
    });
    Array.prototype.forEach.call(document.querySelectorAll("#stageSvg .ff"), function(el){
      el.setAttribute("fill", frontSol); el.style.fill = frontSol;
    });

    document.documentElement.style.setProperty("--body-color",  C[state.body].c);
    document.documentElement.style.setProperty("--front-color", C[state.front].c);

    $("stageCombo").textContent = C[state.body].n + " + " + C[state.front].n;
  }

  function pintarSVGAmbiente(){
    var amb = getAmbiente();
    if(!amb) return;

    var C = window.MOMAF.CONFIG.COLORES;
    var F = window.MOMAF.FURNITURES;

    var partes = [];
    amb.muebles.forEach(function(m, i){
      var def = F[m.tipo];
      if(!def) return;

      var sx = m.w / 400;
      var sy = m.h / 300;

      var contenido;
      if(def.modular){
        var modules = state.modulesByFurniture[m.tipo] || [];
        var totalCm = state.totalWidthByFurniture[m.tipo] || 240;
        var res = window.MOMAF.MODULE_ENGINE.render(modules, { totalCm: totalCm });
        var s = Math.min(400/900, 300/500);
        var newW = 900 * s;
        var newH = 500 * s;
        var tx = (400 - newW) / 2;
        var ty = (300 - newH) / 2;
        contenido = '<g transform="translate('+tx+','+ty+') scale('+s+','+s+')">' + res.contenido + '</g>';
      } else {
        contenido = def.svg || '';
      }

      partes.push(
        '<g class="set-item" data-member="' + m.tipo + '" data-idx="' + i + '" '
        + 'transform="translate(' + m.x + ',' + m.y + ') scale(' + sx + ',' + sy + ')">'
        + contenido + '</g>'
      );
    });

    var stage = $("stageSvg");
    stage.innerHTML = '<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">'
      + partes.join("") + '</svg>';

    amb.muebles.forEach(function(m){
      var grupo = stage.querySelector('.set-item[data-member="' + cssEscape(m.tipo) + '"]');
      if(!grupo) return;
      var col = state.memberColors[m.tipo] || { body: state.globalBody, front: state.globalFront };
      var bs = C[col.body].s, fs = C[col.front].s;
      Array.prototype.forEach.call(grupo.querySelectorAll(".fb"), function(el){
        el.setAttribute("fill", bs); el.style.fill = bs;
      });
      Array.prototype.forEach.call(grupo.querySelectorAll(".ff"), function(el){
        el.setAttribute("fill", fs); el.style.fill = fs;
      });
    });

    var activo = state.editingMember;
    var colPreview = (activo && state.memberColors[activo])
      ? state.memberColors[activo]
      : { body: state.globalBody, front: state.globalFront };

    document.documentElement.style.setProperty("--body-color",  C[colPreview.body].c);
    document.documentElement.style.setProperty("--front-color", C[colPreview.front].c);

    var nombreActivo = activo ? (' · ' + activo) : '';
    $("stageCombo").textContent = C[colPreview.body].n + " + " + C[colPreview.front].n + nombreActivo;
  }

  function cssEscape(s){ return s.replace(/"/g, '\\"'); }

  function setColor(idx){
    var C = window.MOMAF.CONFIG.COLORES;
    if(!C[idx]) return;

    if(state.mode === "single"){
      if(state.zone === "body") state.body = idx;
      else                      state.front = idx;
    } else {
      var amb = getAmbiente();
      if(!amb) return;

      if(state.editingMember === null){
        if(state.zone === "body") state.globalBody = idx;
        else                      state.globalFront = idx;
        amb.muebles.forEach(function(m){
          state.memberColors[m.tipo] = state.memberColors[m.tipo] || { body: state.globalBody, front: state.globalFront };
          state.memberColors[m.tipo][state.zone] = idx;
        });
      } else {
        state.memberColors[state.editingMember] =
          state.memberColors[state.editingMember] || { body: state.globalBody, front: state.globalFront };
        state.memberColors[state.editingMember][state.zone] = idx;
      }
    }
    pintarSVG();
    U.guardar(state);
    onChange();
  }

  function setZone(zone){
    state.zone = zone;
    document.querySelectorAll(".zone").forEach(function(z){
      z.setAttribute("aria-pressed", z.dataset.zone === zone);
    });
    pintarSwatchesActivos();
  }

  function actualizarDots(){
    var C = window.MOMAF.CONFIG.COLORES;
    var colBody, colFront;

    if(state.mode === "single"){
      colBody = C[state.body].c;
      colFront = C[state.front].c;
    } else {
      if(state.editingMember && state.memberColors[state.editingMember]){
        colBody = C[state.memberColors[state.editingMember].body].c;
        colFront = C[state.memberColors[state.editingMember].front].c;
      } else {
        colBody = C[state.globalBody].c;
        colFront = C[state.globalFront].c;
      }
    }
    $("zoneDotBody").style.background = colBody;
    $("zoneDotFront").style.background = colFront;
  }

  function pintarSwatchesActivos(){
    var idx;
    if(state.mode === "single"){
      idx = state.zone === "body" ? state.body : state.front;
    } else {
      if(state.editingMember && state.memberColors[state.editingMember]){
        idx = state.zone === "body"
          ? state.memberColors[state.editingMember].body
          : state.memberColors[state.editingMember].front;
      } else {
        idx = state.zone === "body" ? state.globalBody : state.globalFront;
      }
    }
    Array.prototype.forEach.call($("swatches").children, function(b, i){
      b.setAttribute("aria-pressed", i === idx);
    });
  }

  function coloresActivos(){
    var A = window.MOMAF.CONFIG.AMBIENTES;

    if(state.mode === "single"){
      return [{
        tipo: state.furniture,
        body: state.body,
        front: state.front,
        dims: null,
        modules: state.modulesByFurniture[state.furniture] || [],
        totalCm: state.totalWidthByFurniture[state.furniture] || null
      }];
    }

    var amb = getAmbiente();
    if(!amb) return [];
    return amb.muebles.map(function(m){
      var col = state.memberColors[m.tipo] || { body: state.globalBody, front: state.globalFront };
      return {
        tipo: m.tipo,
        body: col.body,
        front: col.front,
        dims: m.dims,
        modules: state.modulesByFurniture[m.tipo] || [],
        totalCm: state.totalWidthByFurniture[m.tipo] || null
      };
    });
  }

  function nombreModo(){
    if(state.mode === "single") return "Individual";
    var amb = getAmbiente();
    return amb ? ("Ambiente · " + amb.nombre) : "Ambiente";
  }

  return {
    state: state,
    buildUI: buildUI,
    setFurniture: setFurniture,
    setAmbiente: setAmbiente,
    setColor: setColor,
    setZone: setZone,
    refrescarToggleModo: refrescarToggleModo,
    coloresActivos: coloresActivos,
    nombreModo: nombreModo,
    onChange: function(fn){ onChange = fn; }
  };
})();