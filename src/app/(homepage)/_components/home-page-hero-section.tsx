import { type FC } from "react";
import { getHomePageCarouselItems } from "~/app/(homepage)/_utils/get-home-page-carousel-items";

export const HomePageHeroSection: FC = async () => {
  const carouselItems = await getHomePageCarouselItems();

  return (
    <div className="grid-rows-2 grid-cols-2 px-4 py-6 gap-1 w-full h-screen bg-gradient-to-tl from-gray-500 to-gray-50">
      
    </div>
  );
};
