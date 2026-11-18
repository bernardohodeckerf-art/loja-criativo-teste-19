import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { site } from "@/data/site";

const links = [
  ["Início", "/"],
  ["Tatuagens", "/tatuagens"],
  ["Piercings", "/piercings"],
  ["Micropigmentação", "/micropigmentacao"],
  ["Tatuagem Paramédica", "/tatuagem-paramedica"],
  ["Remoção a Laser", "/remocao-a-laser"],
  ["Nossa Equipe", "/equipe"],
  ["O Estúdio", "/estudio"],
  ["Contato", "/contato"],
];

export function SiteHeader({ solid = true, book }: { solid?: boolean; book?: () => void }) {
  const [menu, setMenu] = useState(false);
  const pathname = location.pathname.replace(/\/$/, "") || "/";
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <header className={solid ? "scrolled" : ""}>
        <a className="wordmark" href="/" aria-label="Good Vibe início">
          GOOD VIBE<span>TATTOO CLUB</span>
        </a>
        <nav className="desktop-nav" aria-label="Principal">
          {links.map(([label, href]) => <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}
        </nav>
        {book ? <button className="header-book" onClick={book}>Agendar <ArrowUpRight size={16} /></button>
          : <a className="header-book" href={site.whatsapp} target="_blank" rel="noopener noreferrer">Agendar <ArrowUpRight size={16} /></a>}
        <button className="icon menu-toggle" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu /></button>
      </header>
      {menu && <Modal title="Navegação" onClose={() => setMenu(false)}>
        <nav className="mobile-nav" aria-label="Principal">
          {links.map(([label, href]) => <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}<ArrowUpRight /></a>)}
        </nav>
      </Modal>}
    </>
  );
}
