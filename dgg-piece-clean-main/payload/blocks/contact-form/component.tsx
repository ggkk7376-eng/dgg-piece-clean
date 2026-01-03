"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/lib/form";
import { toast } from "sonner";
import { useState } from "react";

export function ContactForm({ initialMessage, subject }: { initialMessage?: string, subject?: string } & Record<string, any>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      message: initialMessage || "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...value, subject }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to send message");
        }

        toast.success("Wiadomość została wysłana!", {
          description: "Dziękujemy za kontakt. Odpiszemy najszybciej jak to możliwe.",
        });

        form.reset();

      } catch (error) {
        console.error(error);
        toast.error("Błąd wysyłania wiadomości", {
          description: error instanceof Error ? error.message : "Spróbuj ponownie później.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form.Form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <form.AppField name="name" validators={{
        onChange: ({ value }) => {
          return !value ? "Imię jest wymagane" : undefined;
        },
      }}>
        {(field) => <field.Text label="Imię" />}
      </form.AppField>

      <form.AppField name="email" validators={{
        onChange: ({ value }) => {
          return !value ? "Email jest wymagany" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Niepoprawny format email" : undefined;
        },
      }}>
        {(field) => <field.Text label="Email" type="email" />}
      </form.AppField>

      <form.AppField name="message" validators={{
        onChange: ({ value }) => {
          return !value ? "Wiadomość jest wymagana" : undefined;
        },
      }}>
        {(field) => <field.Textarea label="Wiadomość" />}
      </form.AppField>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" type="button" disabled={isSubmitting}>Anuluj</Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wysyłanie..." : "Wyślij"}
        </Button>
      </div>
    </form.Form>
  );
}

