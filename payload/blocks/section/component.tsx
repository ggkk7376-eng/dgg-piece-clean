import { EnterAnimation } from "@/components/animation/enter-animation";
import { Block } from "@/components/block";
import { NebulaBackground } from "@/components/nebula-background";
import { cn } from "@/lib/utils";
import type { Section as SectionProps } from "@/payload-types";
import Image from "next/image";

import { TextProvider } from "../text/component";

export function Section({
  slug,
  children,
  className,
  backgroundImage,
  enableOverlay,
  priority,
}: SectionProps & Readonly<{ className?: string; priority?: boolean }>) {
  return (
    <NebulaBackground>
      <EnterAnimation>
        <section
          id={slug?.toLowerCase() ?? undefined}
          className={cn(
            "flex w-full flex-col gap-4 px-5 py-2 md:py-6 first-of-type:pt-28 md:first-of-type:pt-32",
            className,
          )}
        >

          {/* Section Background Image */}
          {backgroundImage && typeof backgroundImage === 'object' && (backgroundImage as any).url && (
            <div
              className="absolute inset-0 z-[-1] overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
              }}
            >
              <Image
                src={(backgroundImage as any).url}
                alt={(backgroundImage as any).alt || "Section Background"}
                fill
                priority={priority}
                className="object-cover opacity-60"
                sizes="100vw"
                quality={60}
              />
              {(enableOverlay ?? true) && (
                <div className="absolute inset-0 bg-black/60" />
              )}
            </div>
          )}

          <div className="relative flex flex-col items-center gap-4">
            <TextProvider className="text-light-100">
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
