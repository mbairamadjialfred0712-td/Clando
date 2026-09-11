import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   CLANDO — Design tokens
   ============================================================ */
const C = {
  yellow: "#FFCC00",
  yellowDark: "#E6B800",
  yellowSoft: "#FFF3C4",
  black: "#15161A",
  ink: "#1D1F26",
  white: "#FFFFFF",
  gray50: "#F6F7F9",
  gray100: "#EFF1F4",
  gray200: "#E3E6EB",
  gray300: "#D3D7DE",
  gray500: "#8B909B",
  gray700: "#565A63",
  green: "#1E9E5A",
  greenSoft: "#E4F7EC",
  red: "#E14B4B",
  redSoft: "#FCEAEA",
};

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
.clando{font-family:'Manrope',ui-sans-serif,system-ui,sans-serif;}
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
@keyframes clando-pulse{0%{transform:scale(1);opacity:.55}70%{transform:scale(2.6);opacity:0}100%{transform:scale(2.6);opacity:0}}
@keyframes clando-rise{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes clando-pop{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.anim-rise{animation:clando-rise .28s ease both}
.anim-pop{animation:clando-pop .22s ease both}
`;

/* ============================================================
   Icons — minimal line icon set (single stroke style)
   ============================================================ */
const Icon = ({ name, size = 22, color = C.ink, strokeWidth = 1.8 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "back": return <svg {...p}><path d="M15 18l-6-6 6-6" /></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case "pin": return <svg {...p}><path d="M12 21s7-6.1 7-11.5A7 7 0 1 0 5 9.5C5 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>;
    case "pin-fill": return <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-11.5A7 7 0 1 0 5 9.5C5 14.9 12 21 12 21z" fill={color} /><circle cx="12" cy="9.5" r="2.3" fill="#fff" /></svg>;
    case "home": return <svg {...p}><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></svg>;
    case "car": return <svg {...p}><path d="M4 16V12l2-5h12l2 5v4" /><path d="M4 16h16" /><circle cx="7.5" cy="17.5" r="1.6" /><circle cx="16.5" cy="17.5" r="1.6" /></svg>;
    case "moto": return <svg {...p}><circle cx="6" cy="17" r="2.4" /><circle cx="18" cy="17" r="2.4" /><path d="M6 17h4l2.5-6h3.5" /><path d="M12.5 11h3l2.5 6" /><path d="M9 8.5h3.5" /><path d="M15 8.5l1.6-2" /></svg>;
    case "package": return <svg {...p}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5L12 12l8-4.5" /><path d="M12 12v9" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l3 2" /></svg>;
    case "bell": return <svg {...p}><path d="M6 10a6 6 0 1 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 14.5 6 10z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8.2" r="3.6" /><path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" /></svg>;
    case "chevron-right": return <svg {...p}><path d="M9 18l6-6-6-6" /></svg>;
    case "check": return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>;
    case "check-circle": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.6 2.6L16.2 9" /></svg>;
    case "x": return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "phone": return <svg {...p}><path d="M6 4h3l1.5 4.5L8.5 10a12 12 0 0 0 5.5 5.5l1.5-2L20 15v3a2 2 0 0 1-2 2C10.3 20 4 13.7 4 6a2 2 0 0 1 2-2z" /></svg>;
    case "message": return <svg {...p}><path d="M4 5h16v11H8l-4 4V5z" /></svg>;
    case "shield": return <svg {...p}><path d="M12 3l7 3v6c0 4.8-3 8-7 9-4-1-7-4.2-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "star": return <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.6 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.1 6-.7z" fill={color} /></svg>;
    case "wallet": return <svg {...p}><rect x="3.5" y="6" width="17" height="12" rx="2.2" /><path d="M3.5 10h17" /><circle cx="16.5" cy="14" r="1" fill={color} /></svg>;
    case "cash": return <svg {...p}><rect x="3" y="7" width="18" height="10" rx="1.6" /><circle cx="12" cy="12" r="2.4" /></svg>;
    case "card": return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>;
    case "mobile-money": return <svg {...p}><rect x="6" y="3" width="12" height="18" rx="2.2" /><path d="M9.5 7h5" /><circle cx="12" cy="17" r="1" fill={color} /></svg>;
    case "share": return <svg {...p}><circle cx="18" cy="5.5" r="2.3" /><circle cx="6" cy="12" r="2.3" /><circle cx="18" cy="18.5" r="2.3" /><path d="M8 10.8l8-4.2M8 13.2l8 4.2" /></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "sos": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.2v.2" /></svg>;
    case "menu": return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "gift": return <svg {...p}><rect x="4" y="9" width="16" height="11" rx="1.4" /><path d="M4 13h16" /><path d="M12 9v11" /><path d="M12 9c-1.8 0-3.2-1.1-3.2-2.6S10 3.8 12 6c2-2.2 3.2-.9 3.2 0S13.8 9 12 9z" /></svg>;
    case "chevron-down": return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case "logout": return <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>;
    case "help": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.9" /><circle cx="12" cy="17" r=".2" fill={color} /></svg>;
    case "doc": return <svg {...p}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /></svg>;
    case "eco": return <svg {...p}><path d="M4 16V12l2-4h12l2 4v4" /><path d="M4 16h16" /><circle cx="7.5" cy="17.3" r="1.4" /><circle cx="16.5" cy="17.3" r="1.4" /></svg>;
    case "target": return <svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.2" /></svg>;
    default: return null;
  }
};

/* ============================================================
   Primitives
   ============================================================ */
const Button = ({ children, onClick, variant = "primary", full = true, disabled, icon, style }) => {
  const base = "flex items-center justify-center gap-2 rounded-2xl font-bold text-[15px] active:scale-[0.98] transition-transform select-none";
  const pad = "py-4 px-5";
  const styles = {
    primary: { background: disabled ? C.gray200 : C.yellow, color: disabled ? C.gray500 : C.black },
    dark: { background: C.black, color: C.white },
    outline: { background: C.white, color: C.ink, border: `1.5px solid ${C.gray300}` },
    ghost: { background: C.gray100, color: C.ink },
    danger: { background: C.redSoft, color: C.red },
  };
  return (
    <button onClick={disabled ? undefined : onClick} className={`${base} ${pad} ${full ? "w-full" : ""}`} style={{ ...styles[variant], ...style }}>
      {icon && <Icon name={icon} size={18} color={styles[variant].color} />}
      {children}
    </button>
  );
};

const IconBtn = ({ name, onClick, bg = C.white, color = C.ink, size = 42 }) => (
  <button onClick={onClick} className="rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{ width: size, height: size, background: bg, boxShadow: "0 2px 10px rgba(20,20,30,0.10)" }}>
    <Icon name={name} size={19} color={color} />
  </button>
);

const TopBar = ({ title, onBack, right }) => (
  <div className="flex items-center justify-between px-4 pt-2 pb-3">
    {onBack ? <IconBtn name="back" onClick={onBack} /> : <div style={{ width: 42 }} />}
    {title && <div className="text-[16px] font-bold" style={{ color: C.ink }}>{title}</div>}
    {right || <div style={{ width: 42 }} />}
  </div>
);

const Sheet = ({ children, style }) => (
  <div className="absolute left-0 right-0 bottom-0 rounded-t-[26px] px-5 pt-4 anim-rise"
    style={{ background: C.white, boxShadow: "0 -8px 30px rgba(20,20,30,0.12)", ...style }}>
    <div className="mx-auto mb-3" style={{ width: 40, height: 4, borderRadius: 4, background: C.gray300 }} />
    {children}
  </div>
);

const Pill = ({ children, tone = "gray" }) => {
  const tones = { gray: [C.gray100, C.gray700], yellow: [C.yellowSoft, "#8A6D00"], green: [C.greenSoft, C.green], red: [C.redSoft, C.red] };
  const [bg, fg] = tones[tone];
  return <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: bg, color: fg }}>{children}</span>;
};

/* ============================================================
   Logo
   ============================================================ */
const Logo = ({ size = 40, rounded = true, dark = true }) => (
  <div style={{ width: size, height: size, borderRadius: rounded ? size * 0.28 : "50%", background: dark ? C.black : C.yellow, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24">
      <path d="M17.2 6.4A7.5 7.5 0 1 0 18.6 16" fill="none" stroke={dark ? C.yellow : C.black} strokeWidth="3" strokeLinecap="round" />
      <circle cx="18.6" cy="16" r="2.6" fill={dark ? C.yellow : C.black} />
    </svg>
  </div>
);

const Wordmark = ({ size = 20, color = C.ink }) => (
  <span className="font-extrabold tracking-tight" style={{ fontSize: size, color }}>CLANDO</span>
);

/* Trace de fond — un swoosh routier jaune utilisé derrière le wordmark
   (splash, headers de marque) pour donner de la texture au logo sans
   copier l'identité d'un concurrent. */
const BrandTrace = ({ width = 340, height = 340, style }) => (
  <svg width={width} height={height} viewBox="0 0 340 340" style={{ position: "absolute", ...style }}>
    <path d="M-30 250 C 40 300, 90 60, 200 70 S 360 40, 340 -20" stroke={C.yellow} strokeWidth="52" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M-10 300 C 70 330, 110 130, 230 120" stroke={C.yellow} strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.35" />
  </svg>
);

/* Logo lockup complet (symbole + trace + wordmark) — pour splash & marketing */
const LogoLockup = () => (
  <div className="relative flex flex-col items-center justify-center" style={{ width: 260, height: 220 }}>
    <BrandTrace width={280} height={280} style={{ top: -40, left: -20 }} />
    <div className="relative flex flex-col items-center">
      <Logo size={72} dark={false} />
      <div className="mt-4"><Wordmark size={28} color={C.white} /></div>
    </div>
  </div>
);

/* ============================================================
   Stylised city map (decorative SVG, non-photoreal, low-noise)
   ============================================================ */
const CityMap = ({ variant = "idle", height = "100%", children }) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height, background: C.gray50 }}>
      <svg width="100%" height="100%" viewBox="0 0 390 500" preserveAspectRatio="xMidYMid slice">
        <rect width="390" height="500" fill="#F3F4F7" />
        {[40, 95, 150, 205, 260, 315, 370].map((x, i) => (
          <rect key={i} x={x} y="0" width="26" height="500" fill="#EAEBEF" />
        ))}
        {[60, 140, 220, 300, 380, 460].map((y, i) => (
          <rect key={i} x="0" y={y} width="390" height="16" fill="#EAEBEF" />
        ))}
        <path d="M0 250 H390" stroke="#DBDEE4" strokeWidth="10" />
        <path d="M170 0 V500" stroke="#DBDEE4" strokeWidth="10" />
        {variant === "route" || variant === "tracking" ? (
          <path d="M120 400 C 150 320, 130 250, 200 210 S 300 120, 300 70" stroke={C.yellow} strokeWidth="7" strokeLinecap="round" fill="none" />
        ) : null}
        {(variant === "route" || variant === "tracking") && (
          <>
            <circle cx="120" cy="400" r="8" fill={C.black} />
            <circle cx="120" cy="400" r="3" fill={C.white} />
            <path d="M300 58 l7 12 h-14 z" fill={C.red} />
          </>
        )}
        {variant === "idle" && (
          <>
            <g transform="translate(150,180) rotate(20)"><rect width="14" height="8" rx="2" fill={C.black} /></g>
            <g transform="translate(230,300) rotate(-10)"><rect width="14" height="8" rx="2" fill={C.gray500} /></g>
            <g transform="translate(90,320) rotate(60)"><rect width="14" height="8" rx="2" fill={C.gray500} /></g>
            <g transform="translate(280,150) rotate(-40)"><rect width="14" height="8" rx="2" fill={C.gray500} /></g>
          </>
        )}
        {variant === "tracking" && (
          <g transform="translate(212,150)">
            <circle r="16" fill={C.yellow} opacity="0.5" style={{ animation: "clando-pulse 1.8s ease-out infinite" }} />
            <circle r="9" fill={C.black} />
            <rect x="-4" y="-3" width="8" height="5" rx="1.4" fill={C.yellow} />
          </g>
        )}
      </svg>
      {/* user position dot */}
      <div className="absolute" style={{ left: "31%", top: "80%", transform: "translate(-50%,-50%)" }}>
        <div className="rounded-full" style={{ width: 16, height: 16, background: "#2B7FFF", border: "3px solid white", boxShadow: "0 2px 6px rgba(0,0,0,.25)" }} />
      </div>
      {children}
    </div>
  );
};

/* ============================================================
   Shared data
   ============================================================ */
const VEHICLES = [
  { id: "eco", name: "CLANDO ÉCO", desc: "Économique et confortable", price: 1500, eta: 3, icon: "eco" },
  { id: "confort", name: "CLANDO CONFORT", desc: "Plus d'espace, plus de confort", price: 2500, eta: 5, icon: "car" },
  { id: "premium", name: "CLANDO PREMIUM", desc: "Confort supérieur, chauffeurs primés", price: 4000, eta: 7, icon: "car" },
];

const PAYMENTS = [
  { id: "cash", label: "Espèces", icon: "cash" },
  { id: "orange", label: "Orange Money", icon: "mobile-money", tint: "#FF7A00" },
  { id: "moov", label: "Moov Money", icon: "mobile-money", tint: "#1F5FD9" },
  { id: "airtel", label: "Airtel Money", icon: "mobile-money", tint: "#E30613" },
  { id: "mtn", label: "MTN Money", icon: "mobile-money", tint: "#FFCB05" },
  { id: "wave", label: "Wave", icon: "mobile-money", tint: "#1DC8E0" },
  { id: "card", label: "Carte bancaire", icon: "card" },
];

/* Vehicle catalogues per service — passagers (voiture / moto) et livraison */
const VEHICLES_CAR = VEHICLES; // défini plus haut

const VEHICLES_MOTO = [
  { id: "moto-eco", name: "CLANDO MOTO", desc: "Rapide, idéal pour la circulation dense", price: 700, eta: 2, icon: "moto" },
  { id: "moto-express", name: "MOTO EXPRESS", desc: "Chauffeur prioritaire, arrivée plus rapide", price: 1000, eta: 1, icon: "moto" },
];

const VEHICLES_DELIVERY = [
  { id: "pkg-s", name: "PETIT COLIS", desc: "Enveloppe, sac, jusqu'à 5 kg — par moto", price: 1000, eta: 4, icon: "package" },
  { id: "pkg-m", name: "COLIS MOYEN", desc: "Carton moyen, jusqu'à 15 kg — par moto ou voiture", price: 1800, eta: 5, icon: "package" },
  { id: "pkg-l", name: "GRAND COLIS", desc: "Volumineux, jusqu'à 40 kg — par voiture", price: 2800, eta: 7, icon: "package" },
];

const SERVICES = [
  { id: "car", label: "Voiture", icon: "car" },
  { id: "moto", label: "Moto", icon: "moto" },
  { id: "delivery", label: "Livraison", icon: "package" },
];

const RESULTS = ["Chagoua", "Moursal", "Farcha", "Aéroport Hassan Djamouss", "Diguel", "Klemat"];

/* ============================================================
   SCREENS
   ============================================================ */

function SplashScreen() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: C.black }}>
      <LogoLockup />
      <div className="mt-1 text-[13px] relative" style={{ color: C.gray300 }}>Votre trajet, simplement.</div>
    </div>
  );
}

function OnboardingScreen({ step, setStep, onDone }) {
  const slides = [
    { title: "Commandez en quelques secondes", desc: "Indiquez votre destination et obtenez un véhicule à proximité, sans détour.", icon: "car" },
    { title: "Le prix avant de partir", desc: "Le tarif est affiché avant la confirmation. Aucune surprise à l'arrivée.", icon: "wallet" },
    { title: "Voyagez en sécurité", desc: "Suivi en temps réel, partage de trajet et centre de sécurité intégré.", icon: "shield" },
  ];
  const s = slides[step];
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="flex justify-end p-4">
        <button onClick={onDone} className="text-[13px] font-semibold" style={{ color: C.gray700 }}>Passer</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="rounded-[28px] flex items-center justify-center mb-8" style={{ width: 120, height: 120, background: C.yellowSoft }}>
          <Icon name={s.icon} size={48} color={C.black} strokeWidth={1.5} />
        </div>
        <div className="text-[21px] font-extrabold mb-3" style={{ color: C.ink }}>{s.title}</div>
        <div className="text-[14px] leading-relaxed" style={{ color: C.gray700 }}>{s.desc}</div>
      </div>
      <div className="flex items-center justify-center gap-2 mb-6">
        {slides.map((_, i) => (
          <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 5, background: i === step ? C.yellow : C.gray200, transition: "all .2s" }} />
        ))}
      </div>
      <div className="px-6 pb-8">
        <Button onClick={() => (step < 2 ? setStep(step + 1) : onDone())}>{step < 2 ? "Suivant" : "Commencer"}</Button>
      </div>
    </div>
  );
}

function AuthScreen({ onNext, mode = "login" }) {
  return (
    <div className="h-full w-full flex flex-col px-6 pt-14 relative overflow-hidden" style={{ background: C.white }}>
      <BrandTrace width={220} height={220} style={{ top: -70, right: -80, opacity: 0.5 }} />
      <Logo size={52} />
      <div className="mt-8 text-[24px] font-extrabold" style={{ color: C.ink }}>{mode === "login" ? "Content de vous revoir" : "Créer un compte"}</div>
      <div className="mt-1.5 text-[13.5px]" style={{ color: C.gray700 }}>
        {mode === "login" ? "Connectez-vous avec votre numéro de téléphone." : "Quelques infos pour démarrer avec CLANDO."}
      </div>
      <div className="mt-8 flex flex-col gap-3">
        {mode === "signup" && (
          <div className="flex items-center rounded-2xl px-4" style={{ background: C.gray50, height: 54, border: `1.5px solid ${C.gray200}` }}>
            <input placeholder="Nom complet" className="w-full bg-transparent outline-none text-[14.5px]" style={{ color: C.ink }} />
          </div>
        )}
        <div className="flex items-center rounded-2xl px-4 gap-2" style={{ background: C.gray50, height: 54, border: `1.5px solid ${C.gray200}` }}>
          <span className="text-[14.5px] font-semibold" style={{ color: C.gray700 }}>🇹🇩 +235</span>
          <div style={{ width: 1, height: 20, background: C.gray300 }} />
          <input placeholder="00 00 00 00" className="w-full bg-transparent outline-none text-[14.5px]" style={{ color: C.ink }} />
        </div>
      </div>
      <div className="mt-6"><Button onClick={onNext}>Continuer</Button></div>
      <div className="mt-5 text-center text-[12.5px]" style={{ color: C.gray500 }}>
        En continuant, vous acceptez les <span style={{ color: C.ink, fontWeight: 700 }}>Conditions</span> et la <span style={{ color: C.ink, fontWeight: 700 }}>Confidentialité</span>.
      </div>
    </div>
  );
}

function OtpScreen({ onNext, onBack }) {
  const [code, setCode] = useState(["", "", "", ""]);
  return (
    <div className="h-full w-full flex flex-col px-6" style={{ background: C.white }}>
      <TopBar onBack={onBack} />
      <div className="mt-4 text-[22px] font-extrabold" style={{ color: C.ink }}>Vérification</div>
      <div className="mt-1.5 text-[13.5px]" style={{ color: C.gray700 }}>Entrez le code envoyé au <span style={{ fontWeight: 700, color: C.ink }}>+235 66 00 00 00</span></div>
      <div className="flex gap-3 mt-7">
        {code.map((c, i) => (
          <div key={i} className="flex-1 flex items-center justify-center rounded-2xl text-[20px] font-bold"
            style={{ height: 58, background: C.gray50, border: `1.5px solid ${i === 1 ? C.yellow : C.gray200}`, color: C.ink }}>
            {i === 0 ? "•" : ""}
          </div>
        ))}
      </div>
      <button className="mt-5 text-[13px] font-bold self-start" style={{ color: C.black }}>Renvoyer le code (00:28)</button>
      <div className="mt-auto mb-8"><Button onClick={onNext}>Vérifier</Button></div>
    </div>
  );
}

function LocationPermissionScreen({ onNext }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="flex-1 relative"><CityMap variant="idle" /></div>
      <div className="px-6 pt-6 pb-8 rounded-t-[26px] -mt-6 relative z-10" style={{ background: C.white }}>
        <div className="flex items-center justify-center rounded-2xl mb-4 mx-auto" style={{ width: 56, height: 56, background: C.yellowSoft }}>
          <Icon name="target" color={C.black} />
        </div>
        <div className="text-[19px] font-extrabold text-center" style={{ color: C.ink }}>Activer la localisation</div>
        <div className="mt-2 text-[13.5px] text-center leading-relaxed" style={{ color: C.gray700 }}>
          CLANDO utilise votre position pour trouver les véhicules les plus proches et vous proposer un point de départ précis.
        </div>
        <div className="mt-6"><Button onClick={onNext}>Activer la localisation</Button></div>
        <button onClick={onNext} className="w-full text-center mt-3 text-[13px] font-semibold" style={{ color: C.gray500 }}>Plus tard</button>
      </div>
    </div>
  );
}

function ServiceSwitch({ value, onChange }) {
  return (
    <div className="flex rounded-2xl p-1" style={{ background: C.gray50 }}>
      {SERVICES.map((s) => {
        const active = value === s.id;
        return (
          <button key={s.id} onClick={() => onChange(s.id)} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-colors"
            style={{ background: active ? C.yellow : "transparent" }}>
            <Icon name={s.icon} size={16} color={active ? C.black : C.gray700} strokeWidth={active ? 2.1 : 1.8} />
            <span className="text-[12.5px] font-bold" style={{ color: active ? C.black : C.gray700 }}>{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function HomeScreen({ onSearch, onSchedule, promo, service, setService }) {
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: "58%" }}>
        <CityMap variant="idle">
          <div className="absolute top-4 left-4"><Logo size={38} /></div>
          <div className="absolute top-4 right-4"><IconBtn name="bell" bg={C.white} /></div>
          {promo && (
            <div className="absolute top-16 left-4 right-4 anim-rise">
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.black, boxShadow: "0 6px 20px rgba(0,0,0,.18)" }}>
                <Icon name="gift" color={C.yellow} size={20} />
                <div className="text-[12.5px] font-semibold" style={{ color: C.white }}>-20% sur votre prochaine course avec CLANDO20</div>
              </div>
            </div>
          )}
        </CityMap>
      </div>
      <div className="absolute left-0 right-0 bottom-0 rounded-t-[26px] px-5 pt-5 pb-6" style={{ background: C.white, top: "54%", boxShadow: "0 -10px 30px rgba(20,20,30,.08)" }}>
        <div className="text-[13px] font-semibold" style={{ color: C.gray500 }}>Bonjour 👋</div>
        <div className="text-[21px] font-extrabold mt-0.5" style={{ color: C.ink }}>
          {service === "delivery" ? "Qu'envoyons-nous ?" : "Où allons-nous ?"}
        </div>

        <div className="mt-3.5"><ServiceSwitch value={service} onChange={setService} /></div>

        <button onClick={onSearch} className="w-full mt-3.5 flex items-center gap-3 rounded-2xl px-4 py-3.5 active:scale-[0.99] transition-transform"
          style={{ background: C.gray50, border: `1.5px solid ${C.gray200}` }}>
          <Icon name="search" color={C.gray700} size={19} />
          <span className="text-[14.5px]" style={{ color: C.gray500 }}>
            {service === "delivery" ? "Adresse de livraison" : "Entrer une destination"}
          </span>
        </button>

        <div className="flex items-center gap-2 mt-2.5 px-1">
          <Icon name="pin-fill" size={14} color={C.green} />
          <span className="text-[12.5px]" style={{ color: C.gray700 }}>Position actuelle · N'Djamena, Farcha</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {[{ label: "Maison", icon: "home" }, { label: "Travail", icon: "car" }, { label: "Programmer", icon: "clock" }].map((it, i) => (
            <button key={i} onClick={it.label === "Programmer" ? onSchedule : onSearch} className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3.5 active:scale-95 transition-transform" style={{ background: C.gray50 }}>
              <Icon name={it.icon} size={18} color={C.ink} />
              <span className="text-[11.5px] font-semibold" style={{ color: C.ink }}>{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchScreen({ onBack, onPick }) {
  const [q, setQ] = useState("");
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Où allons-nous ?" onBack={onBack} /></div>
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-2xl px-4" style={{ background: C.gray50, height: 50, border: `1.5px solid ${C.gray200}` }}>
          <Icon name="search" size={18} color={C.gray700} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une destination"
            className="w-full bg-transparent outline-none text-[14.5px]" style={{ color: C.ink }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar mt-5 px-5">
        {q.length > 0 ? (
          <>
            <div className="text-[12px] font-bold tracking-wide mb-2" style={{ color: C.gray500 }}>RÉSULTATS</div>
            {RESULTS.filter((r) => r.toLowerCase().includes(q.toLowerCase())).map((r, i) => (
              <button key={i} onClick={() => onPick(r)} className="w-full flex items-center gap-3 py-3 text-left">
                <div className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.gray100 }}><Icon name="pin" size={16} color={C.gray700} /></div>
                <span className="text-[14px] font-medium" style={{ color: C.ink }}>{r}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <div className="text-[12px] font-bold tracking-wide mb-1" style={{ color: C.gray500 }}>ADRESSES ENREGISTRÉES</div>
            {[{ l: "Maison", d: "Quartier Farcha, N'Djamena", icon: "home" }, { l: "Travail", d: "Avenue Charles de Gaulle", icon: "car" }].map((a, i) => (
              <button key={i} onClick={() => onPick(a.l)} className="w-full flex items-center gap-3 py-3 text-left">
                <div className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.yellowSoft }}><Icon name={a.icon} size={16} color={C.black} /></div>
                <div>
                  <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{a.l}</div>
                  <div className="text-[12px]" style={{ color: C.gray500 }}>{a.d}</div>
                </div>
              </button>
            ))}
            <div className="text-[12px] font-bold tracking-wide mt-5 mb-1" style={{ color: C.gray500 }}>DESTINATIONS RÉCENTES</div>
            {RESULTS.slice(0, 4).map((r, i) => (
              <button key={i} onClick={() => onPick(r)} className="w-full flex items-center gap-3 py-3 text-left">
                <div className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.gray100 }}><Icon name="clock" size={16} color={C.gray700} /></div>
                <span className="text-[14px] font-medium" style={{ color: C.ink }}>{r}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function ChooseVehicleScreen({ destination, onBack, selected, setSelected, onNext, service }) {
  const list = service === "moto" ? VEHICLES_MOTO : service === "delivery" ? VEHICLES_DELIVERY : VEHICLES_CAR;
  const v = list.find((x) => x.id === selected) || list[0];
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: "42%" }}><CityMap variant="route"><div className="absolute top-2 left-2"><IconBtn name="back" onClick={onBack} /></div></CityMap></div>
      <Sheet style={{ top: "38%" }}>
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="text-[12px] font-semibold" style={{ color: C.gray500 }}>Vers</div>
            <div className="text-[15px] font-bold" style={{ color: C.ink }}>{destination}</div>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: C.ink }}>
            <Icon name="clock" size={15} color={C.gray700} /> 12 min <span style={{ color: C.gray300 }}>·</span> 5,4 km
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 overflow-y-auto no-scrollbar" style={{ maxHeight: "34vh" }}>
          {list.map((veh) => {
            const active = selected === veh.id;
            return (
              <button key={veh.id} onClick={() => setSelected(veh.id)} className="w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors"
                style={{ background: active ? C.yellowSoft : C.gray50, border: `1.6px solid ${active ? C.yellow : "transparent"}` }}>
                <div className="rounded-xl flex items-center justify-center" style={{ width: 46, height: 46, background: C.white }}>
                  <Icon name={veh.icon} size={24} color={C.black} />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold" style={{ color: C.ink }}>{veh.name}</div>
                  <div className="text-[12px]" style={{ color: C.gray700 }}>{veh.desc}</div>
                  <div className="text-[11.5px] font-semibold mt-0.5" style={{ color: C.gray500 }}>Arrivée en {veh.eta} min</div>
                </div>
                <div className="text-[14.5px] font-extrabold" style={{ color: C.ink }}>{veh.price.toLocaleString()} F</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 pb-6">
          <Button onClick={onNext}>Continuer avec {v?.name}</Button>
        </div>
      </Sheet>
    </div>
  );
}

function PaymentScreen({ onBack, method, setMethod, onNext }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Mode de paiement" onBack={onBack} /></div>
      <div className="px-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2.5 mt-2">
          {PAYMENTS.map((p) => {
            const active = method === p.id;
            return (
              <button key={p.id} onClick={() => setMethod(p.id)} className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors"
                style={{ background: active ? C.yellowSoft : C.gray50, border: `1.6px solid ${active ? C.yellow : "transparent"}` }}>
                <div className="rounded-full flex items-center justify-center" style={{ width: 38, height: 38, background: C.white }}><Icon name={p.icon} size={18} color={p.tint || C.black} /></div>
                <span className="flex-1 text-left text-[14.5px] font-semibold" style={{ color: C.ink }}>{p.label}</span>
                {active && <div className="rounded-full flex items-center justify-center" style={{ width: 22, height: 22, background: C.yellow }}><Icon name="check" size={13} color={C.black} /></div>}
              </button>
            );
          })}
        </div>
        <button className="mt-4 w-full flex items-center gap-3 rounded-2xl px-4 py-3.5" style={{ border: `1.6px dashed ${C.gray300}` }}>
          <Icon name="plus" size={18} color={C.ink} />
          <span className="text-[14px] font-semibold" style={{ color: C.ink }}>Ajouter un moyen de paiement</span>
        </button>
      </div>
      <div className="px-5 pb-8 pt-3"><Button onClick={onNext}>Valider</Button></div>
    </div>
  );
}

function ConfirmScreen({ destination, vehicle, method, onBack, onConfirm, onShare, service }) {
  const list = service === "moto" ? VEHICLES_MOTO : service === "delivery" ? VEHICLES_DELIVERY : VEHICLES_CAR;
  const v = list.find((x) => x.id === vehicle) || list[0];
  const isDelivery = service === "delivery";
  const pm = PAYMENTS.find((p) => p.id === method);
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Confirmer la course" onBack={onBack} /></div>
      <div className="px-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="rounded-2xl p-4" style={{ background: C.gray50 }}>
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="rounded-full" style={{ width: 9, height: 9, background: C.black }} />
              <div style={{ width: 2, height: 32, background: C.gray300 }} />
              <Icon name="pin-fill" size={14} color={C.red} />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <div className="text-[11.5px] font-semibold" style={{ color: C.gray500 }}>DÉPART</div>
                <div className="text-[14px] font-bold" style={{ color: C.ink }}>Position actuelle</div>
              </div>
              <div>
                <div className="text-[11.5px] font-semibold" style={{ color: C.gray500 }}>{isDelivery ? "LIVRAISON À" : "DESTINATION"}</div>
                <div className="text-[14px] font-bold" style={{ color: C.ink }}>{destination}</div>
              </div>
            </div>
          </div>
        </div>

        {isDelivery && (
          <div className="flex items-center gap-3 mt-3 rounded-2xl px-4 py-3.5" style={{ background: C.gray50 }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.white }}><Icon name="user" size={16} color={C.black} /></div>
            <div className="flex-1">
              <div className="text-[11.5px] font-semibold" style={{ color: C.gray500 }}>DESTINATAIRE</div>
              <div className="text-[13.5px] font-bold" style={{ color: C.ink }}>Moussa Adam · 66 12 34 56</div>
            </div>
            <Icon name="chevron-right" size={16} color={C.gray500} />
          </div>
        )}

        <div className="flex items-center justify-between mt-3 rounded-2xl px-4 py-3.5" style={{ background: C.gray50 }}>
          <div className="flex items-center gap-3">
            <Icon name={v?.icon} size={20} color={C.black} />
            <span className="text-[14px] font-semibold" style={{ color: C.ink }}>{v?.name}</span>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: C.gray500 }}>Arrivée {v?.eta} min</span>
        </div>

        <div className="flex items-center justify-between mt-3 rounded-2xl px-4 py-3.5" style={{ background: C.gray50 }}>
          <div className="flex items-center gap-3">
            <Icon name={pm?.icon} size={18} color={pm?.tint || C.black} />
            <span className="text-[14px] font-semibold" style={{ color: C.ink }}>{pm?.label}</span>
          </div>
          <Icon name="chevron-right" size={16} color={C.gray500} />
        </div>

        {!isDelivery && (
          <button onClick={onShare} className="w-full flex items-center gap-3 mt-3 rounded-2xl px-4 py-3.5" style={{ border: `1.6px dashed ${C.gray300}` }}>
            <Icon name="share" size={18} color={C.ink} />
            <span className="text-[14px] font-semibold" style={{ color: C.ink }}>Partager la course</span>
          </button>
        )}

        <div className="mt-6 rounded-2xl p-4" style={{ background: C.black }}>
          <div className="text-[12px]" style={{ color: C.gray300 }}>PRIX ESTIMÉ</div>
          <div className="flex items-end justify-between mt-1">
            <div className="text-[30px] font-extrabold" style={{ color: C.white }}>{v?.price.toLocaleString()} <span className="text-[15px]">FCFA</span></div>
          </div>
          <div className="flex justify-between mt-3 text-[12.5px]" style={{ color: C.gray300 }}>
            <span>Course</span><span>{(v?.price - 200).toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between mt-1 text-[12.5px]" style={{ color: C.gray300 }}>
            <span>Frais de service</span><span>200 FCFA</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-8 pt-3"><Button onClick={onConfirm}>Confirmer la course</Button></div>
    </div>
  );
}

function FindingDriverScreen() {
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <CityMap variant="idle" />
      <div className="absolute left-0 right-0 bottom-0 rounded-t-[26px] px-6 pt-7 pb-9 text-center" style={{ background: C.white, boxShadow: "0 -10px 30px rgba(20,20,30,.1)" }}>
        <div className="relative mx-auto flex items-center justify-center" style={{ width: 64, height: 64 }}>
          <div className="absolute inset-0 rounded-full" style={{ background: C.yellow, animation: "clando-pulse 1.6s ease-out infinite" }} />
          <div className="rounded-full flex items-center justify-center relative" style={{ width: 64, height: 64, background: C.yellow }}>
            <Icon name="car" size={26} color={C.black} />
          </div>
        </div>
        <div className="text-[16.5px] font-extrabold mt-4" style={{ color: C.ink }}>Recherche d'un chauffeur…</div>
        <div className="text-[13px] mt-1.5" style={{ color: C.gray700 }}>Nous recherchons le chauffeur le plus proche.</div>
      </div>
    </div>
  );
}

const DRIVER = { name: "Jean", rating: "4,8", car: "Toyota Yaris", color: "Blanche", plate: "1234-AB-01" };

function DriverPanel({ status, onCall, onMessage, onSafety, onShare, showRating = true }) {
  const label = status === "enroute" ? "Chauffeur en route" : status === "arrived" ? "Chauffeur arrivé" : "En route vers la destination";
  return (
    <Sheet style={{ top: "50%" }}>
      {status !== "inride" && <Pill tone="yellow">{label.toUpperCase()}</Pill>}
      {status === "inride" && (
        <div>
          <div className="text-[12.5px] font-semibold" style={{ color: C.gray500 }}>Vous êtes en route vers</div>
          <div className="text-[17px] font-extrabold" style={{ color: C.ink }}>Aéroport Hassan Djamouss</div>
        </div>
      )}

      <div className="flex items-center gap-3 mt-3.5">
        <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: C.gray100 }}>
          <Icon name="user" size={24} color={C.gray700} />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-extrabold" style={{ color: C.ink }}>{DRIVER.name}</div>
          {showRating && (
            <div className="flex items-center gap-1 mt-0.5"><Icon name="star" size={13} color={C.yellow} /><span className="text-[12.5px] font-semibold" style={{ color: C.gray700 }}>{DRIVER.rating}</span></div>
          )}
        </div>
        <div className="text-right">
          <div className="text-[13.5px] font-bold" style={{ color: C.ink }}>{DRIVER.car}</div>
          <div className="text-[12px]" style={{ color: C.gray500 }}>{DRIVER.color} · {DRIVER.plate}</div>
        </div>
      </div>

      {status === "enroute" && (
        <div className="mt-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold" style={{ background: C.gray50, color: C.ink }}>
          Arrivée dans <span style={{ color: C.black }}>3 min</span>
        </div>
      )}
      {status === "inride" && (
        <div className="flex items-center justify-between mt-3">
          <div><div className="text-[18px] font-extrabold" style={{ color: C.ink }}>18 min</div><div className="text-[11.5px]" style={{ color: C.gray500 }}>Temps restant</div></div>
          <div style={{ width: 1, height: 30, background: C.gray200 }} />
          <div><div className="text-[18px] font-extrabold" style={{ color: C.ink }}>7,2 km</div><div className="text-[11.5px]" style={{ color: C.gray500 }}>Distance restante</div></div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 mt-4 pb-6">
        <button onClick={onCall} className="flex flex-col items-center gap-1.5 rounded-2xl py-3" style={{ background: C.gray50 }}><Icon name="phone" size={17} /><span className="text-[10.5px] font-semibold" style={{ color: C.ink }}>Appeler</span></button>
        <button onClick={onMessage} className="flex flex-col items-center gap-1.5 rounded-2xl py-3" style={{ background: C.gray50 }}><Icon name="message" size={17} /><span className="text-[10.5px] font-semibold" style={{ color: C.ink }}>Message</span></button>
        <button onClick={onShare} className="flex flex-col items-center gap-1.5 rounded-2xl py-3" style={{ background: C.gray50 }}><Icon name="share" size={17} /><span className="text-[10.5px] font-semibold" style={{ color: C.ink }}>Partager</span></button>
        <button onClick={onSafety} className="flex flex-col items-center gap-1.5 rounded-2xl py-3" style={{ background: C.redSoft }}><Icon name="shield" size={17} color={C.red} /><span className="text-[10.5px] font-semibold" style={{ color: C.red }}>Sécurité</span></button>
      </div>
    </Sheet>
  );
}

function TrackingScreen({ status, onSafety, onShare, onArrive, onEnd }) {
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: "48%" }}>
        <CityMap variant="tracking" />
      </div>
      {status === "arrived" ? (
        <div className="absolute left-0 right-0 bottom-0 rounded-t-[26px] px-6 pt-6 pb-8 text-center anim-rise" style={{ background: C.white, top: "44%" }}>
          <div className="rounded-full flex items-center justify-center mx-auto mb-3" style={{ width: 54, height: 54, background: C.greenSoft }}>
            <Icon name="check-circle" size={26} color={C.green} />
          </div>
          <div className="text-[17px] font-extrabold" style={{ color: C.ink }}>Votre chauffeur est arrivé</div>
          <div className="text-[13px] mt-1" style={{ color: C.gray700 }}>{DRIVER.car} · {DRIVER.color} · {DRIVER.plate}</div>
          <div className="mt-5"><Button onClick={onEnd}>Démarrer la course</Button></div>
        </div>
      ) : (
        <DriverPanel status={status} onSafety={onSafety} onShare={onShare} onCall={() => {}} onMessage={() => {}} />
      )}
      {status === "enroute" && (
        <div className="absolute" style={{ top: "40%", left: "50%", transform: "translateX(-50%)" }}>
          <Pill tone="gray">Votre chauffeur arrive dans 3 min · <button onClick={onArrive} className="underline font-bold">simuler l'arrivée</button></Pill>
        </div>
      )}
    </div>
  );
}

function InRideScreen({ onSafety, onShare, onEnd }) {
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: "52%" }}><CityMap variant="tracking" /></div>
      <DriverPanel status="inride" showRating={false} onSafety={onSafety} onShare={onShare} onCall={() => {}} onMessage={() => {}} />
      <div className="absolute" style={{ bottom: "2%", left: "50%", transform: "translateX(-50%)" }}>
        <button onClick={onEnd} className="text-[12px] font-bold underline" style={{ color: C.gray500 }}>simuler la fin de course</button>
      </div>
    </div>
  );
}

function SafetyScreen({ onBack }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Sécurité" onBack={onBack} /></div>
      <div className="px-5 flex-1 overflow-y-auto no-scrollbar">
        <button className="w-full flex items-center gap-3.5 rounded-2xl px-4 py-4" style={{ background: C.redSoft }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: C.red }}><Icon name="sos" size={20} color="#fff" /></div>
          <div className="text-left flex-1">
            <div className="text-[14.5px] font-extrabold" style={{ color: C.red }}>Urgence</div>
            <div className="text-[12px]" style={{ color: "#B23B3B" }}>Appeler les services d'urgence</div>
          </div>
          <Icon name="chevron-right" size={16} color={C.red} />
        </button>

        {[
          { icon: "user", title: "Contacter un proche", desc: "Partager ma position en direct" },
          { icon: "shield", title: "Assistance CLANDO", desc: "Contacter le support 24/7" },
          { icon: "share", title: "Détails de la course", desc: "Envoyer chauffeur, véhicule et trajet à un contact" },
        ].map((it, i) => (
          <button key={i} className="w-full flex items-center gap-3.5 rounded-2xl px-4 py-4 mt-3" style={{ background: C.gray50 }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: C.white }}><Icon name={it.icon} size={19} color={C.black} /></div>
            <div className="text-left flex-1">
              <div className="text-[14px] font-bold" style={{ color: C.ink }}>{it.title}</div>
              <div className="text-[12px]" style={{ color: C.gray500 }}>{it.desc}</div>
            </div>
            <Icon name="chevron-right" size={16} color={C.gray500} />
          </button>
        ))}

        <div className="mt-5 rounded-2xl p-4" style={{ background: C.black }}>
          <div className="text-[13px] font-bold" style={{ color: C.white }}>Trajet enregistré</div>
          <div className="text-[12px] mt-1 leading-relaxed" style={{ color: C.gray300 }}>
            Chauffeur : {DRIVER.name} · {DRIVER.car} ({DRIVER.plate})<br />Destination : Aéroport Hassan Djamouss · ETA 18 min
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareScreen({ onBack }) {
  const [n, setN] = useState(1);
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Partager la course" onBack={onBack} /></div>
      <div className="px-5 flex-1">
        <div className="rounded-2xl p-4" style={{ background: C.yellowSoft }}>
          <Icon name="share" color={C.black} />
          <div className="text-[15px] font-extrabold mt-2" style={{ color: C.ink }}>Partagez votre trajet avec d'autres passagers</div>
          <div className="text-[12.5px] mt-1" style={{ color: C.gray700 }}>Économisez jusqu'à 600 FCFA en partageant votre course sur le même trajet.</div>
        </div>

        <div className="text-[13px] font-bold mt-5 mb-2" style={{ color: C.ink }}>Nombre de passagers supplémentaires</div>
        <div className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: C.gray50 }}>
          <button onClick={() => setN(Math.max(0, n - 1))} className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.white }}>−</button>
          <span className="text-[16px] font-extrabold" style={{ color: C.ink }}>{n}</span>
          <button onClick={() => setN(Math.min(3, n + 1))} className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: C.white }}>+</button>
        </div>

        <div className="flex justify-between mt-5 text-[13.5px]"><span style={{ color: C.gray700 }}>Prix seul(e)</span><span className="font-bold" style={{ color: C.ink }}>1 500 FCFA</span></div>
        <div className="flex justify-between mt-1.5 text-[13.5px]"><span style={{ color: C.gray700 }}>Prix partagé</span><span className="font-bold" style={{ color: C.green }}>{(1500 - n * 300).toLocaleString()} FCFA</span></div>
      </div>
      <div className="px-5 pb-8 pt-3"><Button onClick={onBack}>Partager ma course</Button></div>
    </div>
  );
}

function EndRideScreen({ onRate }) {
  return (
    <div className="h-full w-full flex flex-col px-6 pt-14 text-center" style={{ background: C.white }}>
      <div className="rounded-full flex items-center justify-center mx-auto" style={{ width: 60, height: 60, background: C.yellowSoft }}>
        <Icon name="check" color={C.black} size={26} />
      </div>
      <div className="text-[21px] font-extrabold mt-4" style={{ color: C.ink }}>Course terminée</div>
      <div className="flex items-center justify-center gap-6 mt-6 rounded-2xl py-5" style={{ background: C.gray50 }}>
        <div><div className="text-[19px] font-extrabold" style={{ color: C.ink }}>1 500 F</div><div className="text-[11px]" style={{ color: C.gray500 }}>Prix</div></div>
        <div style={{ width: 1, height: 32, background: C.gray200 }} />
        <div><div className="text-[19px] font-extrabold" style={{ color: C.ink }}>18 min</div><div className="text-[11px]" style={{ color: C.gray500 }}>Durée</div></div>
        <div style={{ width: 1, height: 32, background: C.gray200 }} />
        <div><div className="text-[19px] font-extrabold" style={{ color: C.ink }}>7,2 km</div><div className="text-[11px]" style={{ color: C.gray500 }}>Distance</div></div>
      </div>
      <div className="mt-auto mb-8"><Button onClick={onRate}>Noter ma course</Button></div>
    </div>
  );
}

function RatingScreen({ onFinish }) {
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState([]);
  const opts = ["Conducteur agréable", "Conduite prudente", "Véhicule propre", "Ponctuel", "Autre"];
  const toggle = (t) => setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div className="h-full w-full flex flex-col px-6 pt-14" style={{ background: C.white }}>
      <div className="text-center">
        <div className="rounded-full flex items-center justify-center mx-auto" style={{ width: 64, height: 64, background: C.gray100 }}><Icon name="user" size={28} color={C.gray700} /></div>
        <div className="text-[17px] font-extrabold mt-3" style={{ color: C.ink }}>Comment s'est passée votre course avec {DRIVER.name} ?</div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => setStars(i)}><Icon name="star" size={34} color={i <= stars ? C.yellow : C.gray200} /></button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {opts.map((t) => (
          <button key={t} onClick={() => toggle(t)} className="px-3.5 py-2 rounded-full text-[12.5px] font-semibold" style={{ background: tags.includes(t) ? C.yellowSoft : C.gray50, color: tags.includes(t) ? "#8A6D00" : C.ink, border: `1.4px solid ${tags.includes(t) ? C.yellow : "transparent"}` }}>{t}</button>
        ))}
      </div>
      <div className="mt-auto mb-8"><Button onClick={onFinish}>Terminer</Button></div>
    </div>
  );
}

function ActivityScreen({ onOpen }) {
  const rides = [
    { g: "Aujourd'hui", items: [{ type: "CLANDO ÉCO", route: "Farcha → Aéroport", price: "1 500 FCFA", time: "18:32" }] },
    { g: "Hier", items: [{ type: "CLANDO CONFORT", route: "Moursal → Diguel", price: "2 500 FCFA", time: "09:14" }, { type: "CLANDO ÉCO", route: "Klemat → Chagoua", price: "1 200 FCFA", time: "07:40" }] },
  ];
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-5 pt-5 pb-2"><div className="text-[21px] font-extrabold" style={{ color: C.ink }}>Mes courses</div></div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {rides.map((g, gi) => (
          <div key={gi} className="mb-2">
            <div className="text-[12px] font-bold tracking-wide mt-4 mb-2" style={{ color: C.gray500 }}>{g.g.toUpperCase()}</div>
            {g.items.map((r, i) => (
              <button key={i} onClick={onOpen} className="w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 mb-2 text-left" style={{ background: C.gray50 }}>
                <div className="rounded-xl flex items-center justify-center" style={{ width: 42, height: 42, background: C.white }}><Icon name="car" size={19} color={C.black} /></div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-bold" style={{ color: C.ink }}>{r.type}</div>
                  <div className="text-[12px]" style={{ color: C.gray500 }}>{r.route} · {r.time}</div>
                </div>
                <div className="text-[13.5px] font-extrabold" style={{ color: C.ink }}>{r.price}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RideDetailScreen({ onBack }) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Détail de la course" onBack={onBack} /></div>
      <div className="px-5 flex-1 overflow-y-auto no-scrollbar">
        <div style={{ height: 150 }} className="rounded-2xl overflow-hidden"><CityMap variant="route" /></div>
        <div className="flex items-center gap-3 mt-4 rounded-2xl px-4 py-3.5" style={{ background: C.gray50 }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 42, height: 42, background: C.white }}><Icon name="user" size={19} color={C.gray700} /></div>
          <div className="flex-1"><div className="text-[14px] font-bold" style={{ color: C.ink }}>{DRIVER.name}</div><div className="text-[12px]" style={{ color: C.gray500 }}>{DRIVER.car} · {DRIVER.plate}</div></div>
          <div className="flex items-center gap-1"><Icon name="star" size={13} color={C.yellow} /><span className="text-[12.5px] font-bold" style={{ color: C.ink }}>{DRIVER.rating}</span></div>
        </div>
        <div className="mt-4 flex justify-between text-[13.5px]"><span style={{ color: C.gray700 }}>Date</span><span className="font-semibold" style={{ color: C.ink }}>Aujourd'hui, 18:32</span></div>
        <div className="mt-2 flex justify-between text-[13.5px]"><span style={{ color: C.gray700 }}>Trajet</span><span className="font-semibold" style={{ color: C.ink }}>Farcha → Aéroport Hassan Djamouss</span></div>
        <div className="mt-2 flex justify-between text-[13.5px]"><span style={{ color: C.gray700 }}>Paiement</span><span className="font-semibold" style={{ color: C.ink }}>Espèces</span></div>
        <div className="mt-4 rounded-2xl p-4" style={{ background: C.black }}>
          <div className="flex justify-between text-[13px]" style={{ color: C.gray300 }}><span>Course</span><span>1 300 FCFA</span></div>
          <div className="flex justify-between text-[13px] mt-1" style={{ color: C.gray300 }}><span>Frais de service</span><span>200 FCFA</span></div>
          <div className="flex justify-between text-[16px] font-extrabold mt-2" style={{ color: C.white }}><span>Total</span><span>1 500 FCFA</span></div>
        </div>
      </div>
      <div className="px-5 pb-8 pt-3"><Button variant="outline">Télécharger le reçu</Button></div>
    </div>
  );
}

function NotificationsScreen() {
  const notifs = [
    { icon: "car", title: "Votre chauffeur est arrivé.", time: "Il y a 2 min" },
    { icon: "check-circle", title: "Votre course est terminée.", time: "Il y a 20 min" },
    { icon: "gift", title: "Vous avez reçu une promotion : -20%.", time: "Hier" },
    { icon: "bell", title: "Nouvelle offre CLANDO disponible à N'Djamena.", time: "Hier" },
  ];
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-5 pt-5 pb-2"><div className="text-[21px] font-extrabold" style={{ color: C.ink }}>Notifications</div></div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {notifs.map((n, i) => (
          <div key={i} className="flex items-start gap-3 py-3.5" style={{ borderBottom: i < notifs.length - 1 ? `1px solid ${C.gray100}` : "none" }}>
            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 38, height: 38, background: C.yellowSoft }}><Icon name={n.icon} size={17} color={C.black} /></div>
            <div className="flex-1"><div className="text-[13.5px] font-semibold" style={{ color: C.ink }}>{n.title}</div><div className="text-[11.5px] mt-0.5" style={{ color: C.gray500 }}>{n.time}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromoScreen({ onBack }) {
  const [code, setCode] = useState("CLANDO20");
  const [applied, setApplied] = useState(false);
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-3"><TopBar title="Code promo" onBack={onBack} /></div>
      <div className="px-5">
        <div className="text-[13.5px]" style={{ color: C.gray700 }}>Vous avez un code promo ?</div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 rounded-2xl px-4" style={{ background: C.gray50, height: 50, border: `1.5px solid ${C.gray200}` }}>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-full bg-transparent outline-none font-bold tracking-wide text-[14.5px]" style={{ color: C.ink }} />
          </div>
          <button onClick={() => setApplied(true)} className="rounded-2xl font-bold text-[13.5px] px-5" style={{ height: 50, background: C.black, color: C.white }}>Appliquer</button>
        </div>
        {applied && (
          <div className="flex items-center gap-3 mt-4 rounded-2xl p-4 anim-pop" style={{ background: C.greenSoft }}>
            <Icon name="check-circle" color={C.green} />
            <div><div className="text-[14px] font-extrabold" style={{ color: C.green }}>-20% appliqué</div><div className="text-[12px]" style={{ color: "#2E7D50" }}>Économie estimée : 300 FCFA sur votre prochaine course</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileScreen({ onSafety }) {
  const items = [
    ["user", "Mes informations"], ["wallet", "Moyens de paiement"], ["pin", "Adresses favorites"],
    ["clock", "Historique"], ["bell", "Notifications"], ["shield", "Sécurité"],
    ["help", "Aide"], ["doc", "Conditions d'utilisation"], ["doc", "Confidentialité"],
  ];
  return (
    <div className="h-full w-full flex flex-col" style={{ background: C.white }}>
      <div className="px-5 pt-6 pb-4 flex items-center gap-3.5">
        <div className="rounded-full flex items-center justify-center" style={{ width: 60, height: 60, background: C.gray100 }}><Icon name="user" size={26} color={C.gray700} /></div>
        <div>
          <div className="text-[17px] font-extrabold" style={{ color: C.ink }}>Aïcha Moussa</div>
          <div className="text-[12.5px]" style={{ color: C.gray500 }}>+235 66 00 00 00 · aicha@mail.com</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {items.map(([icon, label], i) => (
          <button key={i} onClick={label === "Sécurité" ? onSafety : undefined} className="w-full flex items-center gap-3 py-3.5" style={{ borderBottom: `1px solid ${C.gray100}` }}>
            <Icon name={icon} size={18} color={C.ink} />
            <span className="flex-1 text-left text-[14px] font-semibold" style={{ color: C.ink }}>{label}</span>
            <Icon name="chevron-right" size={16} color={C.gray300} />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 py-4 mt-2">
          <Icon name="logout" size={18} color={C.red} />
          <span className="text-[14px] font-bold" style={{ color: C.red }}>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Driver app preview ---------- */
function DriverDashboard({ online, setOnline, onIncoming }) {
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: online ? "44%" : "100%" }}>
        <CityMap variant={online ? "idle" : "idle"}>
          <div className="absolute top-4 left-4"><Logo size={36} /></div>
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full px-3 py-2" style={{ background: C.white, boxShadow: "0 2px 10px rgba(0,0,0,.1)" }}>
            <div className="rounded-full" style={{ width: 8, height: 8, background: online ? C.green : C.gray300 }} />
            <span className="text-[12px] font-bold" style={{ color: C.ink }}>{online ? "En ligne" : "Hors ligne"}</span>
          </div>
        </CityMap>
      </div>
      {online ? (
        <Sheet style={{ top: "40%" }}>
          <div className="text-[13px] font-semibold" style={{ color: C.gray500 }}>Aujourd'hui</div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="rounded-2xl p-3" style={{ background: C.gray50 }}><div className="text-[17px] font-extrabold" style={{ color: C.ink }}>12</div><div className="text-[11px]" style={{ color: C.gray500 }}>Courses</div></div>
            <div className="rounded-2xl p-3" style={{ background: C.gray50 }}><div className="text-[17px] font-extrabold" style={{ color: C.ink }}>32 500</div><div className="text-[11px]" style={{ color: C.gray500 }}>Revenus (F)</div></div>
            <div className="rounded-2xl p-3" style={{ background: C.gray50 }}><div className="text-[17px] font-extrabold" style={{ color: C.ink }}>147 km</div><div className="text-[11px]" style={{ color: C.gray500 }}>Distance</div></div>
          </div>
          <div className="mt-4 pb-3 flex gap-3">
            <Button variant="ghost" onClick={() => setOnline(false)}>Passer hors ligne</Button>
            <Button onClick={onIncoming}>Simuler une demande</Button>
          </div>
        </Sheet>
      ) : (
        <div className="absolute left-0 right-0 bottom-0 px-6 pb-10 text-center">
          <div className="text-[15px] font-bold mb-3" style={{ color: C.ink }}>Vous êtes actuellement hors ligne</div>
          <Button onClick={() => setOnline(true)}>Passer en ligne</Button>
        </div>
      )}
    </div>
  );
}

function DriverRequestScreen({ onAccept, onDecline }) {
  const [t, setT] = useState(12);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="h-full w-full relative" style={{ background: C.white }}>
      <div style={{ height: "40%" }}><CityMap variant="route" /></div>
      <div className="absolute left-0 right-0 bottom-0 rounded-t-[26px] px-5 pt-5 pb-8" style={{ background: C.white, top: "36%", boxShadow: "0 -10px 30px rgba(20,20,30,.1)" }}>
        <div className="flex items-center justify-between">
          <Pill tone="yellow">NOUVELLE COURSE</Pill>
          <div className="rounded-full flex items-center justify-center font-extrabold text-[13px]" style={{ width: 34, height: 34, background: C.black, color: C.yellow }}>{t}</div>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex flex-col items-center pt-1">
            <div className="rounded-full" style={{ width: 9, height: 9, background: C.black }} />
            <div style={{ width: 2, height: 26, background: C.gray300 }} />
            <Icon name="pin-fill" size={14} color={C.red} />
          </div>
          <div className="flex-1">
            <div className="mb-3"><div className="text-[11.5px] font-semibold" style={{ color: C.gray500 }}>POINT DE DÉPART</div><div className="text-[14px] font-bold" style={{ color: C.ink }}>Cocody</div></div>
            <div><div className="text-[11.5px] font-semibold" style={{ color: C.gray500 }}>DESTINATION</div><div className="text-[14px] font-bold" style={{ color: C.ink }}>Plateau</div></div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 rounded-2xl px-4 py-3" style={{ background: C.gray50 }}>
          <span className="text-[13px] font-semibold" style={{ color: C.gray700 }}>Distance · 5,8 km</span>
          <span className="text-[15px] font-extrabold" style={{ color: C.ink }}>2 300 FCFA</span>
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="ghost" onClick={onDecline}>Refuser</Button>
          <Button onClick={onAccept}>Accepter</Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Bottom nav
   ============================================================ */
const NAV = [
  { id: "home", icon: "home", label: "Accueil" },
  { id: "activity", icon: "clock", label: "Activité" },
  { id: "promo", icon: "gift", label: "Promos" },
  { id: "notifications", icon: "bell", label: "Alertes" },
  { id: "profile", icon: "user", label: "Profil" },
];

function BottomNav({ active, onChange }) {
  return (
    <div className="flex items-stretch px-2 pt-2" style={{ background: C.white, borderTop: `1px solid ${C.gray100}` }}>
      {NAV.map((n) => {
        const isActive = active === n.id;
        return (
          <button key={n.id} onClick={() => onChange(n.id)} className="flex-1 flex flex-col items-center gap-1 pb-2.5">
            <Icon name={n.icon} size={20} color={isActive ? C.black : C.gray300} strokeWidth={isActive ? 2.1 : 1.8} />
            <span className="text-[10.5px] font-bold" style={{ color: isActive ? C.black : C.gray300 }}>{n.label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: 4, background: C.yellow, marginTop: -1 }} />}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   App shell / state machine
   ============================================================ */
const TOP_SCREENS = ["home", "activity", "promo", "notifications", "profile"];

export default function ClandoPrototype() {
  const [appMode, setAppMode] = useState("passenger"); // passenger | driver
  const [screen, setScreen] = useState("splash");
  const [onbStep, setOnbStep] = useState(0);
  const [destination, setDestination] = useState("Aéroport Hassan Djamouss");
  const [service, setService] = useState("car");
  const [vehicle, setVehicle] = useState("eco");
  const [method, setMethod] = useState("cash");

  const chooseService = (s) => {
    setService(s);
    setVehicle(s === "moto" ? "moto-eco" : s === "delivery" ? "pkg-s" : "eco");
  };
  const [trackStatus, setTrackStatus] = useState("enroute");
  const [driverOnline, setDriverOnline] = useState(true);

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("onboarding"), 1400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const go = (s) => setScreen(s);

  let content = null;

  if (appMode === "driver") {
    if (screen !== "driverRequest") {
      content = <DriverDashboard online={driverOnline} setOnline={setDriverOnline} onIncoming={() => go("driverRequest")} />;
    } else {
      content = <DriverRequestScreen onAccept={() => go("driverDashboard")} onDecline={() => go("driverDashboard")} />;
    }
  } else {
    switch (screen) {
      case "splash": content = <SplashScreen />; break;
      case "onboarding": content = <OnboardingScreen step={onbStep} setStep={setOnbStep} onDone={() => go("auth")} />; break;
      case "auth": content = <AuthScreen mode="login" onNext={() => go("otp")} />; break;
      case "otp": content = <OtpScreen onBack={() => go("auth")} onNext={() => go("locperm")} />; break;
      case "locperm": content = <LocationPermissionScreen onNext={() => go("home")} />; break;
      case "home": content = <HomeScreen promo service={service} setService={chooseService} onSearch={() => go("search")} onSchedule={() => go("search")} />; break;
      case "search": content = <SearchScreen onBack={() => go("home")} onPick={(d) => { setDestination(d); go("choose"); }} />; break;
      case "choose": content = <ChooseVehicleScreen destination={destination} service={service} selected={vehicle} setSelected={setVehicle} onBack={() => go("search")} onNext={() => go("payment")} />; break;
      case "payment": content = <PaymentScreen method={method} setMethod={setMethod} onBack={() => go("choose")} onNext={() => go("confirm")} />; break;
      case "confirm": content = <ConfirmScreen destination={destination} vehicle={vehicle} service={service} method={method} onBack={() => go("payment")} onShare={() => go("share")} onConfirm={() => { setTrackStatus("enroute"); go("finding"); setTimeout(() => go("tracking"), 1600); }} />; break;
      case "finding": content = <FindingDriverScreen />; break;
      case "tracking": content = <TrackingScreen status={trackStatus} onSafety={() => go("safety")} onShare={() => go("share")} onArrive={() => setTrackStatus("arrived")} onEnd={() => go("inride")} />; break;
      case "inride": content = <InRideScreen onSafety={() => go("safety")} onShare={() => go("share")} onEnd={() => go("end")} />; break;
      case "safety": content = <SafetyScreen onBack={() => go(trackStatus ? "tracking" : "home")} />; break;
      case "share": content = <ShareScreen onBack={() => go("confirm")} />; break;
      case "end": content = <EndRideScreen onRate={() => go("rating")} />; break;
      case "rating": content = <RatingScreen onFinish={() => { setTrackStatus("enroute"); go("home"); }} />; break;
      case "activity": content = <ActivityScreen onOpen={() => go("rideDetail")} />; break;
      case "rideDetail": content = <RideDetailScreen onBack={() => go("activity")} />; break;
      case "notifications": content = <NotificationsScreen />; break;
      case "promo": content = <PromoScreen onBack={() => go("home")} />; break;
      case "profile": content = <ProfileScreen onSafety={() => go("safety")} />; break;
      default: content = <HomeScreen onSearch={() => go("search")} onSchedule={() => go("search")} />;
    }
  }

  const showNav = appMode === "passenger" && TOP_SCREENS.includes(screen);

  return (
    <div className="clando w-full flex flex-col items-center justify-center py-4" style={{ minHeight: "100%", background: "#EDEEF2" }}>
      <style>{FONT}</style>

      {/* prototype controls (not part of the product UI) */}
      <div className="flex items-center gap-2 mb-4 rounded-full p-1" style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
        <button onClick={() => { setAppMode("passenger"); setScreen("home"); }} className="px-4 py-1.5 rounded-full text-[12.5px] font-bold" style={{ background: appMode === "passenger" ? C.black : "transparent", color: appMode === "passenger" ? C.yellow : C.gray500 }}>Passager</button>
        <button onClick={() => { setAppMode("driver"); setScreen("driverDashboard"); }} className="px-4 py-1.5 rounded-full text-[12.5px] font-bold" style={{ background: appMode === "driver" ? C.black : "transparent", color: appMode === "driver" ? C.yellow : C.gray500 }}>CLANDO Driver</button>
      </div>

      {/* phone frame */}
      <div className="relative" style={{ width: 375, height: 780, borderRadius: 46, background: C.black, padding: 12, boxShadow: "0 30px 60px rgba(0,0,0,.35)" }}>
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 34, background: C.white }}>
          <div className="absolute top-0 left-0 right-0 flex justify-center z-30 pointer-events-none" style={{ paddingTop: 8 }}>
            <div style={{ width: 120, height: 26, borderRadius: 14, background: C.black }} />
          </div>
          <div className="absolute inset-0 flex flex-col">
            <div style={{ height: 34 }} />
            <div className="flex-1 relative overflow-hidden">{content}</div>
            {showNav && <BottomNav active={screen} onChange={go} />}
          </div>
        </div>
      </div>
    </div>
  );
}
