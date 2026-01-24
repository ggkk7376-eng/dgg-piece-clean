"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RichText } from "../rich-text/component";
import type { Media } from "@/payload-types";
import { X } from "lucide-react";

interface ImageAndTextProps {
    layout: "imageLeft" | "imageRight";
    image: Media | number; // Payload can return ID or Object depending on depth
    content: string;
}

// Simple Inline Lightbox reused from Gallery concept
const SimpleLightbox = ({
    imageUrl,
    imageAlt,
    onClose
}: {
    imageUrl: string,
    imageAlt: string,
    onClose: () => void
}) => {
    // Escape key listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[150] bg-white/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div className="relative w-full h-full p-4 flex items-center justify-center pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 z-[200] pointer-events-auto text-black/60 hover:text-black p-3 rounded-full bg-white/50 hover:bg-zinc-200 border border-transparent hover:border-zinc-300 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    aria-label="Zamknij podgląd"
                >
                    <X size={32} />
                </button>
                <div
                    className="relative w-full h-full max-w-[95vw] pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export const ImageAndText: React.FC<ImageAndTextProps> = ({ layout, image, content }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Determine image URL
    let imageUrl = "";
    let imageAlt = "Article Image";
    let imageWidth = 800;
    let imageHeight = 600;

    if (typeof image === "object" && image?.url) {
        imageUrl = image.url;
        imageAlt = image.alt || image.filename || "Article Image";
        imageWidth = image.width || 800;
        imageHeight = image.height || 600;
    }

    const isImageLeft = layout === "imageLeft";

    return (
        <>
            <div className="my-8 block relative flow-root group">
                {/* Image Wrapper - Floated */}
                <div
                    className={cn("relative w-full md:w-5/12 mb-6 shadow-lg rounded-xl border border-neutral-800 overflow-hidden cursor-zoom-in hover:opacity-95 transition-opacity", {
                        "md:float-left md:mr-8": isImageLeft,
                        "md:float-right md:ml-8": !isImageLeft
                    })}
                    onClick={() => imageUrl && setIsLightboxOpen(true)}
                >
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={imageWidth}
                            height={imageHeight}
                            className="w-full h-auto object-contain bg-black"
                        />
                    ) : (
                        <div className="w-full h-64 bg-neutral-800 flex items-center justify-center text-neutral-500 cursor-default">
                            No Image
                        </div>
                    )}

                    {/* Suggestion overlay for click-to-zoom (optional polish) */}
                    {imageUrl && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 pointer-events-none bg-white transition-opacity" />
                    )}
                </div>

                {/* Text Wrapper - Wraps around float */}
                {/* JUSTIFICATION APPLIED HERE: text-justify on P tags */}
                <div className="text-justify [&_.rich-text]:text-justify [&_.rich-text_p]:text-justify [&_.rich-text_p]:text-justify-inter-word text-neutral-200">
                    <RichText content={content} />
                </div>
            </div>

            {/* Lightbox Portal */}
            {isLightboxOpen && imageUrl && (
                <SimpleLightbox
                    imageUrl={imageUrl}
                    imageAlt={imageAlt}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </>
    );
};
