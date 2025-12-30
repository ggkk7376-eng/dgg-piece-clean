import { EnterAnimationBlurText } from "@/components/animation/enter-animation";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import type { Headline as HeadlineProps } from "@/payload-types";

export function Headline(props: HeadlineProps) {
  const { lines } = props;
  const color = (props as any).color || "default";

  return (
    <Text variant="headline" className="not-last:mb-0 [&_*]:!mb-0 text-center leading-tight">
      {lines.map((line, index) => (
        <span
          key={line.id}
          className={cn(
            "block",
            color === "white" && "text-white",
            color === "accent" && "text-accent",
            color === "default" && (index % 2 === 0 ? "text-accent" : "text-white"),
          )}
        >
          <EnterAnimationBlurText>{line.text}</EnterAnimationBlurText>
        </span>
      ))}
    </Text>
  );
}
