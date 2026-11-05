import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Plus, Minus, Menu, Asterisk } from "lucide-react";
import {
  site,
  artists,
  styles,
  styleDescriptions,
  studioPhotos,
  videos,
  works,
} from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import {
  Questionnaire,
  type Booking,
} from "@/components/sections/Questionnaire";
import { Modal } from "@/components/ui/Modal";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { useReveal } from "@/hooks/useReveal";
const Jewel = lazy(() => import("@/components/ui/Jewel"));
const links = [
  ["Trabalhos", "trabalhos"],
  ["Estilos", "estilos"],
  ["Artistas", "artistas"],
  ["Estúdio", "estudio"],
  ["Contato", "contato"],
];
export default function App() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [style, setStyle] = useState<number | null>(0);
  useReveal();
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 35);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const book = (b: Booking = {}) => setBooking(b);
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={scrolled ? "scrolled" : ""}>
        <a className="wordmark" href="#" aria-label="Good Vibe início">
          GOOD VIBE<span>TATTOO CLUB</span>
        </a>
        <nav className="desktop-nav" aria-label="Principal">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <button className="header-book" onClick={() => book()}>
          Agendar <ArrowUpRight size={16} />
        </button>
        <button
          className="icon menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <Menu />
        </button>
      </header>
      {menu && (
        <Modal title="Navegação" onClose={() => setMenu(false)}>
          <nav className="mobile-nav">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </Modal>
      )}
      <main id="conteudo">
        <Hero book={() => book()} />
        <div className="style-ribbon" aria-label="Estilos e serviços">
          {[...styles, "Piercing", "Remoção a laser"].map((label) => (
            <span key={label}>
              {label}
              <Asterisk size={12} aria-hidden="true" />
            </span>
          ))}
        </div>
        <section id="essencia" className="intro section">
          <p className="eyebrow">GOOD VIBE TATTOO CLUB / DESDE 2009</p>
          <h2 data-reveal="fade">
            Mais que tinta.
            <br />
            Um jeito de <em>ser.</em>
          </h2>
          <div className="intro-copy">
            <span className="small-cross" aria-hidden="true">
              <Asterisk size={42} />
            </span>
            <p>
              Somos um espaço de expressão em Blumenau. Diferentes estilos,
              olhares e histórias unidos pela vontade de criar algo que tenha a
              sua essência.
            </p>
            <a className="underlined" href="#estudio">
              Conheça a Good Vibe <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <ImageAutoSlider images={works} />
        <Portfolio />
        <section id="estilos" className="section styles-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / SUA EXPRESSÃO</p>
              <h2 data-reveal="fade">
                Diferentes estilos.
                <br />
                Infinitas histórias.
              </h2>
            </div>
            <p>
              Encontre a linguagem
              <br />
              que conversa com você.
            </p>
          </div>
          <div className="style-list">
            {styles.map((s, i) => (
              <div className="style-item" key={s}>
                <button
                  aria-expanded={style === i}
                  aria-controls={`style-${i}`}
                  onClick={() => setStyle(style === i ? null : i)}
                >
                  <span className="number">0{i + 1}</span>
                  <span>{s}</span>
                  {style === i ? <Minus /> : <Plus />}
                </button>
                <div id={`style-${i}`} hidden={style !== i}>
                  <p>{styleDescriptions[i]}</p>
                  <button
                    className="text-button"
                    onClick={() => book({ service: "Tatuagem", style: s })}
                  >
                    Conversar sobre esse estilo <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="artistas" className="section artists-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / QUEM CRIA</p>
              <h2 data-reveal="fade">
                Diferentes traços.
                <br />A mesma essência.
              </h2>
            </div>
            <p>
              Pessoas, ideias e arte.
              <br />
              Conheça alguns dos nossos artistas.
            </p>
          </div>
          <div className="artists">
            {artists.map((a, i) => (
              <article key={a.id}>
                {a.photo && (
                  <img
                    data-reveal="slide"
                    data-direction={i % 2 ? "right" : "left"}
                    src={a.photo.src}
                    alt={a.photo.alt}
                    width="600"
                    height="750"
                    loading="lazy"
                  />
                )}
                <div className="artist-info">
                  <span className="number">0{i + 1}</span>
                  <div>
                    <h3>{a.name || a.specialty}</h3>
                    {a.name && <p>{a.specialty}</p>}
                    <p>{a.description}</p>
                  </div>
                  <button
                    className="icon"
                    aria-label={`Tenho interesse em ${a.name || a.specialty}`}
                    onClick={() =>
                      book({
                        service: a.id === "moreira" ? "Piercing" : "Tatuagem",
                        artist: a.name || a.specialty,
                      })
                    }
                  >
                    <ArrowUpRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="services section">
          <div className="piercing">
            <p className="eyebrow">04 / ALÉM DO TRAÇO</p>
            <h2 data-reveal="slide" data-direction="left">
              Um detalhe
              <br />
              que muda sua
              <br />
              <em>expressão.</em>
            </h2>
            <p>
              Piercing com Moreira.
              <br />
              Encontre o detalhe que tem a sua cara.
            </p>
            <button
              className="underlined"
              onClick={() => book({ service: "Piercing", artist: "Moreira" })}
            >
              Conversar sobre meu piercing <ArrowUpRight size={18} />
            </button>
            <Suspense fallback={<div className="jewel" />}>
              <Jewel />
            </Suspense>
          </div>
          <div className="laser">
            <span className="service-tag">REMOÇÃO A LASER</span>
            <h2 data-reveal="slide" data-direction="right">
              Novos caminhos
              <br />
              para a sua pele.
            </h2>
            <p>
              Histórias mudam. A Good Vibe também oferece remoção de tatuagem a
              laser. Converse com a gente sobre uma avaliação.
            </p>
            <button
              className="underlined"
              onClick={() => book({ service: "Remoção a laser" })}
            >
              Solicitar avaliação <ArrowUpRight size={18} />
            </button>
            <p className="secondary-service">
              Também oferecemos micropigmentação.{" "}
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                Saiba mais ↗
              </a>
            </p>
          </div>
        </section>
        <section id="estudio" className="section studio">
          <p className="eyebrow">05 / NOSSO LUGAR</p>
          <div className="section-heading">
            <h2 data-reveal="fade">
              Aqui, você
              <br />
              pode ser você.
            </h2>
            <div>
              <p>
                Em Blumenau desde 2009, a Good Vibe é feita de encontros, arte e
                atendimento próximo. Um espaço para transformar ideias em
                expressão.
              </p>
              <p className="studio-signature">Arte com atitude e alma.</p>
            </div>
          </div>
          {studioPhotos.map((m) => (
            <img
              className="studio-photo"
              key={m.src}
              src={m.src}
              alt={m.alt}
              width="1440"
              height="900"
              loading="lazy"
            />
          ))}
          {videos.length > 0 && (
            <div className="backstage">
              <h3>Por dentro da Good Vibe</h3>
              {videos.map((v) => (
                <figure key={v.src}>
                  <video
                    controls
                    preload="none"
                    poster={v.poster}
                    onPlay={(e) =>
                      document.querySelectorAll("video").forEach((other) => {
                        if (other !== e.currentTarget) other.pause();
                      })
                    }
                  >
                    <source src={v.src} />
                  </video>
                  <figcaption>{v.title}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
        <section id="contato" className="contact section">
          <p className="eyebrow">06 / SEU PRÓXIMO CAPÍTULO</p>
          <h2 data-reveal="fade">
            Bora tirar a ideia
            <br />
            <em>do papel?</em>
          </h2>
          <button className="button light" onClick={() => book()}>
            Vamos criar juntos <ArrowUpRight size={18} />
          </button>
          <div className="contact-details">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.address}
              <ArrowUpRight size={16} />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              @goodvibetattooclub <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#">
          GOOD VIBE<span>TATTOO CLUB</span>
        </a>
        <p>Arte com atitude e alma. Desde 2009.</p>
        <span>© {new Date().getFullYear()} Good Vibe Tattoo Club</span>
      </footer>
      {booking && (
        <Modal title="Solicitar orçamento" onClose={() => setBooking(null)}>
          <Questionnaire initial={booking} />
        </Modal>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TattooParlor",
            name: site.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua XV de Novembro, 592",
              addressLocality: "Blumenau",
              addressRegion: "SC",
              addressCountry: "BR",
            },
            foundingDate: "2009",
            sameAs: [site.instagram],
            telephone: "+554730374901",
          }),
        }}
      />
    </>
  );
}
