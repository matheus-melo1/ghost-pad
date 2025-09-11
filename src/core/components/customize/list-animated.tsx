"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";

interface IListAnimatedProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ListAnimated({
  children,
  className,
}: IListAnimatedProps) {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className={className}>
      {children}
    </div>
  );
}
