export type Media = {
  src: string;
  alt: string;
  caption?: string;
  style?: string;
  srcSet?: string;
};
export const site = {
  name: "Good Vibe Tattoo Club",
  since: 2009,
  address: "Rua XV de Novembro, 592, Blumenau–SC",
  instagram: "https://www.instagram.com/goodvibetattooclub/",
  whatsapp: "https://wa.me/554730374901",
  hero: {
    src: "/media/nico-portfolio-3.jpg",
    alt: "Nico trabalhando em uma tatuagem na Good Vibe Tattoo Club",
  } as Media | undefined,
  heroVideo: undefined as { desktop: string; mobile?: string } | undefined,
};
// Add only supplied, confirmed media. No stock portraits or inferred attribution.
export const works: Media[] = [
  {
    src: "/media/studio-portfolio-0.jpg",
    alt: "Tatuagem realista de personagem com coroa na perna",
    caption: "Detalhes que contam histórias",
    style: "Realismo",
  },
  {
    src: "/media/studio-portfolio-2.jpg",
    alt: "Tatuagem de caveira com correntes no braço",
    caption: "Contraste e profundidade",
    style: "Realismo",
  },
  {
    src: "/media/studio-portfolio-8.jpg",
    alt: "Tatuagem oriental colorida de máscara e flores no braço",
    caption: "Cor, presença e expressão",
    style: "Oriental",
  },
  {
    src: "/media/anna-portfolio-1.jpg",
    alt: "Duas carpas com linhas delicadas, uma preta e uma vermelha",
    caption: "Fluxo. Equilíbrio. Conexão.",
    style: "Traço fino",
  },
  {
    src: "/media/studio-portfolio-6.jpg",
    alt: "Tatuagem de composição ornamental preta no torso",
    caption: "Composição em preto",
  },
  {
    src: "/media/studio-portfolio-9.jpg",
    alt: "Outro ângulo da tatuagem oriental colorida no braço",
    caption: "Arte em cada ângulo",
    style: "Oriental",
  },
];
export const studioPhotos: Media[] = [
  {
    src: "/media/anna-studio.jpg",
    alt: "Anna tatuando junto à janela no estúdio Good Vibe",
  },
  {
    src: "/media/nico-studio.jpg",
    alt: "Nico concentrado durante uma sessão de tatuagem",
  },
];
export const videos: { src: string; poster: string; title: string }[] = [
  {
    src: "/media/bastidores-conversa.mp4",
    poster: "/media/studio-portfolio-4.jpg",
    title: "O artista — por dentro da Good Vibe",
  },
];
export const styles = [
  "Old school",
  "Geométrico",
  "Oriental",
  "Realismo",
  "Traço fino",
];
export const styleDescriptions = [
  "Personalidade e linguagem tradicional.",
  "Formas e composições estruturadas.",
  "Referências e composições da tatuagem oriental.",
  "Profundidade e riqueza de detalhes.",
  "Linhas delicadas e desenhos sutis.",
];
export const artists = [
  {
    id: "old-school",
    name: "Nico",
    specialty: "Old school & geométrico",
    description:
      "Tatuagens old school e geométricas: linguagem tradicional, formas e composições estruturadas.",
    photo: {
      src: "/media/nico-portfolio-1.jpg",
      alt: "Retrato de Nico trabalhando",
    } as Media | undefined,
  },
  {
    id: "franja",
    name: "Franja",
    specialty: "Oriental & realismo",
    description:
      "Tatuagens orientais e realistas: composições expressivas, profundidade e riqueza de detalhes.",
    photo: undefined as Media | undefined,
  },
  {
    id: "fine-line",
    name: "Anna",
    specialty: "Traço fino",
    description: "Tatuagens de traço fino: linhas delicadas e desenhos sutis.",
    photo: {
      src: "/media/anna-studio.jpg",
      alt: "Anna tatuando junto à janela",
    } as Media | undefined,
  },
  {
    id: "moreira",
    name: "Moreira",
    specialty: "Body piercing",
    description:
      "Aplicação de piercings: um detalhe para expressar o seu estilo.",
    photo: undefined as Media | undefined,
  },
];
