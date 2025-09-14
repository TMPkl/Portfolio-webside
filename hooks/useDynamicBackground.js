import { useEffect } from "react";

export default function useDynamicBackground(backgroundRef) {
  useEffect(() => {
    function onScroll() {
      const maxScroll =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;
      const y = Math.min(window.scrollY, maxScroll);

      const r = Math.round(44 + (69 - 44) * (y / maxScroll));
      const g = Math.round(44 + (87 - 44) * (y / maxScroll));
      const b = 107;
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage =
          `linear-gradient(to left top, rgb(${r},${g},${b}), #000000ff)`;
      }
    }
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [backgroundRef]);
}