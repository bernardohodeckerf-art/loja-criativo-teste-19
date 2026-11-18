import type { Media } from "./site";
import { annaWorks, doniWorks, franjaPortrait, franjaWorks, moreiraPortrait, moreiraWorks, nicoWorks } from "./team-media";

export type ArtistProfile = {
  name: string;
  path: string;
  role: string;
  experience: string;
  specialties?: string;
  biography: string[];
  portrait?: Media;
  works?: Media[];
  galleryTitle?: string;
  highlights?: string[];
};

export const artistProfiles: Record<string, ArtistProfile> = {
  doni: {
    name: "Doni",
    path: "/equipe/doni",
    role: "Tatuador",
    experience: "Tatuador desde 2018",
    works: doniWorks,
    specialties: "Lettering, Blackwork, Fine Line e projetos sob medida.",
    biography: [
      "Me chamo Doni, tatuador desde 2018 e meus trabalhos giram em torno de Lettering, Blackwork, Fineline e projetos sob medida. Meu foco é criar tatuagens com identidade, bom acabamento e feitas com calma para entregar meu melhor.",
    ],
  },
  "old-school": {
    name: "Nico",
    path: "/equipe/nico",
    role: "Tatuador e artista",
    experience: "Aprendiz desde 2017. Tatuador desde 2019.",
    specialties: "Blackwork, geométricos, pontilhismo, florais, Fine Line, escritas, tribais e trabalhos tradicionais.",
    works: nicoWorks,
    portrait: { src: "/media/nico-portfolio-1.jpg", alt: "Nico trabalhando no estúdio", width: 1290, height: 1720 },
    biography: [
      "Sou natural de Blumenau e minha história com a tatuagem começou nos anos 2000, quando fiz minha primeira tatuagem. Vieram muitas outras, até que a tatuagem passou a fazer parte também do meu caminho profissional. Conheci o Good Vibe em 2014, entrei como gerente em 2015 e, em 2017, me tornei aprendiz do Franja. Em 2019, comecei tatuando amigos e depois passei a atender os clientes do estúdio — um marco pra mim.",
      "Hoje, trabalho com blackwork, geométricos, pontilhismo, florais e fine line, além de escritas, tribais e trabalhos tradicionais, em cores ou preto e cinza.",
      "Desde 2025, também me dedico à pintura em tela e, em 2026, comecei a pintar peças de gesso. A arte ocupa cada vez mais espaço na minha vida, e essa experiência acompanha meu olhar em cada novo trabalho.",
      "Busco criar tatuagens exclusivas a partir das ideias e histórias de quem chega até mim, respeitando também a história da tatuagem. Meu cuidado vai além do desenho: penso no encaixe, nas proporções e em como a composição acompanha o corpo, com conceito e atenção à durabilidade.",
    ],
  },
  "fine-line": {
    name: "Anna Luiza",
    path: "/equipe/anna-luiza",
    role: "Tatuadora e artista",
    experience: "Tatuadora desde 2015",
    specialties: "Blackwork, Fine Line, floral, ornamental indiano e geometria.",
    portrait: { src: "/media/anna-studio.jpg", alt: "Anna Luiza tatuando junto à janela do estúdio", width: 1440, height: 1920 },
    works: annaWorks,
    biography: [
      "Sou Anna Luiza, tatuadora desde 2015 e apaixonada pela arte em suas diferentes formas. Meu trabalho é voltado principalmente aos estilos blackwork, fine line, floral, ornamental indiano e geometria.",
      "Além da tatuagem, também me dedico à pintura, explorando novas formas de expressão e criatividade.",
      "Busco criar trabalhos únicos, combinando delicadeza, precisão e personalidade, transformando ideias e histórias em arte na pele.",
    ],
  },
  franja: {
    name: "Franja Tattoo",
    path: "/equipe/franja-tattoo",
    role: "Tatuador e artista visual",
    experience: "Mais de 23 anos de experiência",
    specialties: "Realismo, oriental, reformas e coberturas.",
    portrait: franjaPortrait,
    works: franjaWorks,
    highlights: ["Mais de 50 prêmios", "Best of Show · Veneza, 2017", "Best of Color · Xangai, 2018", "Portugal, Dinamarca, Holanda e Alemanha"],
    biography: [
      "Sou Reinaldo Sebastião da Silva, conhecido como Franja Tattoo, tatuador e artista visual com mais de 23 anos de experiência. Minha trajetória inclui trabalhos em estúdios de Portugal, Dinamarca, Holanda e Alemanha, experiências que ampliaram meu olhar artístico e minha técnica.",
      "Ao longo dessa caminhada, conquistei mais de 50 prêmios, entre eles o Best of Show em Veneza, em 2017, e o Best of Color em Xangai, em 2018. Tenho experiência em diferentes estilos, com destaque para realismo, oriental e projetos de reforma e cobertura.",
      "Transformo ideias e histórias em projetos personalizados, unindo técnica, sensibilidade artística e respeito à identidade de cada cliente.",
    ],
  },
  moreira: {
    name: "Rodrigo Moreira",
    path: "/equipe/rodrigo-moreira",
    role: "Body Piercer e Especialista em Remoção de Tatuagens a Laser",
    experience: "24 anos de piercing e 18 anos de remoção a laser",
    portrait: moreiraPortrait,
    works: moreiraWorks,
    galleryTitle: "Portfólio de piercings",
    biography: [
      "Sou Rodrigo Moreira, profissional da área de body piercing há 24 anos e especializado em remoção de tatuagens a laser há 18 anos.",
      "Durante todos esses anos, tive a oportunidade de conhecer muitas pessoas, fazer amigos, acompanhar histórias e conquistar uma experiência que só o tempo e a prática podem proporcionar.",
      "Meu compromisso é oferecer um atendimento personalizado, prezando pela segurança, qualidade, responsabilidade e excelência em cada procedimento.",
      "Acredito na importância de proporcionar uma experiência de confiança, cuidado e satisfação, valorizando a individualidade e as escolhas de cada cliente.",
      "São 24 anos de história, experiência e dedicação pelo que faço!",
    ],
  },
};
