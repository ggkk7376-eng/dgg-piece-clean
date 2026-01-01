import { useFieldContext } from "@/lib/form";
import { Textarea } from "../ui/textarea";
import { Field, FieldControl, FieldLabel } from "./field";

export function TextareaField({ label }: Readonly<{ label?: string }>) {
  const field = useFieldContext<string>();

  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <FieldControl>
        <Textarea
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </FieldControl>
    </Field>
  );
}
