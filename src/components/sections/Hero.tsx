import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TattooInstruments } from "@/components/ui/TattooInstruments";
import { site } from "@/data/site";

export function Hero() {
  const [allowed, setAllowed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setAllowed(
        !motion.matches &&
          !(navigator as Navigator & { connection?: { saveData: boolean } })
            .connection?.saveData,
      );
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowed) return;
    const play = () => {
      if (!video.paused) return;
      video.muted = true;
      void video.play().catch(() => {
        // Keep the poster visible when the browser blocks playback.
      });
    };
    play();
    window.addEventListener("touchend", play, { passive: true });
    window.addEventListener("click", play);
    return () => {
      window.removeEventListener("touchend", play);
      window.removeEventListener("click", play);
    };
  }, [allowed, videoFailed]);

  return (
    <section id="abertura" className="hero" aria-label="Good Vibe Tattoo Club">
      {site.hero && (
        <img
          className="hero-media"
          src={site.hero.src}
          srcSet={site.hero.srcSet}
          sizes="100vw"
          alt={site.hero.alt}
          width="480"
          height="848"
          fetchPriority="high"
        />
      )}
      {site.hero && site.heroVideo && allowed && !videoFailed && (
        <video
          ref={videoRef}
          className="hero-media"
          poster={site.hero.src}
          src={site.heroVideo}
          preload="none"
          aria-hidden="true"
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
        />
      )}
      <div className="brand-intro" aria-hidden="true">
        <TattooInstruments />
        <div className="brand-ink-specks">
          {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--drop-x": `${8 + (i * 29) % 84}%`, "--drop-delay": `${(i % 5) * 85}ms`, "--drop-size": `${3 + i % 4}px` } as CSSProperties} />)}
        </div>
        <div className="brand-intro-content">
          <svg className="intro-needle" viewBox="0 0 200 70" fill="none">
            <path className="intro-draw" pathLength="1" d="M15 35h48m74 0h48M87 13l26 26-13 13-26-26zM94 20l13-13 15 15-13 13M80 32l-7 7m28 7-18 18m-10 0 10-10M91 26l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle className="intro-ink-dot" cx="80" cy="65" r="2" fill="currentColor"/>
          </svg>
          <p><span className="brand-intro-name">{Array.from("GOOD VIBE").map((letter, i) => <span key={i} style={{ "--letter": i } as CSSProperties}>{letter === " " ? "\u00a0" : letter}</span>)}</span><span className="brand-intro-subtitle">TATTOO CLUB</span></p>
          <span className="brand-intro-motto">ARTE COM ATITUDE E ALMA.</span>
          <div className="brand-intro-line" />
        </div>
      </div>
      <div className="hero-grain" />
      <div className="hero-content">
        <h1>Good Vibe <span>Tattoo Club</span></h1>
        <div className="hero-actions">
          <a className="button light" href="/tatuagens">
            Tatuagens <ArrowUpRight size={18} />
          </a>
          <a className="button light" href="/piercings">
            Piercings <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="hero-studio-link" href="#estudio">
          <span className="hairline" /> Conheça o estúdio
        </a>
        <a className="hero-scroll" href="#trabalhos" aria-label="Rolar para a galeria de tatuagens">
          <ArrowDown size={20} />
        </a>
        <span>BLUMENAU — SC, BRASIL</span>
      </div>
    </section>
  );
}
