"use client";

import { createContext, use } from "react";
import { EnterAnimationBlur } from "@/components/animation/enter-animation";
import { Text as BaseText } from "@/components/text";
import type { Text as TextProps } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

export interface TextState {
  className?: string;
}

const TextContext = createContext<TextState | undefined>(undefined);

export function TextProvider({
  children,
  ...value
}: Readonly<{ children: React.ReactNode }> & Readonly<TextState>) {
  return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
}

export function Text({ text, variant }: TextProps) {
  const context = use(TextContext);

  return (
    <BaseText variant={variant} className={context?.className} asChild>
      <div>
        <EnterAnimationBlur>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center">
            {text ? (
              typeof text === 'string' ? (
                <p>{text}</p>
              ) : (
                <RichText data={text as any} />
              )
            ) : (
              ""
            )}
          </div>
        </EnterAnimationBlur>
      </div>
    </BaseText>
  );
}
