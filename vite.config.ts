import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { artistProfiles } from "./src/data/artist-profiles";
import { anaBomsenhor } from "./src/data/ana-bomsenhor";

function servicePages(): Plugin {
  const pages = {
    "/tatuagens": ["Tatuagens", "Galeria de tatuagens com identificação do estilo e do artista."],
    "/piercings": ["Piercings", "Serviço de body piercing com Rodrigo Moreira e galeria de trabalhos."],
    "/micropigmentacao": ["Micropigmentação", "Conheça o trabalho de dermopigmentação de Ana Bomsenhor."],
    "/tatuagem-paramedica": ["Tatuagem paramédica", "Conheça as especialidades em tatuagem paramédica de Ana Bomsenhor."],
    "/remocao-a-laser": ["Remoção de tatuagem a laser", "Conheça o serviço de remoção de tatuagens a laser com Rodrigo Moreira."],
    "/equipe": ["Nossa equipe", "Conheça os profissionais, suas especialidades, trajetórias e trabalhos."],
    "/estudio": ["Conheça nosso estúdio", "Veja fotos e vídeos do estúdio Good Vibe Tattoo Club em Blumenau."],
    "/contato": ["Contato", "Entre em contato com o estúdio e descubra como nos visitar."],
  };

  return {
    name: "static-service-pages",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const entry = bundle["index.html"];
      if (entry?.type !== "asset" || typeof entry.source !== "string") {
        this.error("Could not find the generated HTML entry for the service pages.");
      }
      const routes = [
        ...Object.entries(pages),
        ...[...Object.values(artistProfiles), anaBomsenhor].map(
          ({ path, name, role }) => [path, [name, `${name}, ${role} na Good Vibe Tattoo Club, em Blumenau.`]] as const,
        ),
      ];
      for (const [path, [title, description]] of routes) {
        const pageTitle = `${title} | Good Vibe Tattoo Club`;
        this.emitFile({
          type: "asset",
          fileName: `${path.slice(1)}/index.html`,
          source: entry.source
            .replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
            .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${description}"`)
            .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${pageTitle}"`)
            .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${description}"`),
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), servicePages()],
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
