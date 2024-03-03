import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { homePageCarouselImageUrls } from "~/data/home-page-carousel-image-urls";
import ImageCarouselArrow from "./image-carousel-arrow";

const ImageCarousel: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    created() {
      setLoaded(true);
    },
    initial: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider mx-auto aspect-video w-full flex-1 rounded-xl drop-shadow-md md:max-w-[80vw]"
      >
        {homePageCarouselImageUrls.map((imageUrl) => (
          <div key={imageUrl} className="keen-slider__slide">
            <Image
              alt="asv"
              className="h-full w-full object-cover"
              height={1080}
              onLoad={() => instanceRef?.current?.update()}
              src={imageUrl}
              width={1920}
            />
          </div>
        ))}

        {loaded && instanceRef.current && (
          <>
            <ImageCarouselArrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              left
            />

            <ImageCarouselArrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImageCarousel;
