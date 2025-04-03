"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  CAROUSEL_IMAGE_HEIGHT,
  CAROUSEL_IMAGE_QUALITY,
  CAROUSEL_IMAGE_WIDTH,
} from "~/constants/home-page-carousel";

export const HomePageHeroCarousel: FC<{
  items: {
    id: string;
    imageUrl: string;
    linkToUrl: string | null;
  }[];
}> = ({ items }) => {
  const autoplayPlugin = Autoplay({
    playOnInit: true,
    delay: 5000,
    stopOnInteraction: false,
  });

  return (
    <Carousel
      className="relative h-fit overflow-hidden rounded-xl"
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[autoplayPlugin]}
    >
      <CarouselContent className="-ml-0 aspect-video">
        {items.map(({ imageUrl, linkToUrl, id }) => {
          if (linkToUrl) {
            return (
              <CarouselItem key={id} className="pl-0">
                <Link
                  href={linkToUrl}
                  referrerPolicy="no-referrer"
                  target="_blank"
                >
                  <Image
                    alt="Bild i karusell på hemskärmen"
                    className="h-full w-full object-cover object-center"
                    height={CAROUSEL_IMAGE_HEIGHT}
                    quality={CAROUSEL_IMAGE_QUALITY}
                    src={imageUrl}
                    width={CAROUSEL_IMAGE_WIDTH}
                  />
                </Link>
              </CarouselItem>
            );
          }

          return (
            <CarouselItem key={id} className="pl-0">
              <Image
                alt="Bild i karusell på hemskärmen"
                className="h-full w-full object-cover object-center"
                height={CAROUSEL_IMAGE_HEIGHT}
                quality={CAROUSEL_IMAGE_QUALITY}
                src={imageUrl}
                width={CAROUSEL_IMAGE_WIDTH}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className="left-1 text-white opacity-75 drop-shadow hover:opacity-100"
        variant="ghost"
      />
      <CarouselNext
        className="right-1 text-white opacity-75 drop-shadow hover:opacity-100"
        variant="ghost"
      />
      <CarouselDots className="bottom-1" />
    </Carousel>
  );
};
