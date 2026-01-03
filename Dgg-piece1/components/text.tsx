import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

const defaultVariant = "p1" as const;

const text = cva(null, {
  variants: {
    variant: {
      headline:
        "-tracking-[1px] not-last:mb-10 font-medium font-secondary text-4xl leading-tight",
      p1: "not-last:mb-5 font-normal font-primary text-base leading-relaxed tracking-normal",
      p2: "not-last:mb-5 font-normal font-primary text-base leading-5.5 tracking-normal",
      p3: "not-last:mb-5 font-normal font-sans text-sm leading-none tracking-normal",
    },
  },
  defaultVariants: {
    variant: defaultVariant,
  },
});

const componentByVariant = {
  headline: "h1",
  p1: "p",
  p2: "p",
  p3: "p",
} as const;

type ComponentByVariant = typeof componentByVariant;

export function Text({
  className,
  asChild,
  variant,
  ...props
}: ComponentPropsWithRef<ComponentByVariant[keyof ComponentByVariant]> &
  VariantProps<typeof text> &
  Readonly<{ asChild?: boolean }>) {
  const Comp = asChild ? Slot : componentByVariant[variant ?? defaultVariant];
  return <Comp {...props} className={cn(text({ variant, className }))} />;
}
