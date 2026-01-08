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
          id={slug?.toLowerCase() ?? undefined}
          className={cn(
            "flex w-full flex-col gap-6 px-5 py-6 md:py-10 first-of-type:pt-20 md:first-of-type:pt-24",
            className,
          )}
        >
          <div className="relative flex flex-col items-center gap-6">
            <TextProvider className="text-light-300">
              {children?.map((child: any) => (
                <Block {...child} key={child.id} />
              ))}
            </TextProvider>
          </div>
        </section>
      </EnterAnimation>
    </NebulaBackground>
  );
}
