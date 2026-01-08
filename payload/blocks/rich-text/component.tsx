import React, { use } from "react";
import { cn } from "@/lib/utils";
import { TextContext } from "../text/component";

interface RichTextProps {
    content?: string;
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
    const context = use(TextContext);

    if (!content) return null;

    // 1. Split by newlines to create paragraphs
    const paragraphs = content.split("\n\n");

    return (
        <div className={cn("rich-text w-full max-w-none text-center mx-auto", context?.className)}>
            {paragraphs.map((paragraph, i) => {
                // 2. Parse **bold** inside each paragraph
                // We split by "**" and make every odd index bold
                const parts = paragraph.split("**");

                return (
                    <p key={i} className="mb-4 text-inherit">
                        {parts.map((part, index) => {
                            // Even index = regular text, Odd index = bold text
                            if (index % 2 === 1) {
                                return <strong key={index} className="text-inherit font-bold">{part}</strong>;
                            }
                            // Handle single newlines within paragraph as <br/>
                            return (
                                <span key={index}>
                                    {part.split("\n").map((line, lineIndex, arr) => (
                                        <React.Fragment key={lineIndex}>
                                            {line}
                                            {lineIndex < arr.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </span>
                            );
                        })}
                    </p>
                )
            })}
        </div>
    );
};
