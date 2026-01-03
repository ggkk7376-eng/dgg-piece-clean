import { EnterAnimationBlurText } from "@/components/animation/enter-animation";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import type { Headline as HeadlineProps } from "@/payload-types";

export function Headline({ lines }: HeadlineProps) {
  return (
    <Text variant="headline" className="not-last:mb-0 text-center">
      {lines.map((line, index) => (
        <span
          key={line.id}
          className={cn(
            "block",
            line.text.includes("Tworzone z pasją") ? "text-white" : (index % 2 === 0 ? "text-primary-500" : "text-white"),
          )}
        >
          <EnterAnimationBlurText>{line.text}</EnterAnimationBlurText>
        </span>
      ))}
    </Text>
  );
}
