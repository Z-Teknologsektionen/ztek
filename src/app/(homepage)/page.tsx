import type { Metadata } from "next";
import Image from "next/image";
import type { FC } from "react";
import { HomePageHeroSection } from "./_components/home-page-hero-section";
import { HomePageLinksSection } from "./_components/home-page-links-section";

export const metadata: Metadata = {
  title: "Z",
};

const HomePage: FC = () => {
  return (
    <>
      <HomePageHeroSection />
      <div className="relative">
        <div className="absolute h-[5vh] w-full md:h-[10vh] xl:h-[15vh]">
          <Image
            alt="Lucky luke"
            className="absolute bottom-[2.5vh] left-1/2 z-20 w-[30vw] min-w-[150px] drop-shadow-md -translate-x-1/2 -rotate-[4deg] transform md:bottom-[5.5vh] md:w-[24vw] xl:bottom-[9vh]"
            height={1080}
            src="/lucky_horizontal.png"
            width={1920}
          />
        </div>
        <HomePageLinksSection />
      </div>
    </>
  );
};

export default HomePage;
