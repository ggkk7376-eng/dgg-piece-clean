import Link from "next/link";
import { AppLogo } from "@/app/(app)/_components/logo";
import { Text } from "@/components/text";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { payload } from "@/lib/payload";
import { DynamicDialog } from "@/components/dynamic-dialog";
import { Button } from "@/components/ui/button";

export async function Footer() {
    let contactDialog;
    let settings;
    try {
        const dialogs = await payload.find({
            collection: "dialogs",
            where: {
                title: {
                    equals: "Kontakt"
                }
            }
        });
        if (dialogs.docs.length > 0) {
            contactDialog = dialogs.docs[0];
        }

        settings = await payload.findGlobal({
            slug: "settings",
        });

    } catch (e) {
        console.error("Failed to fetch footer data:", e);
    }

    return (
        <footer id="contact" className="w-full bg-dark-600 border-t border-border py-12 md:py-16">
            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand & Mission */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="block w-fit">
                        <AppLogo className="h-12" />
                    </Link>
                    <Text variant="p2" className="text-muted-foreground/80 max-w-sm">
                        Tworzymy i naprawiamy piece ceramiczne z pasją i precyzją.
                        Łączymy rzemiosło z nowoczesną technologią, wspierając artystów i przemysł.
                    </Text>

                    {/* Company Details */}
                    {settings && (settings as any).companyDetails?.details && (
                        <div className="mt-4 text-sm text-muted-foreground/60 whitespace-pre-wrap">
                            {(settings as any).companyDetails.details}
                        </div>
                    )}
                </div>

                {/* Contact info - moved to middle, replaces Nav */}
                <div className="flex flex-col gap-4">
                    <Text variant="p1" className="text-white font-medium">Kontakt</Text>
                    <ul className="flex flex-col gap-4">
                        <li className="flex items-start gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-accent shrink-0" />
                            <span className="whitespace-pre-wrap">
                                {settings && (settings as any).companyDetails?.address ? (settings as any).companyDetails.address : "ul. Przykładowa 123\n00-000 Miasto, Polska"}
                            </span>
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="w-5 h-5 text-accent shrink-0" />
                            {settings && (settings as any).companyDetails?.phone ? (
                                <a href={`tel:${(settings as any).companyDetails.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                                    {(settings as any).companyDetails.phone}
                                </a>
                            ) : (
                                <a href="tel:+48000000000" className="hover:text-white transition-colors">+48 000 000 000</a>
                            )}
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="w-5 h-5 text-accent shrink-0" />
                            {settings && (settings as any).companyDetails?.contactEmail ? (
                                <a href={`mailto:${(settings as any).companyDetails.contactEmail}`} className="hover:text-white transition-colors">
                                    {(settings as any).companyDetails.contactEmail}
                                </a>
                            ) : (
                                <a href="mailto:kontakt@dggpiece.pl" className="hover:text-white transition-colors">kontakt@dggpiece.pl</a>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Actions & Socials */}
                <div className="flex flex-col gap-6 items-start">
                    {/* Write Message Button */}
                    <div className="flex flex-col gap-2">
                        <Text variant="p1" className="text-white font-medium">Masz pytania?</Text>
                        {contactDialog ? (
                            <DynamicDialog {...contactDialog} asChild>
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium px-8">
                                    Napisz wiadomość
                                </Button>
                            </DynamicDialog>
                        ) : (
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium px-8" asChild>
                                <a href="mailto:kontakt@dggpiece.pl">Napisz wiadomość</a>
                            </Button>
                        )}
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2">
                        <Text variant="p1" className="text-white font-medium">Obserwuj nas</Text>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-5 mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground/60 text-sm">
                <p>&copy; {new Date().getFullYear()} DGG Piece. Wszystkie prawa zastrzeżone.</p>
            </div>
        </footer>
    );
}
