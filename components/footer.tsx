"use client";

import { ContactForm } from "@/payload/blocks/contact-form/component";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function Footer() {
    return (
        <footer className="w-full bg-dark-600 border-t border-border py-8 text-center">
            <div className="container mx-auto px-5 flex flex-col items-center gap-6">

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="px-6 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-white rounded-full transition-all text-sm font-medium uppercase tracking-wide">
                            Napisz do nas
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-background border-border">
                        <DialogHeader>
                            <DialogTitle>Jesteśmy do Twojej dyspozycji</DialogTitle>
                            <DialogDescription>
                                Masz pytania? Wypełnij formularz, a my skontaktujemy się z Tobą.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                            <ContactForm subject="Kontakt ze stopki" />
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="text-muted-foreground/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} DGG Piece. Wszystkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}
