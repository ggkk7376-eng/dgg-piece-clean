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
          <div className="payload-lexical-content flex flex-col gap-4 max-w-4xl mx-auto leading-relaxed text-center text-light-100 [&_*]:!text-white [&_*]:!opacity-100">
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
