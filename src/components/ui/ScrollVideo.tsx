import { useEffect, useRef, useState } from "react";

export function ScrollVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const frame = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const visible = new IntersectionObserver(([entry]) => {
      setPlaying(entry.isIntersecting && !motion.matches);
    }, { threshold: 0.35 });
    const update = () => {
      visible.disconnect();
      setPlaying(false);
      if (!motion.matches && frame.current) visible.observe(frame.current);
    };
    update();
    motion.addEventListener("change", update);
    return () => {
      visible.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <figure ref={frame} data-reveal="rise">
      <div className="scroll-video">
        <img src={poster} alt="" loading="lazy" />
        {playing && <video src={src} poster={poster} autoPlay muted loop playsInline aria-hidden="true" />}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
