/* ============================================================
   CONFIGURACIÓN GLOBAL
   ============================================================ */
window.MOMAF = window.MOMAF || {};

window.MOMAF.CONFIG = {
  WHATSAPP: "5491150355005",
  REDES: { instagram:"", facebook:"", tiktok:"" },

  COLORES: [
    {n:"Blanco",        t:"Liso mate",      c:"linear-gradient(135deg,#f4f4f2,#dcdcd8)", s:"#ededed"},
    {n:"Negro",         t:"Liso mate",      c:"linear-gradient(135deg,#1b1d22,#0c0d10)", s:"#141619"},
    {n:"Grafito",       t:"Liso texturado", c:"linear-gradient(135deg,#4a4e55,#2f3238)", s:"#3d4046"},
    {n:"Gris cemento",  t:"Efecto piedra",  c:"linear-gradient(135deg,#8d9096,#6c6f75)", s:"#7d8086"},
    {n:"Roble natural", t:"Veta de madera", c:"linear-gradient(135deg,#d3ac7b,#b78b57)", s:"#c49a68"},
    {n:"Nogal",         t:"Veta de madera", c:"linear-gradient(135deg,#7a5232,#5a3a22)", s:"#6a462a"},
    {n:"Wengué",        t:"Veta oscura",    c:"linear-gradient(135deg,#3c2a22,#241914)", s:"#2f211b"},
    {n:"Azul petróleo", t:"Liso mate",      c:"linear-gradient(135deg,#2c5a78,#1c3d55)", s:"#24506c"}
  ],

  PRECIO_M2: {
    "Bajo mesada":       320000,
    "Alacena":           290000,
    "Bajo pileta":       340000,
    "Placard":           300000,
    "Vestidor":          330000,
    "Biblioteca":        280000,
    "Estante":           220000,
    "Escritorio":        250000,
    "Mesa de luz":       180000,
    "Cómoda":            260000,
    "Mueble de baño":    310000
  },

  PRECIO_MODULO: {
    "cajonera-2":         60000,
    "cajonera-3":         90000,
    "cajonera-4":        120000,
    "puerta-simple":      40000,
    "puerta-doble":       70000,
    "puerta-cajon":       70000,
    "hueco-tacho":        20000,
    "hueco-horno":        35000,
    "lavavajillas":       55000,
    "bajo-pileta":        30000,
    "canasto-extraible":  55000,
    "abierto-1":          10000,
    "abierto-2":          15000,
    "hueco-microondas":   25000,
    "soporte-vajilla":    30000,
    "puerta-vidriera":    45000,
    "puerta-batiente":    80000,
    "puerta-corrediza":  110000,
    "cajon-base":         65000,
    "barral-1":           15000,
    "barral-2":           25000,
    "estantes-3":         45000,
    "estantes-5":         70000,
    "zapatera":           50000,
    "cajonera-interna":   85000,
    "abierto-3":          20000,
    "abierto-4":          25000,
    "puertas-inferiores": 70000,
    "cajonera-lateral":   90000,
    "ala-extension":      60000,
    "estante-superior":   45000,
    "puerta-bajo-pileta": 40000,
    "espejo-con-luz":     55000,
    "cajonera-baño":      50000,
    "columna-abierta":    30000
  },

  MARGEN: 0.12,
  EXTRA_HERRAJES: 0.08,

  AMBIENTES: [
    {
      id: "cocina", nombre: "Cocina", emoji: "🍳",
      desc: "Bajo mesada + Alacena + Estante",
      muebles: [
        { tipo: "Bajo mesada", x: 60,  y: 270, w: 500, h: 180, dims:{a:240,h:90, p:60} },
        { tipo: "Alacena",     x: 60,  y: 30,  w: 500, h: 190, dims:{a:240,h:80, p:35} },
        { tipo: "Estante",     x: 600, y: 70,  w: 260, h: 380, dims:{a:120,h:180,p:30} }
      ]
    },
    {
      id: "dormitorio", nombre: "Dormitorio", emoji: "🛏️",
      desc: "Placard + Mesa de luz + Cómoda",
      muebles: [
        { tipo: "Placard",     x: 40,  y: 40,  w: 340, h: 420, dims:{a:180,h:240,p:60} },
        { tipo: "Cómoda",      x: 420, y: 220, w: 240, h: 240, dims:{a:140,h:90, p:50} },
        { tipo: "Mesa de luz", x: 700, y: 320, w: 140, h: 140, dims:{a:50, h:55, p:40} }
      ]
    },
    {
      id: "vestidor", nombre: "Vestidor", emoji: "👕",
      desc: "Vestidor en L + Estante torre",
      muebles: [
        { tipo: "Vestidor", x: 60,  y: 40,  w: 380, h: 420, dims:{a:200,h:240,p:60} },
        { tipo: "Estante",  x: 470, y: 40,  w: 200, h: 420, dims:{a:80, h:220,p:35} },
        { tipo: "Placard",  x: 700, y: 40,  w: 180, h: 420, dims:{a:90, h:240,p:60} }
      ]
    },
    {
      id: "living", nombre: "Living", emoji: "📚",
      desc: "Biblioteca + Escritorio + Estante",
      muebles: [
        { tipo: "Biblioteca", x: 60,  y: 40,  w: 320, h: 420, dims:{a:180,h:220,p:35} },
        { tipo: "Escritorio", x: 420, y: 260, w: 400, h: 200, dims:{a:180,h:75, p:60} },
        { tipo: "Estante",    x: 640, y: 40,  w: 200, h: 200, dims:{a:100,h:120,p:30} }
      ]
    },
    {
      id: "lavadero", nombre: "Lavadero", emoji: "🧺",
      desc: "Bajo mesada + Alacena + Estante",
      muebles: [
        { tipo: "Bajo mesada", x: 60,  y: 270, w: 460, h: 180, dims:{a:200,h:90, p:60} },
        { tipo: "Alacena",     x: 60,  y: 30,  w: 460, h: 190, dims:{a:200,h:80, p:35} },
        { tipo: "Estante",     x: 560, y: 100, w: 300, h: 350, dims:{a:120,h:180,p:30} }
      ]
    },
    {
      id: "baño", nombre: "Baño", emoji: "🚿",
      desc: "Mueble bajo pileta + Alacena espejo",
      muebles: [
        { tipo: "Mueble de baño", x: 60,  y: 260, w: 420, h: 200, dims:{a:100,h:80, p:45} },
        { tipo: "Alacena",        x: 60,  y: 30,  w: 420, h: 180, dims:{a:100,h:70, p:35} },
        { tipo: "Estante",        x: 540, y: 100, w: 300, h: 350, dims:{a:80, h:150,p:25} }
      ]
    }
  ],

  MODULOS_POR_MUEBLE: {
    "Bajo mesada": [
      "cajonera-2","cajonera-3","cajonera-4",
      "puerta-simple","puerta-doble","puerta-cajon",
      "hueco-tacho",
      "hueco-horno",
      "lavavajillas",
      "canasto-extraible",
      "abierto-1","abierto-2"
    ],
    "Alacena": [
      "puerta-simple","puerta-doble",
      "hueco-microondas",
      "soporte-vajilla",
      "abierto-1","abierto-2","abierto-3"
    ],
    "Bajo pileta": [
      "bajo-pileta",
      "puerta-simple","puerta-doble",
      "cajonera-2","canasto-extraible"
    ],
    "Placard": [
      "puerta-batiente","puerta-corrediza",
      "cajon-base",
      "abierto-1","abierto-2"
    ],
    "Vestidor": [
      "puerta-batiente",
      "barral-1","barral-2",
      "cajonera-interna",
      "zapatera",
      "estantes-3","estantes-5",
      "abierto-1"
    ],
    "Biblioteca": [
      "abierto-3","abierto-4",
      "puertas-inferiores",
      "puerta-vidriera"
    ],
    "Estante": [
      "abierto-2","abierto-3","abierto-4"
    ],
    "Escritorio": [
      "cajonera-lateral",
      "puerta-simple",
      "ala-extension"
    ],
    "Mesa de luz": [
      "cajonera-2",
      "puerta-simple",
      "abierto-1"
    ],
    "Cómoda": [
      "cajonera-3","cajonera-4",
      "puerta-simple"
    ],
    "Mueble de baño": [
      "puerta-bajo-pileta",
      "cajonera-baño",
      "abierto-1",
      "columna-abierta"
    ]
  },

  PRESETS: {
    "Bajo mesada": [
      { type:"cajonera-3",   qty:3, width:null, locked:false },
      { type:"hueco-tacho",  qty:1, width:null, locked:false },
      { type:"puerta-doble", qty:2, width:null, locked:false }
    ],
    "Alacena": [
      { type:"puerta-doble",     qty:2, width:null, locked:false },
      { type:"hueco-microondas", qty:1, width:null, locked:false }
    ],
    "Bajo pileta": [
      { type:"bajo-pileta",  qty:1, width:null, locked:false },
      { type:"cajonera-2",   qty:2, width:null, locked:false }
    ],
    "Placard": [
      { type:"puerta-batiente", qty:2, width:null, locked:false },
      { type:"puerta-batiente", qty:2, width:null, locked:false }
    ],
    "Vestidor": [
      { type:"puerta-batiente",  qty:2, width:null, locked:false },
      { type:"barral-2",         qty:2, width:null, locked:false },
      { type:"cajonera-interna", qty:3, width:null, locked:false }
    ],
    "Biblioteca": [
      { type:"abierto-4",          qty:4, width:null, locked:false },
      { type:"puertas-inferiores", qty:2, width:null, locked:false }
    ],
    "Estante": [
      { type:"abierto-3", qty:3, width:null, locked:false },
      { type:"abierto-3", qty:3, width:null, locked:false }
    ],
    "Escritorio": [
      { type:"cajonera-lateral", qty:3, width:null, locked:false },
      { type:"abierto-1",        qty:1, width:null, locked:false }
    ],
    "Mesa de luz": [
      { type:"cajonera-2", qty:2, width:null, locked:false }
    ],
    "Cómoda": [
      { type:"cajonera-3", qty:3, width:null, locked:false }
    ],
    "Mueble de baño": [
      { type:"cajonera-baño",      qty:2, width:null, locked:false },
      { type:"puerta-bajo-pileta", qty:1, width:null, locked:false }
    ]
  },

  ANCHOS_DEFAULT: {
    "Bajo mesada": 240,
    "Alacena": 240,
    "Bajo pileta": 120,
    "Placard": 240,
    "Vestidor": 240,
    "Biblioteca": 180,
    "Estante": 100,
    "Escritorio": 160,
    "Mesa de luz": 50,
    "Cómoda": 120,
    "Mueble de baño": 100
  },

  DEFAULTS: {
    mode: "single",
    furniture: "Bajo mesada",
    set: "cocina",
    body: 4,
    front: 1,
    zone: "body"
  },

  LS_KEY: "momaf_v9",
  LS_INTRO_KEY: "momaf_intro_seen_v1"
};