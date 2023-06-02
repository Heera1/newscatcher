import { useEffect, useState } from "react";
import { UseIOProps } from "./typeCollection";

const useIntersectionObserver = ({
  root,
  rootMargin,
  threshold,
  onIntersect,
}: UseIOProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold: 0,
    });
    // 관찰자 시작
    observer.observe(target);

    // 관찰 종료
    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
  //target을 변경할 수 있도록 setTarget을 넘겨줌;
};

export default useIntersectionObserver;
