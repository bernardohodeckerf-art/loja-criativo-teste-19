import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { works as studioWorks, styles, site, type Media } from "@/data/site";
import { Modal } from "@/components/ui/Modal";
export function Portfolio({
  works = studioWorks,
  title = "Arte que fica.",
  artist,
}: {
  works?: Media[];
  title?: string;
  artist?: { name: string; path: string };
}) {
  const [filter, setFilter] = useState("Todos");
  const [index, setIndex] = useState<number | null>(null);
  const swipeStart = useRef<number | null>(null);
  const categories = artist ? [...new Set(works.flatMap((work) => work.style ? [work.style] : []))] : styles;
  const filtered = works.filter(
    (m) => filter === "Todos" || m.style === filter,
  );
  const move = (step: number) => {
    setIndex((current) => current === null ? null : (current + step + filtered.length) % filtered.length);
  };
  return (
    <section id="trabalhos" className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / NA PELE</p>
          <h2>{title}</h2>
        </div>
        {!artist && <p>Cada traço, uma escolha.<br />Cada trabalho, uma história.</p>}
      </div>
      {categories.length > 1 && <div className="filters" aria-label="Filtrar trabalhos">
        {["Todos", ...categories].map((s) => (
          <button
            key={s}
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>}
      {filtered.length ? (
        <div className={artist ? "gallery artist-gallery" : "gallery"}>
          {filtered.map((m, i) => (
            <button className="work" key={m.src} onClick={() => setIndex(i)}>
              <img
                src={m.src}
                srcSet={m.srcSet}
                sizes="(max-width: 600px) 100vw, 50vw"
                alt={m.alt}
                width={m.width ?? 700}
                height={m.height ?? 850}
                loading="lazy"
              />
              <span>
                <span>{m.caption || m.style || "Ver trabalho"}{artist && <small>{m.style} · {artist.name}</small>}</span>
                <ArrowUpRight size={20} />
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="portfolio-invitation">
          <p>
            Conheça os trabalhos
            <br />
            que contam quem somos.
          </p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            Explorar no Instagram <ArrowUpRight size={20} />
          </a>
        </div>
      )}
      {index !== null && filtered[index] && (
        <Modal title="Trabalho em destaque" onClose={() => setIndex(null)}>
          <figure
            className="lightbox"
            onTouchStart={(event) => { swipeStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => {
              if (swipeStart.current === null) return;
              const distance = event.changedTouches[0].clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
            }}
            onTouchCancel={() => { swipeStart.current = null; }}
          >
            <img src={filtered[index].src} alt={filtered[index].alt} />
            <figcaption>
              {filtered[index].caption}
              {artist && <> · {filtered[index].style} · <a href={artist.path}>{artist.name}</a></>}
            </figcaption>
          </figure>
          <div className="lightbox-controls">
            <button
              className="icon"
              aria-label="Trabalho anterior"
              onClick={() => move(-1)}
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {index + 1} / {filtered.length}
            </span>
            <button
              className="icon"
              aria-label="Próximo trabalho"
              onClick={() => move(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
