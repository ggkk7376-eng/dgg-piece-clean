import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";

import External from "@/assets/icons/external.svg";
import { cn } from "@/lib/utils";

import { Flipper, FlipperContent } from "./animation/flipper";
import { Text } from "./text";

export function ActionButton({
  className,
  children,
  asChild,
  ...props
}: ComponentPropsWithRef<"button"> & Readonly<{ asChild?: boolean }>) {
  const Comp = asChild ? Slot : "button";

  return (
    <Flipper
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#212121] bg-[radial-gradient(66%_93%_at_48%_0%,#262626_0%,var(--color-dark-600)_76%)] px-7 py-4",
        className,
      )}
      asChild
    >
      <Text variant="p2" asChild>
        <Comp {...props}>
          <Slottable>{children}</Slottable>
          <FlipperContent className="h-6 w-6" itemClassName="h-5 w-5 rotate-90">
            <External />
          </FlipperContent>
        </Comp>
      </Text>
    </Flipper>
  );
}
