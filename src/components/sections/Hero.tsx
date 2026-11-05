import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { site } from "@/data/site";

export function Hero({ book }: { book: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [allowed, setAllowed] = useState(false);
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
  return (
    <section className="hero" aria-label="Good Vibe Tattoo Club">
      {site.hero && (
        <img
          className="hero-media"
          src={site.hero.src}
          srcSet={site.hero.srcSet}
          sizes="100vw"
          alt={site.hero.alt}
          width="1290"
          height="1720"
          fetchPriority="high"
        />
      )}
      {site.hero && site.heroVideo && allowed && (
        <>
          <video
            ref={ref}
            className="hero-media"
            poster={site.hero.src}
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setPlay(true)}
            onError={() => setAllowed(false)}
          >
            <source
              src={
                matchMedia("(max-width: 600px)").matches
                  ? site.heroVideo.mobile || site.heroVideo.desktop
                  : site.heroVideo.desktop
              }
            />
          </video>
          <button
            className="video-pause icon"
            aria-label={play ? "Pausar vídeo" : "Retomar vídeo"}
            onClick={() => {
              if (play) ref.current?.pause();
              else void ref.current?.play();
              setPlay(!play);
            }}
          >
            {play ? <Pause /> : <Play />}
          </button>
        </>
      )}
      <div className="hero-grain" />
      <div className="hero-topline">
        <span>TATTOO • PIERCING • BLUMENAU</span>
        <span>EST. 2009</span>
      </div>
      <div className="hero-content">
        <p className="eyebrow">GOOD VIBE TATTOO CLUB</p>
        <h1>
          Sua história.
          <br />
          <span>Na sua pele.</span>
        </h1>
        <div className="hero-actions">
          <p className="hero-manifesto">
            ARTE COM
            <br />
            ATITUDE E ALMA.
          </p>
          <button className="button light" onClick={book}>
            Criar minha próxima tattoo <ArrowUpRight size={18} />
          </button>
          <a className="underlined" href="#trabalhos">
            Explorar trabalhos <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="hero-studio-link" href="#estudio">
          <span className="hairline" /> Conheça o estúdio
        </a>
        <a href="#essencia" aria-label="Conhecer o estúdio">
          <ArrowDown size={20} />
        </a>
        <span>BLUMENAU — SC, BRASIL</span>
      </div>
    </section>
  );
}
