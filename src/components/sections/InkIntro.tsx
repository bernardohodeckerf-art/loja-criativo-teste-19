import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

/** A tinta acompanha a rolagem nativa; não captura wheel, touch ou teclado. */
export function InkIntro() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - innerHeight);
      const progress = motion.matches ? 0 : Math.min(1, Math.max(0, -bounds.top / distance));
      element.style.setProperty("--ink-scale", String(progress * 1.8));
      document.documentElement.toggleAttribute("data-ink-opening", bounds.bottom > 82 && bounds.top < innerHeight);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      document.documentElement.removeAttribute("data-ink-opening");
    };
  }, []);
  return <section ref={root} className="ink-intro" aria-label="Arte com atitude e alma">
    <div className="ink-stage">
      <svg className="ink-curtain" viewBox="0 0 1440 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H1440V460Q1410 490 1380 465V610C1380 655 1332 655 1332 610V490Q1300 455 1260 485V690C1260 746 1196 746 1196 690V475Q1160 440 1120 480V550C1120 590 1080 590 1080 550V490Q1040 445 1000 485V790C1000 850 940 850 940 790V490Q890 450 850 488V595C850 635 806 635 806 595V480Q765 445 720 485V675C720 735 658 735 658 675V485Q615 455 575 485V540C575 580 535 580 535 540V475Q490 445 450 485V740C450 800 390 800 390 740V475Q340 435 300 480V600C300 650 250 650 250 600V475Q210 445 170 480V660C170 715 112 715 112 660V475Q60 440 0 480Z"/>
      </svg>
      <div className="ink-content">
        <div className="ink-meta"><span>GOOD VIBE TATTOO CLUB</span><span>BLUMENAU / DESDE 2009</span></div>
        <div className="ink-center">
          <svg className="tattoo-flash flash-dagger" viewBox="0 0 160 360" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M80 15v38m-14-33h28l-6 46H72zM50 78q30-18 60 0l-8 15H58zM80 94v224l-29-59 14-165m15 224 29-59L95 94M64 130l31 30-33 32 38 35-42 31"/><path d="M28 120q-39 54 16 93m-14-71q25 3 25 34m-27-7q-20 13-5 31m111-1q32 40-13 77m15-47q-28-1-29 29"/><path d="m121 24 4 11 11 4-11 4-4 11-4-11-11-4 11-4zM23 287l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>
          </svg>
          <div className="ink-copy"><p className="ink-kicker">UMA IDEIA. UM TRAÇO. ALGO SEU.</p><p className="ink-title">DA IDEIA.<br/><span>À PELE.</span></p><p className="ink-signature">Arte com atitude e alma.</p></div>
          <svg className="tattoo-flash flash-rose" viewBox="0 0 240 320" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M120 137c-39 14-65-21-48-47-9-35 24-58 49-39 30-21 64 6 54 36 23 24 2 62-34 54-13 15-31 11-38-5M121 65c-29-9-45 23-20 37 8 25 40 23 47 2 24-17 4-44-16-32-14-8-29 4-21 19 14-7 29 8 19 21M72 90l29 12m47 2 27-17m-54-36 11 21m-29 64 17-22M121 150q-10 69 7 137M120 192q-45-61-78-30 9 50 79 59m-4-25-58-25m64 65q39-59 74-32-4 46-72 59m55-48-55 31M153 161l8 4-9 12M102 244l-9 4 12 9M29 79l4 12 12 4-12 4-4 12-4-12-12-4 12-4M198 111v24m-12-12h24"/></g>
          </svg>
        </div>
        <div className="ink-bottom"><span className="ink-scroll"><ArrowDown size={17}/> ROLE PARA DEIXAR SUA MARCA</span><a href="#abertura">Ir direto ao site <ArrowUpRight size={15}/></a></div>
      </div>
    </div>
  </section>;
}
