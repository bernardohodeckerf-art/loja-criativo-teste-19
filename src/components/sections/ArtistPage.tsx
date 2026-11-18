import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Portfolio } from "@/components/sections/Portfolio";
import type { ArtistProfile } from "@/data/artist-profiles";
import { site } from "@/data/site";

export function ArtistPage({ profile, piercing = false }: { profile: ArtistProfile; piercing?: boolean }) {
  const { name, role, portrait } = profile;
  const title = piercing ? "Piercings" : name;

  useEffect(() => {
    document.title = `${title} | ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      piercing ? "Conheça o serviço de body piercing de Rodrigo Moreira na Good Vibe Tattoo Club, em Blumenau." : `Conheça ${name}. ${role} na Good Vibe Tattoo Club, em Blumenau.`);
  }, [name, piercing, role, title]);

  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="artist-page">
        <section className="section artist-page-intro">
          <div>
            <a className="underlined" href={piercing ? "/" : "/equipe"}>
              <ArrowLeft size={16} /> {piercing ? "Início" : "Nossa equipe"}
            </a>
            <h1>{title}</h1>
            {piercing && <a className="underlined" href={profile.path}>{name} <ArrowUpRight size={16} /></a>}
            <p>{piercing ? "Atendimento de body piercing com Rodrigo Moreira, em Blumenau." : role}</p>
            <p className="eyebrow">{piercing ? "24 anos de experiência em piercing" : profile.experience}</p>
            {profile.specialties && <p>{profile.specialties}</p>}
            <a className="button light" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              Fale com o estúdio <ArrowUpRight size={18} />
            </a>
          </div>
          {portrait && <img src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} />}
        </section>
        <section className="section artist-page-bio" aria-labelledby="artist-bio">
          <h2 id="artist-bio">{piercing ? "Sobre o atendimento" : "Trajetória"}</h2>
          <div>
            {piercing
              ? <p>Rodrigo oferece atendimento personalizado, com atenção à segurança, à qualidade e às escolhas de cada cliente.</p>
              : profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {profile.highlights && <ul className="artist-highlights">
              {profile.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>}
          </div>
        </section>
        {profile.works && <Portfolio works={profile.works} title={profile.galleryTitle ?? "Portfólio"} artist={profile} />}
      </main>
    </>
  );
}
