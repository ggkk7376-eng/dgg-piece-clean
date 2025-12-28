import { EnterAnimation } from "@/components/animation/enter-animation";
import { Block } from "@/components/block";
import { NebulaBackground } from "@/components/nebula-background";
import { cn } from "@/lib/utils";
import type { Section as SectionProps } from "@/payload-types";

import { TextProvider } from "../text/component";

export function Section({
  slug,
  children,
  className,
}: SectionProps & Readonly<{ className?: string }>) {
  return (
    <NebulaBackground>
      <EnterAnimation>
        <section
          id={slug ?? undefined}
          className={cn(
            "flex min-h-[70vh] flex-col gap-10 px-5 pt-36 pb-11",
            className,
          )}
        >
          <div className="relative flex flex-col items-center gap-6">
            <TextProvider className="text-light-300">
              {children?.map((child) => (
                <Block {...child} key={child.id} />
              ))}
            </TextProvider>
          </div>
        </section>
      </EnterAnimation>
    </NebulaBackground>
  );
}
