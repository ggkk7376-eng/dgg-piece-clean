import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Form } from "@/components/form/form";
import { TextField } from "@/components/form/text-field";
import { TextareaField } from "@/components/form/textarea-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  formContext,
  fieldContext,
  fieldComponents: {
    Text: TextField,
    Textarea: TextareaField,
  },
  formComponents: {
    Form,
  },
});
