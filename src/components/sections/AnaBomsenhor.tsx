import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { anaBomsenhor as ana } from "@/data/ana-bomsenhor";
import { site } from "@/data/site";

export function AnaBomsenhor() {
  useEffect(() => {
    document.title = `${ana.name} | ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Conheça Ana Bomsenhor, micropigmentadora e tatuadora paramédica na Good Vibe Tattoo Club, em Blumenau.",
    );
    const section = location.hash.slice(1);
    if (section === "micropigmentacao" || section === "tatuagem-paramedica") {
      document.getElementById(section)?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="scrolled">
        <a className="wordmark" href="/" aria-label="Good Vibe início">
          GOOD VIBE<span>TATTOO CLUB</span>
        </a>
        <a className="header-book" href="/#artistas">Nossa equipe <ArrowUpRight size={16} /></a>
      </header>
      <main id="conteudo" className="ana-profile">
        <section className="section ana-profile-intro" aria-labelledby="ana-name">
          <div>
            <a className="underlined" href="/#artistas"><ArrowLeft size={16} /> Nossa equipe</a>
            <h1 id="ana-name">{ana.name}</h1>
            <p className="ana-role">{ana.role}</p>
            <p className="eyebrow">{ana.experience} de experiência</p>
          </div>
          <p className="ana-bio">{ana.biography}</p>
        </section>
        <section className="section ana-specialties" aria-label="Especialidades">
          <article id="micropigmentacao">
            <h2>Micropigmentação</h2>
            <p>Dermopigmentação, micropigmentação e tratamentos e camuflagem de cicatrizes e estrias.</p>
          </article>
          <article id="tatuagem-paramedica">
            <h2>Tatuagem paramédica</h2>
            <p>Reconstrução e harmonização de aréolas realistas.</p>
          </article>
          <a className="button light" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            Fale com o estúdio <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
    </>
  );
}
