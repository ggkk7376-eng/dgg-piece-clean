"use client";

import { useField, useLocale } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { useId } from "react";
import { HexColorPicker } from "react-colorful";

const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const id = useId();
  const { value, setValue } = useField<string>({ path });

  const locale = useLocale();
  const label =
    typeof field.label === "string"
      ? field.label
      : typeof field.label === "object"
        ? field.label[locale.code ?? "pl"]
        : undefined;

  return (
    <div className="field-type color">
      <label htmlFor={id} className="field-label">
        {label ?? field.name}
        {field.required && <span className="required">*</span>}
      </label>
      <div className="field-type__wrap">
        <HexColorPicker id={id} color={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default ColorField;
