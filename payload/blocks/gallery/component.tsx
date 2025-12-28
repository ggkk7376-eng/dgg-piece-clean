"use client";

import React, { useState, useEffect, useCallback } from "react";
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

// --- Types ---
type GalleryItemData = {
    images: (Media | number)[];
    title: string;
    price?: string | null;
    description?: string | null;
    category?: "kilns" | "controllers" | "accessories" | "other" | null;
    id?: string | null;
};

type Props = {
    title?: string | null;
    items?: GalleryItemData[] | null;
} & Record<string, any>;

// --- Carousel Component (Vertical Layout Optimized) ---
const GalleryCarousel = ({ item }: { item: GalleryItemData }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = Array.isArray(item.images)
        ? item.images.filter(
            (img): img is Media & { url: string } =>
                !!(img && typeof img !== "string" && img.url)
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
        <div className="relative group overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 w-full max-w-2xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, index) => (
                        <div key={image.id || index} className="relative flex-[0_0_100%] h-[400px] w-full">
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
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

export const Gallery: React.FC<Props> = ({ title, items }) => {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    if (!items || items.length === 0) return null;

    const categories = [
        { id: "all", label: "Wszystkie" },
        { id: "kilns", label: "Piece" },
        { id: "controllers", label: "Sterowniki" },
        { id: "accessories", label: "Akcesoria" },
        { id: "other", label: "Inne" },
    ];

    const filteredItems = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

    return (
        <div className="container mx-auto py-12 px-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredItems.map((item, index) => {
                    const firstImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;
                    const validFirstImage = firstImage && typeof firstImage !== "string" && firstImage.url;

                    return (
                        <Dialog key={item.id || index}>
                            <DialogTrigger asChild>
                                <div className="group cursor-pointer flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-card h-full">
                                    <div className="relative h-64 w-full bg-zinc-50 dark:bg-black/40 overflow-hidden flex items-center justify-center">
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
                                        <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            {/* Hover effect placeholder */}
                                        </div>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">Pokaż</span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                                                <p className="text-sm text-zinc-500 mt-1 capitalize">{categories.find(c => c.id === item.category)?.label || item.category}</p>
                                            </div>
                                            <span className="text-md font-bold text-primary whitespace-nowrap ml-4">{item.price}</span>
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
                                    <div className="w-full bg-zinc-50 dark:bg-black/50 p-6 md:p-10 border-b border-border text-center">
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
                                                        <ContactForm initialMessage={`Dzień dobry, jestem zainteresowany produktem: ${item.title}. Proszę o więcej informacji.`} />
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
            {filteredItems.length === 0 && (
                <div className="text-center py-24 border border-dashed rounded-xl">
                    <p className="text-muted-foreground text-lg">Brak produktów dla wybranej kategorii.</p>
                </div>
            )}
        </div>
    );
};
