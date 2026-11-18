import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site, type Media } from "@/data/site";
import { Modal } from "@/components/ui/Modal";
export function Portfolio({
  works,
  title = "Arte que fica.",
  artist,
}: {
  works: Media[];
  title?: string;
  artist?: { name: string; path: string };
}) {
  const [filter, setFilter] = useState("Todos");
  const [author, setAuthor] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const swipeStart = useRef<number | null>(null);
  const categories = [...new Set(works.flatMap((work) => work.style ? [work.style] : []))];
  const authors = [...new Set(works.flatMap((work) => work.author ? [work.author.name] : []))];
  const filtered = works.filter((work) =>
    (filter === "Todos" || work.style === filter) &&
    (!author || work.author?.name === author),
  );
  const selected = index === null ? undefined : filtered[index];
  const selectedArtist = selected?.author ?? artist;
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
      {authors.length > 1 && <label className="portfolio-author">
        Artista
        <select value={author} onChange={(e) => { setAuthor(e.target.value); setFilter("Todos"); }}>
          <option value="">Todos os artistas</option>
          {authors.map((name) => <option key={name}>{name}</option>)}
        </select>
      </label>}
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
        <div key={`${author}:${filter}`} className="gallery artist-gallery">
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
                <span>{m.caption || m.style || "Ver trabalho"}{(m.author ?? artist) && <small>{m.style} · {(m.author ?? artist)?.name}</small>}</span>
                <ArrowUpRight size={20} />
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="portfolio-invitation">
          <p>
            Nenhum trabalho nesta combinação de filtros.
          </p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            Explorar no Instagram <ArrowUpRight size={20} />
          </a>
        </div>
      )}
      {index !== null && selected && (
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
            <img src={selected.src} alt={selected.alt} />
            <figcaption>
              {selected.caption}
              {selectedArtist && <> · {selected.style} · <a href={selectedArtist.path}>{selectedArtist.name}</a></>}
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
