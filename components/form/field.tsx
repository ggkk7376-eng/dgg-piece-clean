import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, createContext, use, useId } from "react";
import invariant from "tiny-invariant";

import { cn } from "@/lib/utils";

import { Label } from "../ui/label";

const FieldContext = createContext<{ id: string } | undefined>(undefined);

function useField() {
  const field = use(FieldContext);
  invariant(field, "useField must be used within a Field");
  return field;
}

export function Field({ className, ...props }: ComponentPropsWithRef<"div">) {
  const id = useId();

  return (
    <FieldContext.Provider value={{ id }}>
      <div {...props} className={cn("flex flex-col gap-2", className)} />
    </FieldContext.Provider>
  );
}

export function FieldLabel(props: ComponentPropsWithRef<typeof Label>) {
  const { id } = useField();
  return <Label htmlFor={id} {...props} />;
}

export function FieldControl(props: ComponentPropsWithRef<typeof Slot>) {
  const { id } = useField();
  return <Slot id={id} {...props} />;
}
