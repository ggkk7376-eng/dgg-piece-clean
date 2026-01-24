"use client";

import { createContext, use } from "react";
import { EnterAnimationBlur } from "@/components/animation/enter-animation";
import { Text as BaseText } from "@/components/text";
import type { Text as TextProps } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

export interface TextState {
  className?: string;
}

export const TextContext = createContext<TextState | undefined>(undefined);

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
          <div className="prose dark:prose-invert prose-strong:text-white max-w-none text-light-100 leading-relaxed text-center [&>p]:text-light-100 [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>strong]:text-white">
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
