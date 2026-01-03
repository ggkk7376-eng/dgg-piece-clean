import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import invariant from "tiny-invariant";

import { cn } from "@/lib/utils";

export function Flipper({
  asChild,
  className,
  ...props
}: ComponentPropsWithRef<"div"> & Readonly<{ asChild?: boolean }>) {
  const Comp = asChild ? Slot : "div";
  return <Comp {...props} className={cn("group", className)} />;
}

export function FlipperContent({
  className,
  itemClassName,
  children,
  ...props
}: ComponentPropsWithRef<"span"> &
  Readonly<{ className: string; itemClassName?: string }>) {
  const classList = className.split(" ");

  const hasWidthClass = classList.some((c) => c.startsWith("w-"));
  invariant(hasWidthClass, "FlipperContent must have a width class");

  const hasHeightClass = classList.some((c) => c.startsWith("h-"));
  invariant(hasHeightClass, "FlipperContent must have a height class");

  return (
    <span {...props} className={cn("relative overflow-hidden", className)}>
      <Slot
        className={cn(
          "-translate-1/2 group-hover:translate-1/2 absolute top-1/2 left-1/2 transition-all duration-300 ease-in-out",
          itemClassName,
        )}
      >
        {children}
      </Slot>
      <Slot
        className={cn(
          "-translate-3/2 group-hover:-translate-1/2 absolute top-1/2 left-1/2 transition-all duration-300 ease-in-out",
          itemClassName,
        )}
      >
        {children}
      </Slot>
    </span>
  );
}
