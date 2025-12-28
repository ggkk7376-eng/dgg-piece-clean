"use client";

import { ModalAction, ModalClose } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/lib/form";

export function ContactForm({ initialMessage }: { initialMessage?: string }) {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      message: initialMessage || "",
    },
  });

  return (
    <form.Form
      onSubmit={async (e) => {
        e.preventDefault();
        await form.handleSubmit();
      }}
    >
      <form.AppField name="name">
        {(field) => <field.Text label="Imię" />}
      </form.AppField>

      <form.AppField name="email">
        {(field) => <field.Text label="Email" type="email" />}
      </form.AppField>

      <form.AppField name="message">
        {(field) => <field.Textarea label="Wiadomość" />}
      </form.AppField>

      <ModalClose asChild>
        <Button variant="outline">Anuluj</Button>
      </ModalClose>

      <ModalAction>
        <Button type="submit">Wyślij</Button>
      </ModalAction>
    </form.Form>
  );
}
