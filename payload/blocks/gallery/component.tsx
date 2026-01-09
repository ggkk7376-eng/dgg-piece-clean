"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Media } from "@/payload-types";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from "../contact-form/component";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { usePathname } from "next/navigation";

// --- Types ---
type GalleryItemData = {
    images: (Media | number)[];
    title: string;
    price?: string | null;
    description?: string | null;
    category?: "kilns" | "controllers" | "accessories" | "other" | "furniture" | "spirals" | null;
    id?: string | null;
};

type Props = {
    title?: string | null;
    items?: GalleryItemData[] | null;
} & Record<string, any>;

// --- Lightbox Component ---
const GalleryLightbox = ({
    images,
    initialIndex,
    onClose
}: {
    images: (Media & { url: string })[],
    initialIndex: number,
    onClose: () => void
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Update internal state if initialIndex changes (though usually we remount)
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }, [images.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrev, handleNext, onClose]);

    const currentImage = images[currentIndex];

    if (!currentImage) return null;

    // Use Portal to escape parent stacking context
    if (typeof document === 'undefined') return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Only close if clicking the backdrop itself (not children)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            id="gallery-lightbox"
            className="fixed inset-0 z-[150] bg-white/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            {/* Image Container - z-10 ensures it is below controls z-50 */}
            <div
                className="relative z-[10] w-full h-full p-0 md:p-4 flex items-center justify-center pointer-events-none"
            >
                {/* Inner wrapper blocks clicks so image doesn't close lightbox, but background does. Pointer events re-enabled. */}
                <div
                    className="relative w-full h-full max-w-[95vw] pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={currentImage.url}
                        alt={currentImage.alt || ""}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Mobile Counter/Caption */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-black/80 text-sm font-medium px-4 py-2 bg-white/50 rounded-full z-[200] pointer-events-auto border border-zinc-200 shadow-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Close button - z-200 to GUARANTEE top layer */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 text-black/60 hover:text-black p-3 rounded-full bg-white/50 hover:bg-zinc-200 border border-transparent hover:border-zinc-300 transition-all z-[200] cursor-pointer shadow-sm hover:shadow-md"
                aria-label="Zamknij podgląd"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons - z-200 */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black p-4 rounded-full bg-white/50 hover:bg-zinc-200 border border-transparent hover:border-zinc-300 transition-all z-[200] cursor-pointer shadow-sm hover:shadow-md"
                        aria-label="Poprzednie zdjęcie"
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black p-4 rounded-full bg-white/50 hover:bg-zinc-200 border border-transparent hover:border-zinc-300 transition-all z-[200] cursor-pointer shadow-sm hover:shadow-md"
                        aria-label="Następne zdjęcie"
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}
        </div>,
        document.body
    );
};

// --- Carousel Component (Vertical Layout Optimized) ---
const GalleryCarousel = ({ item }: { item: GalleryItemData }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const images = Array.isArray(item.images)
        ? item.images.filter(
            (img): img is Media & { url: string } =>
                !!(img && typeof img === "object" && "url" in img && img.url)
        )
        : [];

    const updateScrollState = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", updateScrollState);
        emblaApi.on("reInit", updateScrollState);
        updateScrollState();
        return () => {
            emblaApi.off("select", updateScrollState);
            emblaApi.off("reInit", updateScrollState);
        };
    }, [emblaApi, updateScrollState]);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (images.length === 0) return <div className="h-64 flex items-center justify-center text-zinc-400">Brak zdjęcia</div>;

    return (
        <>
            <div className="relative group overflow-hidden rounded-lg bg-zinc-100 w-full max-w-2xl mx-auto border border-zinc-200">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images.map((image, index) => (
                            <div
                                key={image.id || index}
                                className="relative group flex-[0_0_100%] h-[400px] w-full cursor-zoom-in"
                                onClick={() => setLightboxIndex(index)}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.alt || item.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
                            <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <GalleryLightbox
                    images={images}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
};

export const Gallery: React.FC<Props> = ({ title, items }) => {
    // Default to null (closed)
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [openItemId, setOpenItemId] = useState<string | null>(null);
    const pathname = usePathname();

    // Close gallery when clicking outside
    // Close gallery when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Prevent closing category if a specific item dialog is open
            if (openItemId) return;
            // Also prevent closing if clicking inside the lightbox (which is in a portal)
            const lightbox = document.getElementById("gallery-lightbox");
            if (lightbox && lightbox.contains(event.target as Node)) return;

            const galleryElement = document.getElementById(`gallery-${title?.toLowerCase().replace(/\s+/g, '-')}`);
            if (activeCategory && galleryElement && !galleryElement.contains(event.target as Node)) {
                setActiveCategory(null);
            }
        };

        if (activeCategory) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeCategory, title, openItemId]);

    // Reset on navigation
    useEffect(() => {
        setOpenItemId(null);
        setActiveCategory(null);
    }, [pathname]);

    if (!items || items.length === 0) return null;

    const categories = [
        // Removed 'all'
        { id: "kilns", label: "Piece" },
        { id: "controllers", label: "Sterowniki" },
        { id: "accessories", label: "Akcesoria" },
        { id: "furniture", label: "Umeblowanie" },
        { id: "spirals", label: "Spirale" },
        { id: "other", label: "Inne" },
    ];

    const filteredItems = items.filter((item) => item.category === activeCategory);

    return (
        <div id={`gallery-${title?.toLowerCase().replace(/\s+/g, '-')}`} className="container mx-auto py-12 px-4">
            <div className="mb-12 text-center">
                {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                activeCategory === cat.id
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-muted border-input"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Adjusted grid:
                - sm:grid-cols-2 (was 1, better for mobile/tablet)
                - lg:grid-cols-4 (more density)
                - xl:grid-cols-5 (user requested ~5 per row on desktop)
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredItems.map((item, index) => {
                    const firstImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;
                    const validFirstImage = firstImage && typeof firstImage === "object" && "url" in firstImage && firstImage.url;
                    // Stable ID for state
                    const itemId = item.id || `item-${index}`;

                    return (
                        <Dialog
                            key={itemId}
                            open={openItemId === itemId}
                            onOpenChange={(open) => setOpenItemId(open ? itemId : null)}
                        >
                            <DialogTrigger asChild>
                                <div className="group cursor-pointer flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-card h-full">
                                    {/* Reduced height from h-64 to h-48 */}
                                    <div className="relative h-48 w-full bg-zinc-50 dark:bg-black/40 overflow-hidden flex items-center justify-center">
                                        {validFirstImage ? (
                                            <Image
                                                src={firstImage.url!}
                                                alt={firstImage.alt || item.title}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-zinc-400 text-sm">Brak zdjęcia</div>
                                        )}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs shado-sm">Pokaż</span>
                                        </div>
                                    </div>
                                    <div className="p-3 flex flex-col flex-grow">
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <h3 className="text-sm font-semibold line-clamp-2 leading-tight mb-1">{item.title}</h3>
                                                <p className="text-xs text-zinc-500 capitalize">{categories.find(c => c.id === item.category)?.label || item.category}</p>
                                            </div>
                                            <div className="mt-2 text-right">
                                                <span className="text-sm font-bold text-primary whitespace-nowrap">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
                                <div className="sr-only">
                                    <DialogTitle>{item.title}</DialogTitle>
                                    <DialogDescription>Szczegóły: {item.title}</DialogDescription>
                                </div>

                                <div className="flex flex-col">
                                    {/* Top: Image Section */}
                                    <div className="w-full bg-zinc-50 p-6 md:p-10 border-b border-border text-center">
                                        <GalleryCarousel item={item} />
                                    </div>

                                    {/* Bottom: Text Content */}
                                    <div className="p-6 md:p-10">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
                                            <div>
                                                <h4 className="text-3xl font-bold mb-2">{item.title}</h4>
                                                <span className="inline-block bg-muted px-3 py-1 rounded-md text-sm font-medium">
                                                    {categories.find(c => c.id === item.category)?.label || item.category}
                                                </span>
                                            </div>
                                            <div className="text-3xl font-bold text-primary whitespace-nowrap">
                                                {item.price}
                                            </div>
                                        </div>

                                        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                            {item.description ? (
                                                typeof item.description === 'string' ? (
                                                    item.description.split('\n').map((line, i) => (
                                                        <p key={i} className="mb-4">{line}</p>
                                                    ))
                                                ) : (
                                                    <RichText data={item.description as any} />
                                                )
                                            ) : (
                                                <p className="italic text-zinc-400">Brak opisu.</p>
                                            )}
                                        </div>

                                        <div className="mt-10 pt-6 border-t border-border flex justify-end">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium text-lg transition-colors shadow-sm">
                                                        Zapytaj o ten produkt
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md bg-background border-border">
                                                    <DialogHeader>
                                                        <DialogTitle>Zaytaj o produkt</DialogTitle>
                                                        <DialogDescription>
                                                            {item.title}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="pt-4">
                                                        <ContactForm
                                                            subject={item.title}
                                                            initialMessage={`Dzień dobry, jestem zainteresowany produktem: ${item.title}. Proszę o więcej informacji.`}
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </div>
            {activeCategory && filteredItems.length === 0 && (
                <div className="text-center py-24 border border-dashed rounded-xl">
                    <p className="text-muted-foreground text-lg">Brak produktów w tej kategorii.</p>
                </div>
            )}
        </div>
    );
};
