import { useEffect, useRef } from "react";

export function ScrollVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = player.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData: boolean } }).connection;
    let inView = false;
    const play = () => {
      if (!inView || !video.paused || video.error) return;
      video.muted = true;
      void video.play().catch(() => {
        // Keep the poster visible when the browser blocks playback.
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.35;
      if (inView) play();
      else video.pause();
    }, { threshold: 0.35 });
    const update = () => {
      observer.disconnect();
      inView = false;
      if (motion.matches || connection?.saveData) video.pause();
      else observer.observe(video);
    };
    update();
    motion.addEventListener("change", update);
    window.addEventListener("touchend", play, { passive: true });
    window.addEventListener("click", play);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      window.removeEventListener("touchend", play);
      window.removeEventListener("click", play);
    };
  }, []);

  return (
    <figure data-reveal="rise">
      <div className="scroll-video">
        <video ref={player} src={src} poster={poster} preload="none" muted loop playsInline aria-hidden="true" />
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
