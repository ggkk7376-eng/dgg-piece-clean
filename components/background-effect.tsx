import { payload } from "@/lib/payload";
import Image from "next/image";

export async function BackgroundEffect() {
    let settings;

    try {
        settings = await payload.findGlobal({
            slug: "settings",
            depth: 1, // Need depth to get image URL
        });
    } catch (e) {
        console.error("Failed to fetch settings for background:", e);
        return null;
    }

    const bgImage = settings?.appearance?.globalBackgroundImage;
    const enableOverlay = settings?.appearance?.enableOverlay ?? true;

    if (!bgImage || typeof bgImage === 'string' || !bgImage.url) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden">
            <Image
                src={bgImage.url}
                alt="Background"
                fill
                priority
                className="object-cover opacity-60 blur-sm scale-105"
                sizes="100vw"
                quality={75}
            />
            {enableOverlay && (
                <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
            )}
            {/* Additional gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-80" />
        </div>
    );
}
