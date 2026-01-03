"use client";

import React, { useCallback, useEffect, useState } from "react";
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

export function Realizations({ triggerLabel, slides }: Props) {
    const [open, setOpen] = useState(false);

    // Embla setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: false, // Allow centering items even if there are few
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

            <DialogContent className="max-w-[100vw] w-screen h-screen p-0 bg-white/95 border-none shadow-none flex flex-col items-center justify-center outline-none">
                {/* Accessibility Titles */}
                <div className="sr-only">
                    <DialogTitle>Galeria Realizacji</DialogTitle>
                    <DialogDescription>Przeglądaj zdjęcia z naszych realizacji.</DialogDescription>
                </div>

                {/* Close Button Custom */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-8 right-8 z-50 bg-black/5 text-zinc-900 p-3 rounded-full hover:bg-black/10 transition-colors backdrop-blur-md"
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
<<<<<<< HEAD
                                            "flex-[0_0_85%] md:flex-[0_0_90%] min-w-0 px-4 transition-all duration-500 ease-in-out transform h-[75vh] md:h-[90vh] flex flex-col items-center justify-center",
=======
                                            "flex-[0_0_85%] md:flex-[0_0_65%] min-w-0 px-4 transition-all duration-500 ease-in-out transform h-[60vh] md:h-[80vh] flex flex-col items-center justify-center",
>>>>>>> 2f182b0 (Style: Change lightbox background to white for Gallery and Realizations)
                                            isActive ? "opacity-100 z-10 scale-100" : "opacity-30 grayscale scale-90"
                                        )}
                                    >
                                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
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
                                                <div className="flex items-center justify-center h-full text-zinc-400 bg-zinc-100">Brak zdjęcia</div>
                                            )}
                                        </div>
                                        {/* Caption only for active slide */}
                                        <div className={cn(
                                            "mt-6 text-center transition-opacity duration-300",
                                            isActive ? "opacity-100" : "opacity-0"
                                        )}>
                                            <p className="text-white text-lg md:text-xl font-medium drop-shadow-md bg-black/60 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
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
                        className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-black/5 text-zinc-900 p-4 rounded-full hover:bg-black/10 hover:scale-110 transition-all backdrop-blur-sm z-20"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-black/5 text-zinc-900 p-4 rounded-full hover:bg-black/10 hover:scale-110 transition-all backdrop-blur-sm z-20"
                    >
                        <ChevronRight size={40} />
                    </button>

                </div>
            </DialogContent>
        </Dialog>
    );
}
