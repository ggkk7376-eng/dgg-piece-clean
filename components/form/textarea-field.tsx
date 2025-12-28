import { Textarea } from "../ui/textarea";
import { Field, FieldControl, FieldLabel } from "./field";

export function TextareaField({ label }: Readonly<{ label?: string }>) {
  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <FieldControl>
        <Textarea />
      </FieldControl>
    </Field>
  );
}
