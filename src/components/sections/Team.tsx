import { ArrowUpRight } from "lucide-react";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { anaBomsenhor } from "@/data/ana-bomsenhor";
import { artistProfiles, type ArtistProfile } from "@/data/artist-profiles";

const team: ArtistProfile[] = [
  artistProfiles["old-school"], artistProfiles.doni, artistProfiles["fine-line"],
  artistProfiles.franja, artistProfiles.moreira,
  { ...anaBomsenhor, experience: "Mais de 10 anos de experiência", biography: [anaBomsenhor.biography] },
];

export function Team({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="artistas" className="section artists-section">
      {showHeading && <div className="section-heading"><h2>Nossa equipe</h2></div>}
      <div className="team-list">
        {team.map((artist) => (
          <article className="team-member" key={artist.path}>
            {artist.portrait && <img className="team-portrait" src={artist.portrait.src} alt={artist.portrait.alt}
              width={artist.portrait.width} height={artist.portrait.height} loading="lazy" />}
            <div className="team-curriculum">
              <h3>{artist.name}</h3>
              <p className="eyebrow">{artist.role} · {artist.experience}</p>
              {artist.specialties && <p>{artist.specialties}</p>}
              {artist.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {artist.highlights && <ul className="artist-highlights">{artist.highlights.map((item) => <li key={item}>{item}</li>)}</ul>}
              <a className="underlined" href={artist.path}>Ver perfil de {artist.name} <ArrowUpRight size={16} /></a>
            </div>
            {artist.works?.length ? <ImageAutoSlider images={artist.works.map((work) => ({ ...work, author: artist }))}
              speed={artist.works.length * 7} /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
