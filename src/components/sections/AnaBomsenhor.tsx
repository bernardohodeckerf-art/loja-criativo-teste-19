import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { anaBomsenhor as ana } from "@/data/ana-bomsenhor";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { site } from "@/data/site";

export function AnaBomsenhor({ service }: { service?: "Micropigmentação" | "Tatuagem paramédica" }) {
  const title = service ?? ana.name;
  useEffect(() => {
    document.title = `${title} | ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Conheça Ana Bomsenhor, micropigmentadora e tatuadora paramédica na Good Vibe Tattoo Club, em Blumenau.",
    );
    const section = location.hash.slice(1);
    if (section === "micropigmentacao" || section === "tatuagem-paramedica") {
      document.getElementById(section)?.scrollIntoView();
    }
  }, [title]);

  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="ana-profile">
        <section className="section ana-profile-intro" aria-labelledby="ana-name">
          <div>
            <a className="underlined" href="/equipe"><ArrowLeft size={16} /> Nossa equipe</a>
            <h1 id="ana-name">{title}</h1>
            <p className="ana-role">{service ? <a href={ana.path}>{ana.name}</a> : ana.role}</p>
            <p className="eyebrow">{ana.experience} de experiência</p>
          </div>
          <img className="ana-profile-portrait" src={ana.portrait.src} alt={ana.portrait.alt}
            width={ana.portrait.width} height={ana.portrait.height} fetchPriority="high" />
          <p className="ana-bio">{ana.biography}</p>
        </section>
        <section className="section ana-specialties" aria-label="Especialidades">
          {service !== "Tatuagem paramédica" && <article id="micropigmentacao">
            <h2>Micropigmentação</h2>
            <p>Dermopigmentação e micropigmentação, incluindo tratamentos e camuflagem de cicatrizes e estrias.</p>
            {service !== "Micropigmentação" && <a className="underlined" href="/micropigmentacao">Conheça o serviço <ArrowUpRight size={16} /></a>}
          </article>}
          {service !== "Micropigmentação" && <article id="tatuagem-paramedica">
            <h2>Tatuagem paramédica</h2>
            <p>Reconstrução e harmonização de aréolas realistas e camuflagem de cicatrizes e estrias.</p>
            {service !== "Tatuagem paramédica" && <a className="underlined" href="/tatuagem-paramedica">Conheça o serviço <ArrowUpRight size={16} /></a>}
          </article>}
          <a className="button light" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            Fale com o estúdio <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
    </>
  );
}
