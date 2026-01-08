"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { Media } from "@/payload-types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { EnterAnimationBlur } from "@/components/animation/enter-animation";
import { Flipper, FlipperContent } from "@/components/animation/flipper";
import { Text } from "@/components/text";
import External from "@/assets/icons/external.svg";

type Slide = {
    image: string | Media | number | null;
    description?: string | null;
    id?: string | null;
};

type Props = {
    triggerLabel?: string | null;
    slides?: Slide[] | null;
} & Record<string, any>;

// --- Lightbox Component (Copied/Adapted for standalone usage in Realizations) ---
const GalleryLightbox = ({
    images,
    initialIndex,
    onClose
}: {
    images: { url: string; alt?: string }[],
    initialIndex: number,
    onClose: () => void
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

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
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            id="realizations-lightbox"
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div className="relative z-[10] w-full h-full p-0 md:p-4 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-[95vw] pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <Image
                        src={currentImage.url}
                        alt={currentImage.alt || ""}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium px-4 py-2 bg-black/50 rounded-full z-[50] pointer-events-auto border border-white/10 shadow-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[50]">
                <X size={40} />
            </button>

            {images.length > 1 && (
                <>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors z-[50]">
                        <ChevronLeft size={48} />
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors z-[50]">
                        <ChevronRight size={48} />
                    </button>
                </>
            )}
        </div>,
        document.body
    );
};

export function Realizations({ triggerLabel, slides }: Props) {
    const [open, setOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Filter valid images for lightbox
    const validImages = useCallback(() => {
        return (slides || []).map(s => {
            if (typeof s.image === "object" && s.image?.url) {
                return { url: s.image.url, alt: s.description || "" };
            }
            return null;
        }).filter((img): img is { url: string; alt: string } => img !== null);
    }, [slides]);

    // Embla setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: false,
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") scrollPrev();
            if (e.key === "ArrowRight") scrollNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, scrollPrev, scrollNext]);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button type="button" className="group">
                    <EnterAnimationBlur className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#212121] bg-[radial-gradient(66%_93%_at_48%_0%,#262626_0%,var(--color-dark-600)_76%)] px-7 py-4 font-sans transition-all hover:border-accent hover:shadow-[0_0_15px_-3px_var(--accent)]">
                        <Flipper asChild>
                            <Text variant="p2" asChild>
                                <span className="flex items-center gap-2">
                                    <span>{triggerLabel}</span>
                                    <FlipperContent
                                        className="h-6 w-6"
                                        itemClassName="h-5 w-5 rotate-90"
                                    >
                                        <External />
                                    </FlipperContent>
                                </span>
                            </Text>
                        </Flipper>
                    </EnterAnimationBlur>
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[100vw] w-screen h-screen p-0 bg-black/90 border-none shadow-none flex flex-col items-center justify-center outline-none">
                {/* Accessibility Titles */}
                <div className="sr-only">
                    <DialogTitle>Galeria Realizacji</DialogTitle>
                    <DialogDescription>Przeglądaj zdjęcia z naszych realizacji.</DialogDescription>
                </div>

                {/* Close Button Custom */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-8 right-8 z-50 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
                    aria-label="Zamknij galerię"
                >
                    <X size={32} />
                </button>

                {/* Carousel Container */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* Viewport */}
                    <div className="overflow-visible w-full h-full flex items-center" ref={emblaRef}>
                        <div className="flex h-full items-center touch-pan-y w-full">
                            {slides?.map((slide, index) => {
                                const imageUrl = typeof slide.image === "object" && slide.image?.url ? slide.image.url : "";
                                const isActive = index === currentIndex;

                                return (
                                    <div
                                        key={slide.id || index}
                                        className={cn(
                                            "flex-[0_0_85%] md:flex-[0_0_90%] min-w-0 px-4 transition-all duration-500 ease-in-out transform h-[75vh] md:h-[90vh] flex flex-col items-center justify-center",
                                            isActive ? "opacity-100 z-10 scale-100" : "opacity-30 grayscale scale-90"
                                        )}
                                    >
                                        <div
                                            className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl cursor-zoom-in group"
                                            onClick={() => isActive && setLightboxIndex(index)}
                                        >
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={slide.description || "Realizacja"}
                                                    fill
                                                    className="object-contain"
                                                    sizes="90vw"
                                                    priority={isActive}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-zinc-500 bg-zinc-900">Brak zdjęcia</div>
                                            )}
                                        </div>
                                        {/* Caption only for active slide */}
                                        <div className={cn(
                                            "mt-6 text-center transition-opacity duration-300",
                                            isActive ? "opacity-100" : "opacity-0"
                                        )}>
                                            <p className="text-white text-lg md:text-xl font-medium drop-shadow-md bg-black/40 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                                                {slide.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm z-20"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 text-white p-4 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm z-20"
                    >
                        <ChevronRight size={40} />
                    </button>

                </div>
            </DialogContent>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <GalleryLightbox
                    images={validImages()}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </Dialog>
    );
}
