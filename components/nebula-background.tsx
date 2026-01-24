import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export function NebulaBackground({
  className,
  children,
  asChild,
  ...props
}: ComponentPropsWithRef<"div"> & Readonly<{ asChild?: boolean }>) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp {...props} className={cn("relative", className)}>
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        {/* Removed Nebula blobs to keep background photo clean */}
        {/* <div className="absolute top-[calc(49%-244px)] left-[calc(27%-147px)] h-[488px] w-[293px] rounded-[50%] bg-light-200 opacity-40 blur-sm" /> */}
        {/* <div className="absolute top-[calc(52%-143px)] left-[calc(52%-339px)] h-[286px] w-[677px] rounded-[50%] bg-accent opacity-40 blur-sm" /> */}
        {/* <div className="-rotate-[70deg] absolute top-[calc(47%-75px)] left-[calc(79%-226px)] h-[150px] w-[451px] rounded-[50%] bg-light-200 opacity-40 blur-sm" /> */}
        <div className="absolute h-full w-full bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:9px_9px]" />
      </div>
      {/* Removed opaque gradient to allow Global/Section BG to show */}
      {/* <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[#01010100] to-dark-600" /> */}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
