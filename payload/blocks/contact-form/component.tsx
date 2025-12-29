"use client";

import { ModalAction, ModalClose } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/lib/form";
import { toast } from "sonner";
import { useState } from "react";

export function ContactForm({ initialMessage }: { initialMessage?: string } & Record<string, any>) {
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
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to send message");
        }

        toast.success("Wiadomość została wysłana!", {
          description: "Dziękujemy za kontakt. Odpiszemy najszybciej jak to możliwe.",
        });

        // Optional: Close modal if this is inside one, but we don't have direct control here easily without context
        // Rely on user to close or add auto-close logic if needed. 
        // For now, success toast is enough feedback.

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
        onChange: ({ value }) => !value ? "Imię jest wymagane" : undefined,
      }}>
        {(field) => <field.Text label="Imię" />}
      </form.AppField>

      <form.AppField name="email" validators={{
        onChange: ({ value }) => !value ? "Email jest wymagany" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Niepoprawny format email" : undefined,
      }}>
        {(field) => <field.Text label="Email" type="email" />}
      </form.AppField>

      <form.AppField name="message" validators={{
        onChange: ({ value }) => !value ? "Wiadomość jest wymagana" : undefined,
      }}>
        {(field) => <field.Textarea label="Wiadomość" />}
      </form.AppField>

      <div className="flex justify-end gap-2 mt-4">
        <ModalClose asChild>
          <Button variant="outline" type="button" disabled={isSubmitting}>Anuluj</Button>
        </ModalClose>

        <ModalAction>
          {/* ModalAction might be wrapping the button and doing something specific for Dialogs, 
               but we need to trigger form submit. 
               If ModalAction prevents default, we might have issues. 
               Let's assume standard button behavior first. */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Wysyłanie..." : "Wyślij"}
          </Button>
        </ModalAction>
      </div>
    </form.Form>
  );
}

