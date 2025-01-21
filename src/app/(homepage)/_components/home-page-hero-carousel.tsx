"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { type FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const HomePageHeroCarousel: FC<{
  items: {
    committeeId: string;
    createdAt: Date;
    createdByEmail: string | null;
    endDateTime: Date | null;
    id: string;
    imageUrl: string;
    importedFromId: string | null;
    linkToUrl: string | null;
    startDateTime: Date | null;
    updatedAt: Date;
    updatedByEmail: string | null;
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
        {items.map(({ imageUrl }) => (
          <CarouselItem key={imageUrl} className="pl-0">
            <Image
              alt="Bild i karusell på hemskärmen"
              className="h-full w-full object-cover object-center"
              height={450}
              quality={95}
              src={imageUrl}
              width={750}
            />
          </CarouselItem>
        ))}
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
