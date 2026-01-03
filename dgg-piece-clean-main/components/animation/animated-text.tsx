import * as m from "motion/react-m";
import { type ComponentPropsWithoutRef, Fragment } from "react";

import { cn } from "@/lib/utils";

function splitSpace(text: string) {
  return text.split(/\s/);
}

export function AnimatedText({
  children,
  className,
  split = splitSpace,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof m.span>, "children"> &
  Readonly<{ children: string; split?: (text: string) => string[] }>) {
  return (
    <>
      {split(children).map((segment, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Should be fine in combination with the word.
        <Fragment key={`${segment}:${index}`}>
          <m.span {...props} className={cn("inline-block", className)}>
            {segment}
          </m.span>{" "}
        </Fragment>
      ))}
    </>
  );
}
