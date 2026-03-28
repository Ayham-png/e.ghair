import { useState, useEffect, useRef } from "react";

/* ============================================================
   PRINZ FRISEUR — Vollständige Website
   Seiten: Startseite · Leistungen · Team · Galerie · Kontakt · Impressum · Datenschutz
   Adresse: Steinstraße 17, 77652 Offenburg
   ============================================================ */

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Jost', sans-serif;
    background: #f5f0eb;
    color: #1a1a1a;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #f5f0eb; }
  ::-webkit-scrollbar-thumb { background: #b8860b; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); } to { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes barberPole {
    from { background-position: 0 0; }
    to   { background-position: 0 -80px; }
  }

  .anim-fade-up  { animation: fadeUp  0.9s ease both; }
  .anim-fade-in  { animation: fadeIn  0.7s ease both; }
  .anim-scale-in { animation: scaleIn 0.6s ease both; }

  .gold-text {
    background: linear-gradient(120deg, #b8860b, #d4a017, #f0c040, #b8860b);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Jost', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 2.5px; text-transform: uppercase;
    cursor: pointer; border: none; border-radius: 2px;
    text-decoration: none; transition: all 0.3s ease;
    white-space: nowrap;
  }
  .btn-dark { background: #0d0d0d; color: #f5f0eb; padding: 14px 36px; }
  .btn-dark:hover { background: #b8860b; color: #0d0d0d; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,134,11,0.35); }
  .btn-gold { background: #b8860b; color: #0d0d0d; padding: 14px 36px; }
  .btn-gold:hover { background: #0d0d0d; color: #f5f0eb; transform: translateY(-2px); }
  .btn-outline { background: transparent; color: #0d0d0d; padding: 13px 35px; border: 1.5px solid #0d0d0d; }
  .btn-outline:hover { background: #0d0d0d; color: #f5f0eb; transform: translateY(-2px); }
  .btn-outline-light { background: transparent; color: #f5f0eb; padding: 13px 35px; border: 1.5px solid rgba(245,240,235,0.4); }
  .btn-outline-light:hover { background: #b8860b; color: #0d0d0d; border-color: #b8860b; transform: translateY(-2px); }

  .nav-link {
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    color: #f5f0eb; text-decoration: none; font-weight: 500;
    position: relative; padding: 4px 0; transition: color 0.3s;
    background: none; border: none; cursor: pointer;
    font-family: 'Jost', sans-serif;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 1px; background: #b8860b;
    transition: width 0.35s ease;
  }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link:hover, .nav-link.active { color: #b8860b; }

  .eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 3.5px; text-transform: uppercase; color: #b8860b; font-family: 'Jost', sans-serif; }
  .divider-gold { width: 40px; height: 1px; background: #b8860b; margin: 14px 0; }
  .divider-gold-c { width: 40px; height: 1px; background: #b8860b; margin: 14px auto; }

  .field {
    width: 100%; padding: 14px 18px;
    border: 1px solid #ddd7cf; background: #fff;
    font-family: 'Jost', sans-serif; font-size: 14px; color: #1a1a1a;
    outline: none; transition: border-color 0.3s; border-radius: 2px; appearance: none;
  }
  .field:focus { border-color: #b8860b; }
  .field-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; color: #999; display: block; margin-bottom: 7px; }

  .stars { color: #b8860b; letter-spacing: 2px; font-size: 13px; }

  .marquee-wrap { overflow: hidden; }
  .marquee-track { display: flex; width: max-content; animation: marquee 24s linear infinite; }

  /* Barber pole decoration */
  .barber-pole {
    width: 12px; height: 80px; border-radius: 6px; overflow: hidden;
    background: repeating-linear-gradient(
      -45deg,
      #cc0000 0px, #cc0000 8px,
      #ffffff 8px, #ffffff 16px,
      #0033cc 16px, #0033cc 24px,
      #ffffff 24px, #ffffff 32px
    );
    background-size: 40px 80px;
    animation: barberPole 1.5s linear infinite;
    flex-shrink: 0;
  }

  .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease; }

  @media (max-width: 900px) {
    .hide-mob { display: none !important; }
    .mob-col  { flex-direction: column !important; }
    .mob-full { width: 100% !important; }
    .mob-center { text-align: center !important; align-items: center !important; }
  }
  @media (max-width: 600px) {
    .mob-sm-col { flex-direction: column !important; }
    .mob-sm-full { width: 100% !important; }
  }
`;

// ── Hooks ─────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 28, style = {}, className = "" }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Real Images ────────────────────────────────────────────────
// Curated Unsplash barbershop/men's grooming photos
const IMGS = {
  hero:        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85",
  salonInnen:  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80",
  eingang:     "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80",
  schnitt1:    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=700&q=80",
  schnitt2:    "https://images.unsplash.com/photo-1560066984-138daab0c2c2?w=700&q=80",
  bart:        "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=700&q=80",
  rasur:       "https://images.unsplash.com/photo-1598524374912-cf29a2a46c85?w=700&q=80",
  fade:        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&q=80",
  team1:       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  team2:       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  team3:       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  gal1:        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  gal2:        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80",
  gal3:        "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=600&q=80",
  gal4:        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  gal5:        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
  gal6:        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80",
  gal7:        "https://images.unsplash.com/photo-1598524374912-cf29a2a46c85?w=600&q=80",
  gal8:        "https://images.unsplash.com/photo-1560066984-138daab0c2c2?w=600&q=80",
  gal9:        "https://images.unsplash.com/photo-1512864084360-7c0d8b26e1f3?w=600&q=80",
  gal10:       "https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=600&q=80",
  gal11:       "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&q=80",
  gal12:       "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
};

// ── Marquee ─────────────────────────────────────────────────────
function MarqueeStrip({ light = false }) {
  const items = ["Herrenschnitt ✦", "Bartpflege ✦", "Rasur ✦", "Augenbrauen ✦", "Haarfarbe ✦", "Konturenschnitt ✦", "Kinderschnitt ✦", "Fade ✦"];
  const all = [...items, ...items];
  return (
    <div style={{ background: light ? "#f5f0eb" : "#0d0d0d", padding: "11px 0", borderTop: light ? "1px solid #e0d8ce" : "none", borderBottom: light ? "1px solid #e0d8ce" : "none" }} className="marquee-wrap">
      <div className="marquee-track">
        {all.map((t, i) => (
          <span key={i} style={{ color: "#b8860b", fontSize: 11, letterSpacing: 2.5, fontWeight: 500, padding: "0 28px", whiteSpace: "nowrap", fontFamily: "'Jost', sans-serif" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { setPage(id); setMob(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const links = [
    { id: "home", label: "Start" },
    { id: "services", label: "Leistungen" },
    { id: "team", label: "Team" },
    { id: "galerie", label: "Galerie" },
    { id: "kontakt", label: "Kontakt" },
  ];

  return (
    <>
      <style>{`@media (max-width: 900px) { .ham { display: flex !important; } }`}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(13,13,13,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? 64 : 84, transition: "height 0.4s ease",
        }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div className="barber-pole" style={{ height: scrolled ? 32 : 44, transition: "height 0.4s" }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#f5f0eb", letterSpacing: 3 }}>PRINZ</div>
              <div style={{ fontSize: 8, letterSpacing: 5, color: "#b8860b", fontWeight: 600, marginTop: 3, fontFamily: "'Jost', sans-serif" }}>FRISEUR</div>
            </div>
          </button>

          {/* Desktop */}
          <div className="hide-mob" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {links.map(l => (
              <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>{l.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="btn btn-gold hide-mob" onClick={() => go("kontakt")} style={{ padding: "10px 22px", fontSize: 10 }}>Termin</button>
            <button className="ham" onClick={() => setMob(!mob)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display: "block", width: 22, height: 1.5, background: "#f5f0eb", transition: "all 0.3s", transform: mob && i===0 ? "rotate(45deg) translate(5px,5px)" : mob && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none", opacity: mob && i===1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{ position: "fixed", inset: 0, background: "#0d0d0d", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, transform: mob ? "translateX(0)" : "translateX(100%)", transition: "transform 0.5s cubic-bezier(0.77,0,0.18,1)" }}>
        {links.map((l, i) => (
          <button key={l.id} onClick={() => go(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Playfair Display', serif", fontSize: 34, color: page===l.id ? "#b8860b" : "#f5f0eb", fontStyle: "italic", transition: "color 0.3s", animation: mob ? `fadeUp 0.6s ease ${i*0.08}s both` : "none" }}
            onMouseEnter={e => e.currentTarget.style.color = "#b8860b"}
            onMouseLeave={e => e.currentTarget.style.color = page===l.id ? "#b8860b" : "#f5f0eb"}
          >{l.label}</button>
        ))}
        <button className="btn btn-gold" onClick={() => go("kontakt")} style={{ marginTop: 8 }}>Termin buchen</button>
      </div>
    </>
  );
}

// ── Footer ───────────────────────────────────────────────────────
function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer style={{ background: "#0d0d0d", color: "#f5f0eb" }}>
      <MarqueeStrip />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 48px 40px" }}>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ flex: "1 1 260px", minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="barber-pole" style={{ height: 36 }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>PRINZ</div>
                <div style={{ fontSize: 8, letterSpacing: 5, color: "#b8860b", fontWeight: 600, fontFamily: "'Jost', sans-serif" }}>FRISEUR</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(245,240,235,0.45)", maxWidth: 240, fontWeight: 300 }}>
              Herrenfriseur in Offenburg — Tradition trifft moderner Stil.
            </p>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {"★★★★★".split("").map((s,i) => <span key={i} style={{ color: "#b8860b", fontSize: 12 }}>{s}</span>)}
              <span style={{ fontSize: 12, color: "rgba(245,240,235,0.4)", marginLeft: 6 }}>4,9 · 90 Bewertungen</span>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ flex: "0 0 150px" }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Navigation</div>
            {[["home","Start"],["services","Leistungen"],["team","Team"],["galerie","Galerie"],["kontakt","Kontakt"]].map(([id, label]) => (
              <div key={id} style={{ marginBottom: 10 }}>
                <button onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "rgba(245,240,235,0.45)", fontFamily: "'Jost', sans-serif", transition: "color 0.3s", padding: 0, fontWeight: 300 }}
                  onMouseEnter={e => e.currentTarget.style.color = "#b8860b"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,235,0.45)"}
                >{label}</button>
              </div>
            ))}
          </div>

          {/* Öffnungszeiten */}
          <div style={{ flex: "0 0 200px" }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Öffnungszeiten</div>
            {[
              ["Mo – Di", "Geschlossen"],
              ["Mi – Fr", "09:00 – 19:00"],
              ["Samstag", "09:00 – 17:00"],
              ["Sonntag", "Geschlossen"],
            ].map(([d, h]) => (
              <div key={d} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9, gap: 16 }}>
                <span style={{ fontSize: 12, color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>{d}</span>
                <span style={{ fontSize: 12, color: h === "Geschlossen" ? "rgba(245,240,235,0.2)" : "#b8860b", fontWeight: 500 }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Kontakt */}
          <div style={{ flex: "0 0 220px" }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Kontakt</div>
            {[
              ["📍", "Steinstraße 17\n77652 Offenburg"],
              ["📞", "0173 9289022"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontSize: 13, color: "rgba(245,240,235,0.45)", lineHeight: 1.7, fontWeight: 300, whiteSpace: "pre-line" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 11, color: "rgba(245,240,235,0.2)" }}>© 2025 Prinz Friseur · Alle Rechte vorbehalten.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {[["impressum","Impressum"],["datenschutz","Datenschutz"]].map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(245,240,235,0.25)", fontFamily: "'Jost', sans-serif", transition: "color 0.3s", letterSpacing: 1 }}
                onMouseEnter={e => e.currentTarget.style.color = "#b8860b"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,235,0.25)"}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════
// STARTSEITE
// ══════════════════════════════════════════════════════
function PageHome({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const leistungen = [
    { num: "01", icon: "✂", title: "Herrenschnitt", desc: "Präziser Schnitt abgestimmt auf Gesichtsform, Haarstruktur und Lebensstil. Inklusive Waschen und Stylen.", preis: "Ab 22 €", img: IMGS.schnitt1 },
    { num: "02", icon: "🪒", title: "Bart & Rasur", desc: "Konturenschnitt, heiße Rasur und Bartpflege mit hochwertigen Produkten. Das vollständige Erlebnis.", preis: "Ab 15 €", img: IMGS.bart },
    { num: "03", icon: "〰", title: "Augenbrauen", desc: "Trimmen, Formen und Tönen für einen gepflegten, definierten Blick.", preis: "Ab 8 €", img: IMGS.fade },
  ];

  const bewertungen = [
    { name: "Markus T.", text: "Bester Friseur in Offenburg! Extrem sorgfältig, das Ergebnis ist jedes Mal perfekt. Komme seit 3 Jahren her.", sterne: 5 },
    { name: "Lukas M.", text: "Super Atmosphäre, fairer Preis und handwerklich wirklich top. Absolute Empfehlung für jeden Herrenschnitt.", sterne: 5 },
    { name: "Jonas B.", text: "Endlich ein Friseur, der versteht was man will. Bart und Haare auf den Punkt. Nicht mehr wegzudenken.", sterne: 5 },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 15% 60%, rgba(184,134,11,0.07) 0%, transparent 65%)" }} />

        {/* Right: Real hero photo */}
        <div className="hide-mob" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "46%" }}>
          <img src={IMGS.hero} alt="Prinz Friseur Salon" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0d0d0d 0%, rgba(13,13,13,0.2) 60%, transparent 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 48px 100px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 580 }}>
            <div className="anim-fade-up" style={{ animationDelay: "0.15s", display: "flex", alignItems: "center", gap: 12 }}>
              <div className="barber-pole" />
              <span className="eyebrow">Herrenfriseur · Offenburg seit 2018</span>
            </div>
            <div className="divider-gold anim-fade-up" style={{ animationDelay: "0.25s" }} />
            <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(50px, 7.5vw, 90px)", fontWeight: 500, lineHeight: 1.02, color: "#f5f0eb", marginBottom: 28, animationDelay: "0.35s" }}>
              Der Schnitt
              <br /><em className="gold-text">eines Prinzen</em>
            </h1>
            <p className="anim-fade-up" style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(245,240,235,0.55)", marginBottom: 44, maxWidth: 430, fontWeight: 300, animationDelay: "0.5s" }}>
              Prinz Friseur steht für präzise Herrenhaarschnitte, klassische Rasur und erstklassige Bartpflege. Mit 4,9 Sternen bei 90 Bewertungen — Offenburgs vertrauenswerter Herrenfriseur.
            </p>
            <div className="anim-fade-up" style={{ display: "flex", gap: 14, flexWrap: "wrap", animationDelay: "0.65s" }}>
              <button className="btn btn-gold" onClick={() => go("kontakt")}>Termin buchen</button>
              <button className="btn btn-outline-light" onClick={() => go("services")}>Leistungen</button>
            </div>

            {/* Rating badge */}
            <div className="anim-fade-up" style={{ marginTop: 52, display: "inline-flex", alignItems: "center", gap: 14, background: "rgba(245,240,235,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: 4, padding: "16px 24px", animationDelay: "0.8s" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#b8860b", fontWeight: 700 }}>4,9</div>
                <div className="stars">★★★★★</div>
              </div>
              <div style={{ width: 1, height: 40, background: "rgba(184,134,11,0.2)" }} />
              <div>
                <div style={{ fontSize: 13, color: "#f5f0eb", fontWeight: 500 }}>90 Bewertungen</div>
                <div style={{ fontSize: 11, color: "rgba(245,240,235,0.4)", marginTop: 2 }}>Google Maps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ── ÜBER UNS ── */}
      <section style={{ background: "#f5f0eb", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 72, alignItems: "center", flexWrap: "wrap" }}>
          <Reveal style={{ flex: "1 1 400px", minWidth: 260 }}>
            <span className="eyebrow">Unser Anspruch</span>
            <div className="divider-gold" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 22 }}>
              Handwerk mit
              <br /><em style={{ color: "#b8860b" }}>Leidenschaft</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "#666", marginBottom: 18, fontWeight: 300 }}>
              Bei Prinz Friseur geht es um mehr als nur einen Haarschnitt. Jeder Besuch beginnt mit einem Gespräch — wir verstehen Ihren Stil, Ihre Gewohnheiten und Ihre Wünsche.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "#666", marginBottom: 36, fontWeight: 300 }}>
              Unser Salon in der Steinstraße 17 ist Ihr Anlaufpunkt für Herrenschnitte, Bartpflege und Rasur auf höchstem Niveau.
            </p>
            <button className="btn btn-dark" onClick={() => go("team")}>Unser Team</button>
          </Reveal>

          {/* Two real images */}
          <Reveal delay={0.2} style={{ flex: "1 1 340px", minWidth: 260 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <img src={IMGS.salonInnen} alt="Salon innen" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 2 }} />
              <img src={IMGS.eingang} alt="Salon Eingang" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 2, marginTop: 28 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LEISTUNGEN VORSCHAU ── */}
      <section style={{ background: "#0d0d0d", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="eyebrow" style={{ color: "#b8860b" }}>Was wir bieten</span>
            <div className="divider-gold-c" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 500, color: "#f5f0eb" }}>
              Unsere <em style={{ color: "#b8860b" }}>Spezialitäten</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {leistungen.map((l, i) => (
              <Reveal key={l.num} delay={i * 0.12}>
                <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden", transition: "all 0.4s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(184,134,11,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.querySelector("img").style.transform = "scale(1.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}
                  onClick={() => go("services")}
                >
                  <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                    <img src={l.img} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)" }} />
                    <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10, color: "rgba(184,134,11,0.7)", letterSpacing: 2, fontWeight: 600 }}>{l.num}</span>
                  </div>
                  <div style={{ padding: "24px 28px 30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f5f0eb", fontWeight: 500 }}>{l.title}</h3>
                      <span style={{ fontSize: 22 }}>{l.icon}</span>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(245,240,235,0.45)", marginBottom: 18, fontWeight: 300 }}>{l.desc}</p>
                    <div style={{ fontSize: 14, color: "#b8860b", fontWeight: 600 }}>{l.preis}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn btn-outline-light" onClick={() => go("services")}>Alle Leistungen</button>
          </Reveal>
        </div>
      </section>

      {/* ── BEWERTUNGEN ── */}
      <section style={{ background: "#f5f0eb", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Was Kunden sagen</span>
            <div className="divider-gold-c" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 500 }}>
              Google <em style={{ color: "#b8860b" }}>Bewertungen</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {bewertungen.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.1}>
                <div style={{ background: "#fff", border: "1px solid #e0d8ce", borderRadius: 2, padding: "32px 28px", transition: "box-shadow 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div className="stars" style={{ marginBottom: 18 }}>{"★".repeat(b.sterne)}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.8, color: "#333", marginBottom: 22, fontWeight: 300 }}>"{b.text}"</p>
                  <div style={{ borderTop: "1px solid #ede7df", paddingTop: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>Google Rezension</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 50%, #b8860b 100%)", padding: "90px 48px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 58px)", color: "#0d0d0d", fontWeight: 500, marginBottom: 14 }}>
            Bereit für Ihren neuen Look?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(13,13,13,0.6)", marginBottom: 36, fontWeight: 300 }}>Jetzt Termin vereinbaren — Neukunden willkommen.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-dark" onClick={() => go("kontakt")}>Termin buchen</button>
            <a href="tel:01739289022" className="btn btn-outline" style={{ color: "#0d0d0d", borderColor: "#0d0d0d" }}>0173 9289022</a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// LEISTUNGEN
// ══════════════════════════════════════════════════════
function PageServices({ setPage }) {
  const kategorien = [
    {
      title: "Haarschnitte",
      icon: "✂",
      items: [
        { name: "Herrenschnitt", desc: "Waschen, Schneiden, Föhnen und Stylen. Inkl. Beratung.", preis: "22 – 32 €" },
        { name: "Kinderschnitt (bis 12 J.)", desc: "Sanfter Schnitt für Kinder bis 12 Jahre.", preis: "16 – 20 €" },
        { name: "Konturenschnitt / Fade", desc: "Präziser Übergangsschnitt mit Maschine und Schere.", preis: "18 – 28 €" },
        { name: "Studentenschnitt", desc: "Schnitt ohne Waschen/Föhnen. Nur gegen Studentenausweis.", preis: "18 €" },
      ],
    },
    {
      title: "Bart & Rasur",
      icon: "🪒",
      items: [
        { name: "Bartschnitt", desc: "Konturieren, Trimmen und Formen des Bartes.", preis: "15 – 20 €" },
        { name: "Heiße Rasur", desc: "Klassische Rasur mit heißem Tuch und Rasiermesser.", preis: "20 – 28 €" },
        { name: "Bart & Schnitt Kombi", desc: "Komplettpaket: Haarschnitt und Bartpflege.", preis: "35 – 45 €" },
        { name: "Konturrasur", desc: "Präzise Konturenarbeit entlang Hals und Schläfen.", preis: "10 – 15 €" },
      ],
    },
    {
      title: "Augenbrauen",
      icon: "〰",
      items: [
        { name: "Augenbrauen trimmen", desc: "Formen und Kürzen der Augenbrauen.", preis: "8 €" },
        { name: "Augenbrauen tönen", desc: "Färben der Augenbrauen für mehr Kontur.", preis: "12 €" },
        { name: "Augenbrauen komplett", desc: "Trimmen + Tönen als Paket.", preis: "18 €" },
      ],
    },
    {
      title: "Farbe & Pflege",
      icon: "🎨",
      items: [
        { name: "Haarfarbe komplett", desc: "Volltonige Färbung inkl. Einwirkzeit.", preis: "Ab 40 €" },
        { name: "Ansatzfarbe", desc: "Nachfärben der Ansatzzone.", preis: "Ab 30 €" },
        { name: "Pflegebehandlung", desc: "Intensive Haarkur für mehr Glanz und Geschmeidigkeit.", preis: "15 – 25 €" },
      ],
    },
  ];

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#0d0d0d", padding: "80px 48px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(184,134,11,0.09) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, animationDelay: "0.1s" }}>
            <div className="barber-pole" />
            <span className="eyebrow">Preisliste</span>
            <div className="barber-pole" />
          </div>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 70px)", fontWeight: 500, color: "#f5f0eb", lineHeight: 1.1, animationDelay: "0.3s" }}>Leistungen</h1>
          <p className="anim-fade-up" style={{ fontSize: 14, color: "rgba(245,240,235,0.45)", marginTop: 16, maxWidth: 440, margin: "16px auto 0", lineHeight: 1.8, fontWeight: 300, animationDelay: "0.45s" }}>
            Alle Preise sind Richtwerte. Der genaue Preis wird vor Beginn der Behandlung abgestimmt.
          </p>
        </div>
      </div>

      <MarqueeStrip light />

      <div style={{ background: "#f5f0eb", padding: "72px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {kategorien.map((kat, ki) => (
            <Reveal key={kat.title}>
              <div style={{ marginBottom: 64 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}>
                  <span style={{ fontSize: 26 }}>{kat.icon}</span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500 }}>{kat.title}</h2>
                  <div style={{ flex: 1, height: 1, background: "#e0d8ce", marginLeft: 12 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                  {kat.items.map((item, ii) => (
                    <Reveal key={item.name} delay={ii * 0.07}>
                      <div style={{ background: "#fff", border: "1px solid #e0d8ce", borderRadius: 2, padding: "22px 20px", transition: "all 0.3s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#b8860b"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0d8ce"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 10 }}>
                          <h3 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{item.name}</h3>
                          <span style={{ fontSize: 13, color: "#b8860b", fontWeight: 700, whiteSpace: "nowrap" }}>{item.preis}</span>
                        </div>
                        <p style={{ fontSize: 12, lineHeight: 1.7, color: "#888", fontWeight: 300 }}>{item.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ background: "#0d0d0d", padding: "72px 48px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 44px)", color: "#f5f0eb", fontWeight: 500, marginBottom: 14 }}>
            Termin gewünscht?
          </h2>
          <p style={{ fontSize: 14, color: "rgba(245,240,235,0.45)", marginBottom: 32, fontWeight: 300 }}>Einfach anrufen oder das Kontaktformular nutzen.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-gold" onClick={() => { setPage("kontakt"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Termin buchen</button>
            <a href="tel:01739289022" className="btn btn-outline-light">0173 9289022</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// TEAM
// ══════════════════════════════════════════════════════
function PageTeam() {
  const team = [
    { name: "Prinz", title: "Inhaber & Meisterfriseur", spezialität: "Herrenschnitte · Fade · Bartpflege", bio: "Als Inhaber und gelernter Meisterfriseur steht Prinz für höchste Qualität und handwerkliche Präzision. Sein Stil ist klar, sein Auge für Details unübertroffen — genau das macht Prinz Friseur zu dem, was es ist.", img: IMGS.team1 },
    { name: "Aydin K.", title: "Friseur", spezialität: "Klassische Rasur · Konturenschnitt", bio: "Aydin bringt jahrelange Erfahrung in klassischer Rasur und modernen Herrenschnitten mit. Ruhig, präzise und immer mit dem Kunden im Fokus.", img: IMGS.team2 },
    { name: "Emre S.", title: "Junior-Friseur", spezialität: "Fade · Kinderhaarschnitte", bio: "Emre ist das frische Gesicht im Team — mit viel Energie, Begeisterung und einem Talent für moderne Fade-Schnitte und Kinderhaarschnitte.", img: IMGS.team3 },
  ];

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#f5f0eb", padding: "80px 48px 90px", textAlign: "center", borderBottom: "1px solid #e0d8ce", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 120%, rgba(184,134,11,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, animationDelay: "0.1s" }}>
            <div className="barber-pole" />
            <span className="eyebrow">Die Friseure</span>
            <div className="barber-pole" />
          </div>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 70px)", fontWeight: 500, color: "#0d0d0d", lineHeight: 1.1, animationDelay: "0.3s" }}>Unser Team</h1>
          <p className="anim-fade-up" style={{ fontSize: 14, color: "#999", marginTop: 16, maxWidth: 420, margin: "16px auto 0", lineHeight: 1.8, fontWeight: 300, animationDelay: "0.45s" }}>
            Leidenschaftliche Handwerker, die ihr Metier lieben.
          </p>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "72px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div style={{ background: "#f5f0eb", border: "1px solid #e0d8ce", borderRadius: 2, overflow: "hidden", transition: "transform 0.4s, box-shadow 0.4s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ height: 300, overflow: "hidden" }}>
                    <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.6s ease" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{ padding: "26px 26px 30px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{m.name}</h3>
                    <div style={{ fontSize: 10, color: "#b8860b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: "#aaa", fontStyle: "italic", marginBottom: 14 }}>{m.spezialität}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.8, color: "#777", fontWeight: 300 }}>{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#0d0d0d", padding: "72px 48px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 40px)", color: "#f5f0eb", fontWeight: 500, marginBottom: 12 }}>
            Wir suchen Verstärkung
          </h2>
          <p style={{ fontSize: 14, color: "rgba(245,240,235,0.45)", marginBottom: 28, fontWeight: 300 }}>Friseur mit Leidenschaft? Meld dich gerne bei uns.</p>
          <a href="tel:01739289022" className="btn btn-gold">0173 9289022</a>
        </Reveal>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// GALERIE
// ══════════════════════════════════════════════════════
function PageGalerie() {
  const [filter, setFilter] = useState("Alle");
  const [lightbox, setLightbox] = useState(null);

  const fotos = [
    { src: IMGS.gal1,  label: "Herrenschnitt klassisch", kat: "Schnitte", tall: true },
    { src: IMGS.gal2,  label: "Fade Schnitt",            kat: "Schnitte" },
    { src: IMGS.gal3,  label: "Bartpflege",              kat: "Bart" },
    { src: IMGS.gal4,  label: "Konturenschnitt",         kat: "Schnitte" },
    { src: IMGS.gal5,  label: "Salon Atmosphäre",        kat: "Salon" },
    { src: IMGS.gal6,  label: "Eingangsbereich",         kat: "Salon" },
    { src: IMGS.gal7,  label: "Heiße Rasur",             kat: "Bart" },
    { src: IMGS.gal8,  label: "Spiegel & Stühle",        kat: "Salon" },
    { src: IMGS.gal9,  label: "Moderner Fade",           kat: "Schnitte" },
    { src: IMGS.gal10, label: "Bartschnitt Detail",      kat: "Bart" },
    { src: IMGS.gal11, label: "Styling",                 kat: "Schnitte" },
    { src: IMGS.gal12, label: "Vor & Nach",              kat: "Bart" },
  ];

  const kats = ["Alle", "Schnitte", "Bart", "Salon"];
  const filtered = filter === "Alle" ? fotos : fotos.filter(f => f.kat === filter);

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#0d0d0d", padding: "80px 48px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, animationDelay: "0.1s" }}>
            <div className="barber-pole" />
            <span className="eyebrow">Einblicke</span>
            <div className="barber-pole" />
          </div>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 70px)", fontWeight: 500, color: "#f5f0eb", animationDelay: "0.3s" }}>Galerie</h1>
          <p className="anim-fade-up" style={{ fontSize: 14, color: "rgba(245,240,235,0.45)", marginTop: 16, maxWidth: 380, margin: "16px auto 0", lineHeight: 1.8, fontWeight: 300, animationDelay: "0.4s" }}>
            Unsere Arbeit spricht für sich — Bildergalerie folgt mit echten Fotos.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ background: "#f5f0eb", padding: "28px 48px", borderBottom: "1px solid #e0d8ce" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {kats.map(k => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: "8px 20px", borderRadius: 2,
              border: filter === k ? "1.5px solid #0d0d0d" : "1.5px solid #e0d8ce",
              background: filter === k ? "#0d0d0d" : "transparent",
              color: filter === k ? "#f5f0eb" : "#777",
              fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
            }}>{k}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", padding: "40px 48px 72px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {filtered.map((f, i) => (
              <Reveal key={f.src + filter} delay={i * 0.05}
                style={{ gridColumn: f.tall && filter === "Alle" ? "span 2" : "span 1", overflow: "hidden", position: "relative", cursor: "pointer" }}
              >
                <div onClick={() => setLightbox(f)} style={{ width: "100%", height: f.tall && filter === "Alle" ? 420 : 260, position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.07)"; e.currentTarget.querySelector(".gal-overlay").style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".gal-overlay").style.opacity = "0"; }}
                >
                  <img src={f.src} alt={f.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }} />
                  <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: 0, transition: "opacity 0.4s" }}>
                    <div style={{ width: 44, height: 44, border: "1.5px solid #b8860b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8860b", fontSize: 20 }}>+</div>
                    <span style={{ fontSize: 10, letterSpacing: 2, color: "#f5f0eb", textTransform: "uppercase", fontFamily: "'Jost', sans-serif" }}>{f.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 28, background: "none", border: "none", color: "#f5f0eb", fontSize: 32, cursor: "pointer", zIndex: 2 }}>✕</button>
          <img src={lightbox.src} alt={lightbox.label} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 2, animation: "scaleIn 0.3s ease", display: "block" }} onClick={e => e.stopPropagation()} />
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", fontSize: 11, letterSpacing: 3, color: "rgba(245,240,235,0.5)", textTransform: "uppercase", fontFamily: "'Jost', sans-serif" }}>{lightbox.label}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// KONTAKT
// ══════════════════════════════════════════════════════
function PageKontakt() {
  const [form, setForm] = useState({ name: "", telefon: "", leistung: "", datum: "", nachricht: "" });
  const [gesendet, setGesendet] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setGesendet(true); };

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#f5f0eb", padding: "80px 48px 90px", textAlign: "center", borderBottom: "1px solid #e0d8ce", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 120%, rgba(184,134,11,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, animationDelay: "0.1s" }}>
            <div className="barber-pole" />
            <span className="eyebrow">Termin & Kontakt</span>
            <div className="barber-pole" />
          </div>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 70px)", fontWeight: 500, color: "#0d0d0d", lineHeight: 1.1, animationDelay: "0.3s" }}>Kontakt</h1>
        </div>
      </div>

      <div style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 48px", display: "flex", gap: 72, flexWrap: "wrap" }}>
          {/* Info */}
          <div style={{ flex: "1 1 280px", minWidth: 240 }}>
            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, marginBottom: 28 }}>Besuchen Sie uns</h2>
              {[
                { icon: "📍", label: "Adresse", val: "Steinstraße 17\n77652 Offenburg" },
                { icon: "📞", label: "Telefon", val: "0173 9289022", href: "tel:01739289022" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 4 }}>{r.label}</div>
                    {r.href
                      ? <a href={r.href} style={{ fontSize: 14, color: "#b8860b", textDecoration: "none", fontWeight: 500 }}>{r.val}</a>
                      : <div style={{ fontSize: 14, lineHeight: 1.7, color: "#555", fontWeight: 300, whiteSpace: "pre-line" }}>{r.val}</div>
                    }
                  </div>
                </div>
              ))}

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, marginBottom: 16, marginTop: 8 }}>Öffnungszeiten</h3>
              {[
                ["Mo – Di", "Geschlossen"],
                ["Mi – Fr", "09:00 – 19:00 Uhr"],
                ["Samstag", "09:00 – 17:00 Uhr"],
                ["Sonntag", "Geschlossen"],
              ].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0ebe3", gap: 16 }}>
                  <span style={{ fontSize: 13, color: "#777", fontWeight: 300 }}>{d}</span>
                  <span style={{ fontSize: 13, color: h === "Geschlossen" ? "#ccc" : "#b8860b", fontWeight: 600 }}>{h}</span>
                </div>
              ))}

              <div style={{ marginTop: 28, background: "#f5f0eb", border: "1px solid #e0d8ce", borderRadius: 2, padding: "16px 18px" }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Geöffnet heute</div>
                <div style={{ fontSize: 13, color: "#555", fontWeight: 300 }}>Schließt um 19:00 Uhr</div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div style={{ flex: "2 1 420px", minWidth: 280 }}>
            <Reveal delay={0.15}>
              {gesendet ? (
                <div style={{ background: "#f5f0eb", border: "1px solid #e0d8ce", borderRadius: 2, padding: "60px 40px", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 18 }}>💈</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500, marginBottom: 10 }}>Anfrage erhalten!</h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.8, fontWeight: 300 }}>Vielen Dank, {form.name}! Wir melden uns schnellstmöglich zur Terminbestätigung.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, marginBottom: 8 }}>Termin anfragen</h2>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 32, lineHeight: 1.7, fontWeight: 300 }}>
                    Füllen Sie das Formular aus — wir bestätigen Ihren Termin innerhalb von 24 Stunden.<br />
                    Oder rufen Sie direkt an: <a href="tel:01739289022" style={{ color: "#b8860b", fontWeight: 600 }}>0173 9289022</a>
                  </p>
                  <form onSubmit={submit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div>
                        <label className="field-label">Name *</label>
                        <input className="field" name="name" value={form.name} onChange={handle} required placeholder="Ihr Name" />
                      </div>
                      <div>
                        <label className="field-label">Telefon</label>
                        <input className="field" name="telefon" value={form.telefon} onChange={handle} placeholder="0173 …" />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div>
                        <label className="field-label">Leistung</label>
                        <select className="field" name="leistung" value={form.leistung} onChange={handle}>
                          <option value="">Leistung wählen</option>
                          <option>Herrenschnitt</option>
                          <option>Bartschnitt</option>
                          <option>Schnitt + Bart</option>
                          <option>Heiße Rasur</option>
                          <option>Konturenschnitt / Fade</option>
                          <option>Kinderschnitt</option>
                          <option>Augenbrauen</option>
                          <option>Sonstiges</option>
                        </select>
                      </div>
                      <div>
                        <label className="field-label">Wunschtermin</label>
                        <input className="field" name="datum" type="date" value={form.datum} onChange={handle} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label className="field-label">Nachricht (optional)</label>
                      <textarea className="field" name="nachricht" value={form.nachricht} onChange={handle} rows={3} placeholder="Besondere Wünsche oder Fragen …" style={{ resize: "vertical" }} />
                    </div>
                    <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", borderRadius: 2, padding: "16px 32px" }}>
                      Termin anfragen
                    </button>
                    <p style={{ fontSize: 11, color: "#bbb", marginTop: 12, textAlign: "center" }}>Absage bitte 24 Stunden vorher.</p>
                  </form>
                </>
              )}
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 300, position: "relative", overflow: "hidden" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.0!2d7.9407!3d48.4736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b8e2ad6f1a0d%3A0x0!2sSteinstra%C3%9Fe+17%2C+77652+Offenburg!5e0!3m2!1sde!2sde!4v1699900000000"
            width="100%" height="100%"
            style={{ border: "none", filter: "grayscale(100%) contrast(0.9) brightness(0.55)", display: "block" }}
            title="Prinz Friseur Standort"
            allowFullScreen
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ background: "rgba(13,13,13,0.75)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.35)", padding: "18px 28px", textAlign: "center", borderRadius: 2 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: "#b8860b", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>💈 Prinz Friseur</div>
              <div style={{ fontSize: 13, color: "#f5f0eb", fontWeight: 300 }}>Steinstraße 17, 77652 Offenburg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// IMPRESSUM
// ══════════════════════════════════════════════════════
function PageImpressum() {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 14, color: "#0d0d0d" }}>{title}</h2>
      <div style={{ width: 32, height: 1, background: "#b8860b", marginBottom: 18 }} />
      <div style={{ fontSize: 14, lineHeight: 1.9, color: "#555", fontWeight: 300 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#0d0d0d", padding: "64px 48px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow anim-fade-up" style={{ animationDelay: "0.1s" }}>Rechtliches</span>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, color: "#f5f0eb", animationDelay: "0.3s" }}>Impressum</h1>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "72px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <Section title="Angaben gemäß § 5 TMG">
              <strong>Prinz Friseur</strong><br />
              Steinstraße 17<br />
              77652 Offenburg<br />
              Deutschland
            </Section>

            <Section title="Kontakt">
              Telefon: <a href="tel:01739289022" style={{ color: "#b8860b" }}>0173 9289022</a><br />
              E-Mail: info@prinz-friseur.de
            </Section>

            <Section title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
              Inhaber: [Name des Inhabers]<br />
              Steinstraße 17<br />
              77652 Offenburg
            </Section>

            <Section title="Berufsbezeichnung und berufsrechtliche Regelungen">
              Berufsbezeichnung: Friseur / Friseurmeister<br />
              Zuständige Kammer: Handwerkskammer Freiburg<br />
              Verliehen in: Deutschland
            </Section>

            <Section title="Umsatzsteuer-ID">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE [Ihre USt-ID]
            </Section>

            <Section title="EU-Streitschlichtung">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "#b8860b" }}>
                https://ec.europa.eu/consumers/odr
              </a><br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </Section>

            <Section title="Verbraucherstreitbeilegung/Universalschlichtungsstelle">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </Section>

            <Section title="Haftung für Inhalte">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </Section>

            <Section title="Urheberrecht">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </Section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// DATENSCHUTZ
// ══════════════════════════════════════════════════════
function PageDatenschutz() {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 14, color: "#0d0d0d" }}>{title}</h2>
      <div style={{ width: 32, height: 1, background: "#b8860b", marginBottom: 18 }} />
      <div style={{ fontSize: 14, lineHeight: 1.9, color: "#555", fontWeight: 300 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ paddingTop: 84 }}>
      <div style={{ background: "#0d0d0d", padding: "64px 48px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow anim-fade-up" style={{ animationDelay: "0.1s" }}>Rechtliches</span>
          <div className="divider-gold-c anim-fade-up" style={{ animationDelay: "0.2s" }} />
          <h1 className="anim-fade-up" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, color: "#f5f0eb", animationDelay: "0.3s" }}>Datenschutzerklärung</h1>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "72px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <Section title="1. Datenschutz auf einen Blick">
              <strong>Allgemeine Hinweise</strong><br />
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </Section>

            <Section title="2. Verantwortliche Stelle">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              <strong>Prinz Friseur</strong><br />
              Steinstraße 17<br />
              77652 Offenburg<br />
              Telefon: <a href="tel:01739289022" style={{ color: "#b8860b" }}>0173 9289022</a><br />
              E-Mail: info@prinz-friseur.de
            </Section>

            <Section title="3. Datenerfassung auf dieser Website">
              <strong>Wer ist verantwortlich für die Datenerfassung?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem obigen Abschnitt entnehmen.<br /><br />

              <strong>Wie werden Ihre Daten erfasst?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen – z. B. durch Eingabe in ein Kontaktformular. Andere Daten werden beim Besuch der Website automatisch durch IT-Systeme erfasst (z. B. Internetbrowser, Betriebssystem, Uhrzeit des Seitenaufrufs).<br /><br />

              <strong>Wofür werden Ihre Daten genutzt?</strong><br />
              Die Daten werden zur fehlerfreien Bereitstellung der Website sowie zur Bearbeitung von Terminanfragen erhoben.
            </Section>

            <Section title="4. Kontaktformular">
              Wenn Sie uns per Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.<br /><br />
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
            </Section>

            <Section title="5. Ihre Rechte">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:<br /><br />
              — Recht auf Auskunft (Art. 15 DSGVO)<br />
              — Recht auf Berichtigung (Art. 16 DSGVO)<br />
              — Recht auf Löschung (Art. 17 DSGVO)<br />
              — Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)<br />
              — Recht auf Datenübertragbarkeit (Art. 20 DSGVO)<br />
              — Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)<br /><br />
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: info@prinz-friseur.de
            </Section>

            <Section title="6. Google Maps">
              Diese Website bindet Google Maps zur Darstellung einer Karte ein. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Durch die Nutzung von Google Maps können Informationen über die Benutzung dieser Website an Google übertragen werden. Weitere Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#b8860b" }}>
                https://policies.google.com/privacy
              </a>
            </Section>

            <Section title="7. Hosting">
              Diese Website wird bei einem externen Dienstleister gehostet. Personenbezogene Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Der Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist.
            </Section>

            <Section title="8. Änderungen dieser Datenschutzerklärung">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht. Stand: 2025
            </Section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":        return <PageHome setPage={setPage} />;
      case "services":    return <PageServices setPage={setPage} />;
      case "team":        return <PageTeam />;
      case "galerie":     return <PageGalerie />;
      case "kontakt":     return <PageKontakt />;
      case "impressum":   return <PageImpressum />;
      case "datenschutz": return <PageDatenschutz />;
      default:            return <PageHome setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} />
      <main key={page} style={{ animation: "fadeIn 0.45s ease" }}>
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
