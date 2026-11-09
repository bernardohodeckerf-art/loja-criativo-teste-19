import { useId } from "react";

/** Ilustrações vetoriais decorativas: nenhuma mídia ou modelo externo. */
export function TattooInstruments() {
  const id = useId().replace(/:/g, "");
  const metal = `url(#${id}-metal)`;
  const dark = `url(#${id}-dark)`;
  const brass = `url(#${id}-brass)`;
  return <div className="tattoo-instruments" aria-hidden="true">
    <svg width="0" height="0" className="instrument-defs"><defs>
      <linearGradient id={`${id}-metal`}><stop stopColor="#55595b"/><stop offset=".25" stopColor="#d9dbd7"/><stop offset=".42" stopColor="#898e8e"/><stop offset=".65" stopColor="#eeeae0"/><stop offset="1" stopColor="#4e5355"/></linearGradient>
      <linearGradient id={`${id}-dark`}><stop stopColor="#121719"/><stop offset=".35" stopColor="#424b4d"/><stop offset=".6" stopColor="#20282a"/><stop offset="1" stopColor="#080d0e"/></linearGradient>
      <linearGradient id={`${id}-brass`}><stop stopColor="#655137"/><stop offset=".45" stopColor="#c7ae7c"/><stop offset=".7" stopColor="#e0c899"/><stop offset="1" stopColor="#716044"/></linearGradient>
    </defs></svg>
    <div className="instrument instrument-coil"><svg viewBox="0 0 330 340" fill="none">
      <path d="M91 77C20 15 125-14 162 25s-16 58-33 37" stroke="#8c8779" strokeWidth="3"/>
      <path d="m90 84 21-14 115 54-32 123-27-7 12-91-89-40z" fill={dark} stroke="#9c9d94" strokeWidth="2"/>
      <path d="m105 105 12-28 91 41-8 23z" fill={metal}/>
      <g transform="rotate(24 155 160)"><rect x="109" y="108" width="33" height="83" rx="7" fill={brass}/><rect x="151" y="108" width="33" height="83" rx="7" fill={brass}/>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M110 ${119+i*8}h31m11 0h31`} stroke="#4d3e2c" strokeWidth="2"/>)}<rect x="103" y="105" width="87" height="8" rx="2" fill={metal}/><rect x="103" y="188" width="87" height="8" rx="2" fill={metal}/></g>
      <path d="m186 189 25 10-32 83-25-10z" fill={metal}/><path d="m160 243 33 13-20 48-33-13z" fill={dark} stroke="#7b8585"/>
      {[0,1,2,3,4].map(i=><path key={i} d={`m${157-i*3} ${253+i*8} 28 11`} stroke="#a0aaa8" strokeWidth="1.4"/>)}
      <path d="m146 293 24 9-17 24-12-5z" fill={metal}/><path d="m148 324-5 13" stroke="#e8e1d0" strokeWidth="1.3"/>
      <circle cx="211" cy="129" r="7" fill={brass}/><circle cx="211" cy="129" r="2" fill="#322c24"/>
      <path d="m211 112 12-31 11 4-12 31" fill={metal}/><path d="m220 81 17 6" stroke={brass} strokeWidth="6"/>
    </svg></div>
    <div className="instrument instrument-cartridge"><svg viewBox="0 0 180 370" fill="none">
      <path d="M62 22h56v34H62z" fill={dark} stroke="#8a9898"/><rect x="59" y="54" width="62" height="103" rx="12" fill={metal}/>
      {[0,1,2,3,4,5,6].map(i=><path key={i} d={`M62 ${70+i*11}h56`} stroke="#424d50" strokeWidth="2"/>)}
      <path d="M68 157h44v80l-15 59H83l-15-59z" fill="#536260" fillOpacity=".6" stroke="#a0b7b0" strokeWidth="1.5"/><path d="M82 161h16v93l-8 33-8-33z" fill={metal}/><path d="M84 296h12v32H84z" fill={metal}/><path d="M87 328v27m6-27v27" stroke="#ddd7c9"/>
      <path d="M73 172v59l9 37" stroke="#dce2d9" strokeOpacity=".6"/>
    </svg></div>
    <div className="instrument instrument-bottle"><svg viewBox="0 0 250 300" fill="none">
      <path d="M94 25h28l6 35H88z" fill={metal}/><path d="M97 9h22v19H97z" fill="#a0a39a"/><rect x="83" y="58" width="50" height="30" rx="5" fill={dark} stroke="#82847c"/>
      {[0,1,2,3,4,5].map(i=><path key={i} d={`M${89+i*7} 62v21`} stroke="#8c8d81"/>)}
      <path d="M86 87h44v27q27 10 27 36v105q0 20-20 20H79q-20 0-20-20V150q0-26 27-36z" fill={dark} stroke="#888f86"/>
      <path d="M73 144q0-13 11-19" stroke="#c4c8bb" strokeOpacity=".6" strokeWidth="3"/>
      <rect x="62" y="168" width="92" height="73" fill="#d8d1bd"/><path d="M72 178h72m-72 52h72" stroke="#373930"/>
      <text x="108" y="215" textAnchor="middle" fill="#242722" fontFamily="Georgia,serif" fontSize="29" fontWeight="bold" letterSpacing="2">INK</text>
      <g transform="translate(175 217)"><ellipse cx="20" cy="7" rx="23" ry="8" fill={metal}/><path d="M-3 7l7 34h32l7-34" fill={dark} stroke="#92998d"/><ellipse cx="20" cy="7" rx="16" ry="4" fill="#080b0a"/></g>
    </svg></div>
    <div className="instrument instrument-pen"><svg viewBox="0 0 160 430" fill="none">
      <path d="M63 15h34v24H63z" fill={brass}/><rect x="49" y="39" width="62" height="198" rx="29" fill={dark} stroke="#90988d" strokeWidth="1.5"/>
      <path d="M56 73q0-22 16-25" stroke="#b6bdb2" strokeWidth="2"/><rect x="49" y="120" width="62" height="9" fill={brass}/><circle cx="80" cy="82" r="10" stroke={metal} strokeWidth="2"/><path d="M80 75v8m-5-5a7 7 0 1 0 10 0" stroke="#d0c8b6"/>
      <path d="M51 225h58l-5 84-12 37H68l-12-37z" fill={metal}/>
      {[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M57 ${239+i*10}h46`} stroke="#4c5757" strokeWidth="2.5"/>)}
      <path d="M68 346h24l-5 40H73z" fill="#69817c" fillOpacity=".7" stroke="#b4c6ba"/><path d="M77 386h6v24h-6z" fill={metal}/><path d="M80 410v17" stroke="#e1ddcf"/>
    </svg></div>
    <span className="instrument-orbit orbit-one"/><span className="instrument-orbit orbit-two"/>
  </div>;
}
