import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Plus, Minus, Asterisk } from "lucide-react";
import {
  site,
  styles,
  styleDescriptions,
  studioPhotos,
  videos,
  type Media,
} from "@/data/site";
import { InkIntro } from "@/components/sections/InkIntro";
import { tattooWorks } from "@/data/tattoo-works";
import { Team } from "@/components/sections/Team";
import { SiteHeader } from "@/components/ui/SiteHeader";
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
const pageTitles = {
  tatuagens: "Tatuagens",
  equipe: "Nossa equipe",
  estudio: "Conheça nosso estúdio",
  contato: "Contato",
  "remocao-a-laser": "Remoção de tatuagem a laser",
};

export type SitePage = keyof typeof pageTitles;

export default function App({ page }: { page?: SitePage }) {
  const home = !page;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [studioPhoto, setStudioPhoto] = useState<Media | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [style, setStyle] = useState<number | null>(0);
  useReveal();
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 35);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (page) {
      document.title = `${pageTitles[page]} | ${site.name}`;
      document.querySelector('meta[name="description"]')?.setAttribute(
        "content", `${pageTitles[page]} na Good Vibe Tattoo Club, em Blumenau.`,
      );
    }
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [page]);

  const book = (b: Booking = {}) => setBooking(b);
  return (
    <>
      <SiteHeader solid={!home || scrolled} book={() => book()} />
      <main id="conteudo" className={home ? undefined : "content-page"}>
        {page && <div className="section page-title"><h1>{pageTitles[page]}</h1></div>}
        {home && <>
        <Hero />
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
        <InkIntro />
        <ImageAutoSlider images={tattooWorks} speed={tattooWorks.length * 6} />
        </>}
        {(home || page === "tatuagens") && <>
        <Portfolio works={tattooWorks} title="Galeria de tatuagens" />
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
                  <span className="number">{String(i + 1).padStart(2, "0")}</span>
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
        </>}
        {(home || page === "equipe") && <Team showHeading={home} />}
        {home && <>
        <section className="services section">
          <div id="piercing" className="piercing">
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
            <a className="underlined" href="/piercings">Conheça o serviço de piercing <ArrowUpRight size={16} /></a>
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
            <a className="underlined" href="/remocao-a-laser">Conheça a remoção a laser <ArrowUpRight size={16} /></a>
            <p className="secondary-service">
              Conheça nossos serviços de{" "}
              <a href="/micropigmentacao">micropigmentação</a>
              {" e "}
              <a href="/tatuagem-paramedica">tatuagem paramédica</a>.
            </p>
          </div>
        </section>
        </>}
        {page === "remocao-a-laser" && <section className="section laser-service">
          <div>
            <h2>Rodrigo Moreira</h2>
            <p>Especialista em remoção de tatuagens a laser, com 18 anos de experiência no serviço.</p>
            <a className="underlined" href="/equipe/rodrigo-moreira">Conheça Rodrigo Moreira <ArrowUpRight size={16} /></a>
            <button className="button light" onClick={() => book({ service: "Remoção a laser" })}>Solicitar avaliação <ArrowUpRight size={16} /></button>
          </div>
          <figure>
            <img src="/media/rodrigo-remocao-laser.webp" alt="Comparação de uma tatuagem em duas etapas da remoção a laser" width="1290" height="1269" loading="lazy" />
            <figcaption>Remoção a laser · Rodrigo Moreira</figcaption>
          </figure>
        </section>}
        {(home || page === "estudio") && <section id="estudio" className="section studio">
          <p className="eyebrow">05 / NOSSO LUGAR</p>
          <div className="section-heading">
            <h2 data-reveal="fade">
              Conheça nosso estúdio
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
          <div className="studio-editorial">
            {studioPhotos.map((m) => (
              <button type="button" className="studio-frame" key={m.src} onClick={() => setStudioPhoto(m)}
                aria-label={`Ampliar: ${m.alt}`} data-reveal="fade">
                <img className="studio-photo" src={m.src} alt={m.alt} width={m.width ?? 1440} height={m.height ?? 1920} loading="lazy" />
              </button>
            ))}
          </div>
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
        </section>}
        {(home || page === "contato") && <section id="contato" className="contact section">
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
        </section>}
      </main>
      <footer>
        <a className="wordmark" href="/">
          GOOD VIBE<span>TATTOO CLUB</span>
        </a>
        <p>Arte com atitude e alma. Desde 2009.</p>
        <span>© {new Date().getFullYear()} Good Vibe Tattoo Club</span>
      </footer>
      {studioPhoto && <Modal title={studioPhoto.alt} onClose={() => setStudioPhoto(null)}>
        <figure className="lightbox"><img src={studioPhoto.src} alt={studioPhoto.alt} /></figure>
      </Modal>}
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
