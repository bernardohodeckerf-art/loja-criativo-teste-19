# Good Vibe Tattoo Club

Site em React 19, TypeScript, Vite e Tailwind CSS 4. Estrutura compatível com componentes shadcn/ui; alias `@/` aponta para `src/`. Node 22.12+ (validado com Node 24.22.1), npm 11.

```sh
npm ci
npm run dev -- --port 5173 --strictPort
npm run build
npm run preview -- --port 4173 --strictPort
```

## Estrutura e conteúdo

- `src/data/site.ts`: endereço, links, profissionais, trabalhos, fotografias e vídeos. Nomes não confirmados permanecem vazios.
- `src/components/sections`: hero, portfólio e questionário.
- `src/components/ui`: modal nativo acessível, joia procedural e `ImageAutoSlider` (alias `Component`).
- `src/hooks/useReveal.ts`: observador compartilhado de entrada.
- `src/styles.css`: estilos mobile-first, breakpoints em 600/900/1440px.
- `public/media`: arquivos locais licenciados pelo estúdio.

## Mídias integradas e pendências

A referência visual foi acessada e examinada nesta revisão. A composição segue a fotografia escura, títulos grandes em caixa alta, navegação discreta e seções editoriais, adaptadas à identidade e ao conteúdo da Good Vibe.

Foram recuperadas imagens originais dos embeds públicos dos posts identificados nas capturas: Nico e Anna, trabalhos do perfil oficial e um MP4 real de bastidores. Os arquivos estão em `public/media` e não dependem de URLs temporárias do Instagram. Consulte `public/media/SOURCES.md` para procedência e associações confirmadas.

Integração atual: hero fotográfica, retratos de Nico e Anna, seis imagens na galeria e faixa contínua, duas fotos de processo no estúdio e vídeo de conversa com reprodução manual. Moreira e Franja têm nome, especialidade e orçamento funcionando, mas ainda faltam os arquivos dos retratos identificados na conversa. As imagens exibidas no chat não foram disponibilizadas como arquivos locais; não foram substituídas por pessoas genéricas. Também faltam fotos locais de piercing e eventual arquivo oficial da marca. Nenhum player usa miniatura no lugar de vídeo.

O nome da equipe está confirmado: Nico (old school e geométrico), Franja (oriental e realismo), Anna (traço fino) e Moreira (piercing). Não há preços, qualificações ou autoria de trabalhos inferidos. O arquivo de mídia de carpas veio do post de Anna; os trabalhos do perfil oficial não foram atribuídos individualmente.

Caminhos sugeridos (só configure após adicionar os arquivos):

- `/media/hero-desktop.webp`, `/media/hero-mobile.webp` — configure `site.hero` com `src`, `alt`, `srcSet` opcional.
- `/media/hero-desktop.mp4`, `/media/hero-mobile.mp4` — configure `site.heroVideo.desktop/mobile`. Use originais reais, exporte versões comprimidas; não amplie capturas para simular 4K.
- `/media/trabalho-01.webp` etc. — preencha `works` com `src`, `alt`, `caption` opcional e `style` somente quando confirmado. Use `srcSet` para variantes; `sizes` já está na galeria. Os estilos devem corresponder aos filtros.
- `/media/artista-old-school.webp`, `/media/franja.webp`, `/media/artista-traco-fino.webp`, `/media/moreira.webp` — preencha `artists[].photo`. Não atribua trabalhos sem confirmação.
- `/media/estudio-01.webp` — `studioPhotos`.
- `/media/bastidores-01.mp4` e `/media/bastidores-01-poster.webp` — `videos`: `src`, `poster`, `title`. Sem vídeo real, não há player nem botão falso.

Recorte capturas para conter somente a fotografia, mantendo rostos e trabalhos. Otimize WebP/AVIF com dimensões adequadas. Não use URLs temporárias do Instagram. Após integrar mídias, valide recortes mobile, lightbox, filtros, slider e vídeo com os arquivos reais.

## Parâmetros e acessibilidade

`ImageAutoSlider`: `images` (src/alt/caption), `speed` (segundos por ciclo, mínimo 5), `direction` (`left`/`right`), `pause` (exibe controle). Grupos repetidos têm espaçamento idêntico, cópia decorativa oculta e pausa por foco/hover; movimento reduzido produz galeria manual.

`[data-reveal="fade"]`: opacidade, 450 ms ease-out. `[data-reveal="slide"]`: deslocamento de 28 px, 600 ms, `data-direction="left"/"right"`. Um observador por montagem, limiar 20%, revelação única; blocos muito altos ou com controles permanecem visíveis. Conteúdo visível antes da inicialização e com movimento reduzido. Nenhum atraso é aplicado.

Modal usa `<dialog>` nativo para foco contido, Escape, fundo inerte e retorno de foco. Menu fecha ao navegar. Questionário preserva respostas ao voltar; CTAs selecionam serviço/profissional. Mensagem usa `encodeURIComponent` e abre WhatsApp com `noopener,noreferrer`; não envia dados automaticamente nem confirma agendamento. Não há upload: referências são enviadas na conversa.

Three.js carrega ao aproximar a joia da tela; renderização pausa fora da tela ou em aba oculta, recursos são liberados e SVG é fallback. Celular com ponteiro impreciso e movimento reduzido usam SVG. Three gera um chunk separado de aproximadamente 705 kB sem compressão, não incluído no carregamento inicial.

## Validação

Instalação reproduzível com `npm ci` e build TypeScript/Vite. Verificações de navegador documentadas na entrega. Testes com fotos/vídeos reais, qualidade de recortes e associação de trabalhos permanecem pendentes. A referência `https://guilhermy-rocha-tatt.vercel.app/` foi acessada com sucesso nesta revisão; o bloqueio da primeira configuração foi resolvido pela configuração atual de rede.

Validação nesta instância: Chromium em 360, 390, 768, 1024 e 1440 px sem overflow horizontal; fluxos de tatuagem, piercing e remoção, retorno sem perda de respostas, URL/mensagem WhatsApp interceptada sem envio, menu mobile, Escape, retorno de foco e movimento reduzido passaram sem erros JavaScript. Inspeção visual por capturas desktop/mobile. Não equivale a validação com dispositivos físicos ou mídias reais.

Na revisão visual, passaram também: carregamento de todas as fotografias locais, filtros da galeria (Traço fino / Todos), navegação do lightbox e retorno de foco, pausa do slider e reprodução do MP4 real (53,84 segundos, 720×1280). Largura adicional de 720 px verificada. Os outros vídeos não foram convertidos de miniaturas em supostos players.
