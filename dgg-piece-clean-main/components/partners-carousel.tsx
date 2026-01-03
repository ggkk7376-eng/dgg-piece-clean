import { Children, type ComponentPropsWithRef, Fragment } from "react";

import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export function PartnersCarousel({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div {...props} className={cn("relative w-full", className)}>
      <Carousel
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
              {Children.map(children, (children) => (
                <CarouselItem className="ml-16 basis-auto">
                  {children}
                </CarouselItem>
              ))}
            </Fragment>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}
