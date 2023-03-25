import { useRef, useEffect } from "react";

export function useScroll() {
  const elRef = useRef<any | null>();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: any) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY + 10,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
