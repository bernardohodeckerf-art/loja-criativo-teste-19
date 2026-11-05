import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import type { Media } from "@/data/site";
export function ImageAutoSlider({
  images,
  speed = 45,
  direction = "left",
  pause = true,
}: {
  images: Media[];
  speed?: number;
  direction?: "left" | "right";
  pause?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  if (!images.length) return null;
  return (
    <div
      className={`slider ${paused ? "paused" : ""}`}
      style={
        {
          "--duration": `${Math.max(5, speed)}s`,
          "--direction": direction === "left" ? "normal" : "reverse",
        } as CSSProperties
      }
    >
      <div className="slider-track">
        {[0, 1].map((group) => (
          <div
            className="slider-group"
            key={group}
            aria-hidden={group === 1 || undefined}
          >
            {images.map((m, i) => (
              <figure key={i}>
                <img
                  src={m.src}
                  alt={group ? "" : m.alt}
                  loading="lazy"
                  width="420"
                  height="480"
                />
                {m.caption && <figcaption>{m.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ))}
      </div>
      {pause && (
        <button
          className="slider-pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Retomar imagens" : "Pausar imagens"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </div>
  );
}
export const Component = ImageAutoSlider;
