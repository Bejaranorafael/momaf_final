function init(){
  try { cargar(); } catch(e){ console.warn("localStorage no disponible", e); }

  try { buildTabsAndSwatches(); } catch(e){ console.error("Error construyendo UI", e); }
  try { initPlaceholders(); }    catch(e){ console.error("Error placeholders", e); }
  try { initSocial(); }          catch(e){ console.error("Error redes", e); }
  try { initPlacaSpotlight(); }  catch(e){ console.error("Error spotlight", e); }
  try { initQuoteListeners(); }  catch(e){ console.error("Error listeners cotizador", e); }

  onSimulatorChange(() => {
    guardar();
    actualizarResumen();
  });

  try {
    setZone(DEFAULTS.zone);
    setFurniture(state.furniture);
    aplicarColores();
    actualizarResumen();
  } catch(e){ console.error("Error inicializando simulador", e); }

  const yEl = $("y");
  if(yEl) yEl.textContent = new Date().getFullYear();
}