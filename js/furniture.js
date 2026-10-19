/* ============================================================
   DEFINICIONES SVG DE MUEBLES
   viewBox: 0 0 400 300
   Clases:
     .furniture-body   → estructura (laterales, estantes, cajonera)
     .furniture-front  → puertas / frentes / cajones
     .furniture-line   → líneas divisorias
     .furniture-handle → tiradores
     .furniture-shadow → sombra al pie
   Los colores se aplican por atributo fill vía JS.
   ============================================================ */

export const FURNITURES = {
  Placard: {
    label: "Placard",
    svg: `
      <rect class="furniture-body"  x="60"  y="30"  width="280" height="240" rx="4"/>
      <rect class="furniture-front" x="68"  y="38"  width="132" height="224" rx="2"/>
      <rect class="furniture-front" x="200" y="38"  width="132" height="224" rx="2"/>
      <line class="furniture-line"  x1="200" y1="38" x2="200" y2="262"/>
      <rect class="furniture-handle" x="188" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="209" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-shadow" x="60"  y="266" width="280" height="6" rx="3"/>`
  },

  Vestidor: {
    label: "Vestidor",
    svg: `
      <rect class="furniture-body"  x="50"  y="30" width="300" height="240" rx="4"/>
      <rect class="furniture-front" x="58"  y="38" width="90"  height="224" rx="2"/>
      <rect class="furniture-front" x="155" y="38" width="90"  height="224" rx="2"/>
      <rect class="furniture-front" x="252" y="38" width="90"  height="224" rx="2"/>
      <line class="furniture-line"  x1="148" y1="38" x2="148" y2="262"/>
      <line class="furniture-line"  x1="245" y1="38" x2="245" y2="262"/>
      <rect class="furniture-handle" x="142" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="160" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="239" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="257" y="140" width="3" height="22" rx="1.5"/>
      <rect class="furniture-shadow" x="50"  y="266" width="300" height="6" rx="3"/>`
  },

  "Bajo mesada": {
    label: "Bajo mesada",
    svg: `
      <rect class="furniture-body"  x="40" y="90"  width="320" height="170" rx="4"/>
      <rect class="furniture-front" x="48" y="98"  width="100" height="154" rx="2"/>
      <rect class="furniture-front" x="154" y="98" width="100" height="154" rx="2"/>
      <rect class="furniture-front" x="260" y="98" width="92"  height="154" rx="2"/>
      <line class="furniture-line"  x1="148" y1="98" x2="148" y2="252"/>
      <line class="furniture-line"  x1="254" y1="98" x2="254" y2="252"/>
      <rect class="furniture-handle" x="140" y="170" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="161" y="170" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="246" y="170" width="3" height="22" rx="1.5"/>
      <rect class="furniture-handle" x="267" y="170" width="3" height="22" rx="1.5"/>
      <rect class="furniture-front"  x="40" y="80"  width="320" height="12" rx="2"/>
      <rect class="furniture-shadow" x="40" y="260" width="320" height="6" rx="3"/>`
  },

  Alacena: {
    label: "Alacena",
    svg: `
      <rect class="furniture-body"  x="60"  y="40"  width="280" height="180" rx="4"/>
      <rect class="furniture-front" x="68"  y="48"  width="132" height="164" rx="2"/>
      <rect class="furniture-front" x="200" y="48"  width="132" height="164" rx="2"/>
      <line class="furniture-line"  x1="200" y1="48" x2="200" y2="212"/>
      <rect class="furniture-handle" x="188" y="115" width="3" height="20" rx="1.5"/>
      <rect class="furniture-handle" x="209" y="115" width="3" height="20" rx="1.5"/>
      <rect class="furniture-front"  x="60"  y="228" width="280" height="10" rx="2"/>
      <rect class="furniture-shadow" x="60"  y="242" width="280" height="6" rx="3"/>`
  },

  Biblioteca: {
    label: "Biblioteca",
    svg: `
      <rect class="furniture-body"  x="60" y="30"  width="280" height="240" rx="4"/>
      <rect class="furniture-front" x="68" y="38"  width="264" height="52" rx="2"/>
      <rect class="furniture-front" x="68" y="96"  width="264" height="52" rx="2"/>
      <rect class="furniture-front" x="68" y="154" width="264" height="52" rx="2"/>
      <rect class="furniture-front" x="68" y="212" width="264" height="50" rx="2"/>
      <rect class="furniture-handle" x="190" y="60"  width="20" height="3" rx="1.5"/>
      <rect class="furniture-handle" x="190" y="118" width="20" height="3" rx="1.5"/>
      <rect class="furniture-handle" x="190" y="176" width="20" height="3" rx="1.5"/>
      <rect class="furniture-shadow" x="60" y="266" width="280" height="6" rx="3"/>`
  },

  Estante: {
    label: "Estante",
    svg: `
      <rect class="furniture-body"  x="80" y="30" width="240" height="240" rx="4"/>
      <rect class="furniture-front" x="88" y="38"  width="224" height="8"/>
      <rect class="furniture-front" x="88" y="96"  width="224" height="8"/>
      <rect class="furniture-front" x="88" y="154" width="224" height="8"/>
      <rect class="furniture-front" x="88" y="212" width="224" height="8"/>
      <rect class="furniture-front" x="88" y="254" width="224" height="8"/>
      <rect class="furniture-shadow" x="80" y="266" width="240" height="6" rx="3"/>`
  },

  Escritorio: {
    label: "Escritorio",
    svg: `
      <rect class="furniture-front" x="40" y="120" width="320" height="14" rx="2"/>
      <rect class="furniture-body"  x="50" y="134" width="80"  height="126" rx="3"/>
      <rect class="furniture-front" x="58" y="150" width="64"  height="40" rx="2"/>
      <rect class="furniture-front" x="58" y="196" width="64"  height="40" rx="2"/>
      <rect class="furniture-front" x="58" y="242" width="64"  height="14" rx="2"/>
      <rect class="furniture-handle" x="86" y="167" width="8" height="3" rx="1.5"/>
      <rect class="furniture-handle" x="86" y="213" width="8" height="3" rx="1.5"/>
      <rect class="furniture-body"  x="270" y="134" width="80" height="126" rx="3"/>
      <rect class="furniture-front" x="278" y="150" width="64" height="106" rx="2"/>
      <rect class="furniture-handle" x="306" y="200" width="8" height="3" rx="1.5"/>
      <rect class="furniture-shadow" x="40" y="260" width="320" height="6" rx="3"/>`
  }
};