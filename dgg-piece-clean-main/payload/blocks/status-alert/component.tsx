import chroma from "chroma-js";

import { EnterAnimationBlur } from "@/components/animation/enter-animation";
import { Text } from "@/components/text";
import type { StatusAlert as StatusAlertProps } from "@/payload-types";

export function StatusAlert({ color, content }: StatusAlertProps) {
  return null; // Temporarily hidden per user request to move to footer later
  /*
  return (
    <EnterAnimationBlur>
      <div className="rounded-4xl bg-gradient-to-b from-[#262626] to-[rgba(35,35,35,0.2)] p-px">
        <div className="flex items-center gap-2 rounded-4xl bg-dark-600 px-4 py-2">
          <StatusAlertSignal color={color} />
  
          <Text variant="p3" className="text-[#afafaf]">
            {content}
          </Text>
        </div>
      </div>
    </EnterAnimationBlur>
    );
    */
}

function StatusAlertSignal({ color }: { color: string }) {
  return (
    <div
      className="animate-pulse rounded-full p-[5px]"
      style={{ backgroundColor: chroma(color).alpha(0.3).hex() }}
    >
      <div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
