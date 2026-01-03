"use client";

import { stagger, type Variants } from "motion";
import type { ComponentPropsWithoutRef } from "react";

import { AnimatedText } from "./animated-text";
import { MSlot } from "./m-slot";

export const HIDDEN = "hidden";

export const VISIBLE = "visible";

const ENTER_ANIMATION_BLUR_VARIANTS = {
  [HIDDEN]: { filter: "blur(10px)", opacity: 0, y: 10 },
  [VISIBLE]: { filter: "blur(0)", opacity: 1, y: 0 },
};

export function EnterAnimation({
  transition,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof MSlot>, "initial" | "animate">) {
  return (
    <MSlot
      {...props}
      initial={HIDDEN}
      animate={VISIBLE}
      transition={{ delayChildren: stagger(0.03), ...transition }}
    />
  );
}

export function EnterAnimationBlur({
  transition,
  variants,
  ...props
}: ComponentPropsWithoutRef<typeof MSlot>) {
  return (
    <MSlot
      {...props}
      variants={mergeVariants(ENTER_ANIMATION_BLUR_VARIANTS, variants)}
      transition={{
        duration: 0.7,
        bounce: 0,
        ...transition,
      }}
    />
  );
}

export function EnterAnimationBlurText({
  variants,
  transition,
  ...props
}: ComponentPropsWithoutRef<typeof AnimatedText>) {
  return (
    <AnimatedText
      {...props}
      variants={mergeVariants(ENTER_ANIMATION_BLUR_VARIANTS, variants)}
      transition={{ duration: 0.7, bounce: 0, ...transition }}
    />
  );
}

function mergeVariants(...variants: (Variants | undefined)[]) {
  return variants
    .filter((variants) => variants !== undefined)
    .reduce((acc, variant) => {
      for (const [key, value] of Object.entries(variant)) {
        acc[key] = { ...acc[key], ...value };
      }
      return acc;
    });
}
