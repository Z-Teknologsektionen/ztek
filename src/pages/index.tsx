import { type NextPage } from "next";
import Image from "next/image";
import HomePageHeroSection from "~/components/home-page/home-page-hero-section";
import HomePageLinksSection from "~/components/home-page/home-page-links-section";
import HeadLayout from "~/components/layout/head-layout";

const HomePage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Z" />
      <HomePageHeroSection />
      <div className="relative">
        <div className="absolute h-[5vh] w-full md:h-[10vh] xl:h-[15vh]">
          <Image
            alt="Lucky luke"
            className="absolute bottom-[2.5vh] left-1/2 z-20  w-[30vw] min-w-[150px] drop-shadow-md -translate-x-1/2  -rotate-[4deg] transform  md:bottom-[5.5vh] md:w-[24vw] xl:bottom-[9vh]"
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
