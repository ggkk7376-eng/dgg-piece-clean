import { useFieldContext } from "@/lib/form";

import { Input } from "../ui/input";
import { Field, FieldControl, FieldLabel } from "./field";

export function TextField({
  label,
  type,
}: Readonly<{ label?: string; type?: "text" | "email" }>) {
  const field = useFieldContext<string>();

  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <FieldControl>
        <Input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </FieldControl>
      {field.state.meta.errors ? (
        <div className="text-red-500 text-sm">
          {field.state.meta.errors.map((error, i) => (
            <div key={i}>{String(error)}</div>
          ))}
        </div>
      ) : null}
    </Field>
  );
}
