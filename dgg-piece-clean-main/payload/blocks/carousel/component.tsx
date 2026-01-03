import Image from "next/image";
import { cache, Fragment } from "react";
import invariant from "tiny-invariant";

import {
  EnterAnimationBlur,
  EnterAnimationBlurText,
} from "@/components/animation/enter-animation";
import { Text } from "@/components/text";
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { payload } from "@/lib/payload";
import type { Carousel as CarouselProps, Media } from "@/payload-types";

export function Carousel({ text, images }: CarouselProps) {
  return (
    <div className="relative flex w-full flex-col gap-9 text-center">
      <Text variant="p3" className="text-light-400">
        <EnterAnimationBlurText>{text ?? ""}</EnterAnimationBlurText>
      </Text>

      <EnterAnimationBlur>
        <div className="relative w-full">
          <BaseCarousel
            className="w-full"
            opts={{ loop: true, dragFree: true }}
            autoScroll={{
              speed: 0.5,
              direction: "backward",
              stopOnInteraction: false,
            }}
          >
            <CarouselContent className="items-center">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: The list is static.
                <Fragment key={i}>
                  {images?.map((image) => (
                    <CarouselItem
                      key={typeof image === "number" ? image : image.id}
                      className="ml-16 basis-auto"
                    >
                      <CarouselImage media={image} />
                    </CarouselItem>
                  ))}
                </Fragment>
              ))}
            </CarouselContent>
          </BaseCarousel>

          <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-black to-transparent" />
        </div>
      </EnterAnimationBlur>
    </div>
  );
}

const getMedia = cache(
  async (id: number) => await payload.findByID({ collection: "media", id }),
);

function getDefinedSize(
  media: Media,
  sizeName: string, // Relaxed type to avoid mismatch with generated types
) {
  // @ts-expect-error
  const size = media.sizes?.[sizeName];

  const url = size?.url;
  const width = size?.width;
  const height = size?.height;

  if (!url || !width || !height) {
    return null;
  }

  return {
    url,
    width,
    height,
  };
}

async function CarouselImage({
  media: mediaOrId,
}: Readonly<{ media: Media | number }>) {
  const media =
    typeof mediaOrId === "number" ? await getMedia(mediaOrId) : mediaOrId;

  // Use original always for best quality and correct aspect ratio
  // Thumbnail (400x300) forces 4:3 which distorts/crops wide logos
  const size = {
    url: media.url!,
    width: media.width!,
    height: media.height!,
  };

  if (!size) {
    return null;
  }

  return (
    <Image
      alt={media.alt ?? ""}
      src={size.url}
      width={size.width}
      height={size.height}
      className="h-8 w-auto object-contain"
    />
  );
}
