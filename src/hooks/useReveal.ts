import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const pending = new Set<HTMLElement>();
    const observed = new WeakSet<HTMLElement>();
    const show = (element: HTMLElement) => {
      element.classList.remove("reveal-pending");
      observer.unobserve(element);
      pending.delete(element);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      }
    }, { rootMargin: "0px 0px -5% 0px" });

    const watch = (element: HTMLElement) => {
      if (motion.matches || observed.has(element)) return;
      observed.add(element);
      if (element.matches(":focus-within")) return;
      const { top, bottom } = element.getBoundingClientRect();
      if (top < innerHeight && bottom > 0) return;
      pending.add(element);
      element.classList.add("reveal-pending");
      observer.observe(element);
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);
    };
    const changes = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]")) watch(node);
          scan(node);
        }
      }
      for (const element of pending) {
        if (!element.isConnected) show(element);
      }
    });

    const revealFocus = (event: FocusEvent) => {
      let element = event.target instanceof Element ? event.target : null;
      while (element) {
        if (element instanceof HTMLElement && pending.has(element)) show(element);
        element = element.parentElement;
      }
    };
    const updateMotion = () => {
      if (motion.matches) pending.forEach(show);
      else scan(document);
    };

    scan(document);
    changes.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("focusin", revealFocus);
    motion.addEventListener("change", updateMotion);
    return () => {
      changes.disconnect();
      observer.disconnect();
      pending.forEach(show);
      document.removeEventListener("focusin", revealFocus);
      motion.removeEventListener("change", updateMotion);
    };
  }, []);
}
