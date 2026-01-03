"use client";

import { useAnimate } from "motion/react";
import { type ComponentPropsWithRef, useEffect } from "react";

import LogoSvg from "@/assets/logo.svg";
import { mergeRefs } from "@/lib/utils";

export function AppLogo({
  ref,
  ...props
}: ComponentPropsWithRef<typeof LogoSvg>) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "path:nth-of-type(2)",
      { opacity: [0, 1] },
      {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        times: [0, 0.25],
        ease: "easeOut",
      },
    );
  }, [animate]);

  return <LogoSvg {...props} ref={mergeRefs(ref, scope)} />;
}
