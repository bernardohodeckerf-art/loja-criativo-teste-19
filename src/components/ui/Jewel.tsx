import { useEffect, useRef } from "react";
export default function Jewel() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current!;
    if (
      matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches ||
      !("IntersectionObserver" in window)
    )
      return;
    let disposed = false;
    let cleanup = () => {};
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      void import("three")
        .then((T) => {
          if (disposed) return;
          let renderer: InstanceType<typeof T.WebGLRenderer>;
          try {
            renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
          } catch {
            return;
          }
          renderer.setSize(260, 260);
          renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
          host.append(renderer.domElement);
          host.classList.add("rendered");
          const scene = new T.Scene();
          const camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
          camera.position.z = 6;
          const group = new T.Group();
          const material = new T.MeshStandardMaterial({
            color: 0xd4d1c9,
            metalness: 1,
            roughness: 0.23,
          });
          const ring = new T.Mesh(
            new T.TorusGeometry(1, 0.095, 20, 70, Math.PI * 1.72),
            material,
          );
          group.add(ring);
          const sphereGeometry = new T.SphereGeometry(0.17, 24, 24);
          [0, Math.PI * 1.72].forEach((angle) => {
            const ball = new T.Mesh(sphereGeometry, material);
            ball.position.set(Math.cos(angle), Math.sin(angle), 0);
            group.add(ball);
          });
          scene.add(group);
          scene.add(new T.HemisphereLight(0xffffff, 0x242424, 3));
          const light = new T.DirectionalLight(0xffffff, 6);
          light.position.set(3, 4, 5);
          scene.add(light);
          let visible = true;
          let frame = 0;
          const visibility = new IntersectionObserver((es) => {
            visible = es[0].isIntersecting;
          });
          visibility.observe(host);
          const move = (e: PointerEvent) => {
            const r = host.getBoundingClientRect();
            group.rotation.x = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
          };
          host.addEventListener("pointermove", move);
          const tick = () => {
            frame = requestAnimationFrame(tick);
            if (visible && !document.hidden) {
              group.rotation.y += 0.003;
              renderer.render(scene, camera);
            }
          };
          tick();
          cleanup = () => {
            cancelAnimationFrame(frame);
            visibility.disconnect();
            host.removeEventListener("pointermove", move);
            ring.geometry.dispose();
            sphereGeometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
            host.classList.remove("rendered");
          };
        })
        .catch(() => {});
    });
    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup();
    };
  }, []);
  return (
    <div ref={ref} className="jewel" aria-hidden="true">
      <svg viewBox="0 0 260 260">
        <defs>
          <linearGradient id="silver">
            <stop stopColor="#555" />
            <stop offset=".4" stopColor="#eee" />
            <stop offset=".6" stopColor="#777" />
            <stop offset="1" stopColor="#ddd" />
          </linearGradient>
        </defs>
        <path
          d="M185 180a80 80 0 1 1 22-54"
          fill="none"
          stroke="url(#silver)"
          strokeWidth="10"
        />
        <circle cx="185" cy="180" r="12" fill="url(#silver)" />
        <circle cx="207" cy="126" r="12" fill="url(#silver)" />
      </svg>
    </div>
  );
}
