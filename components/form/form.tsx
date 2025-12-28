import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export function Form({ className, ...props }: ComponentPropsWithRef<"form">) {
  return <form {...props} className={cn("flex flex-col gap-3", className)} />;
}
