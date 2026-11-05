import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { works, styles, site } from "@/data/site";
import { Modal } from "@/components/ui/Modal";
export function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const [index, setIndex] = useState<number | null>(null);
  const filtered = works.filter(
    (m) => filter === "Todos" || m.style === filter,
  );
  return (
    <section id="trabalhos" className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / NA PELE</p>
          <h2 data-reveal="fade">Arte que fica.</h2>
        </div>
        <p>
          Cada traço, uma escolha.
          <br />
          Cada trabalho, uma história.
        </p>
      </div>
      <div className="filters" aria-label="Filtrar trabalhos">
        {["Todos", ...styles, "Piercing"].map((s) => (
          <button
            key={s}
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="gallery">
          {filtered.map((m, i) => (
            <button className="work" key={m.src} onClick={() => setIndex(i)}>
              <img
                src={m.src}
                srcSet={m.srcSet}
                sizes="(max-width: 600px) 100vw, 50vw"
                alt={m.alt}
                width="700"
                height="850"
                loading="lazy"
              />
              <span>
                {m.caption || m.style || "Ver trabalho"}
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
          <figure className="lightbox">
            <img src={filtered[index].src} alt={filtered[index].alt} />
            <figcaption>{filtered[index].caption}</figcaption>
          </figure>
          <div className="lightbox-controls">
            <button
              className="icon"
              aria-label="Trabalho anterior"
              onClick={() =>
                setIndex((index - 1 + filtered.length) % filtered.length)
              }
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {index + 1} / {filtered.length}
            </span>
            <button
              className="icon"
              aria-label="Próximo trabalho"
              onClick={() => setIndex((index + 1) % filtered.length)}
            >
              <ArrowRight />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
