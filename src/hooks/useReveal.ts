import { useEffect } from "react";
export function useReveal() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let observer: IntersectionObserver | undefined;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const show = (el: HTMLElement) => {
      el.classList.remove("reveal-pending");
      observer?.unobserve(el);
    };
    const focus = (e: FocusEvent) => {
      nodes.forEach((el) => {
        if (el.contains(e.target as Node)) show(el);
      });
    };
    try {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) show(e.target as HTMLElement);
          }),
        { threshold: 0.2 },
      );
      nodes.forEach((el) => {
        if (
          el.querySelector("button,a,input,select,textarea") ||
          el.offsetHeight > innerHeight * 0.8
        )
          return;
        observer!.observe(el);
        el.classList.add("reveal-pending");
      });
      document.addEventListener("focusin", focus);
    } catch {
      nodes.forEach(show);
    }
    return () => {
      observer?.disconnect();
      nodes.forEach(show);
      document.removeEventListener("focusin", focus);
    };
  }, []);
}
