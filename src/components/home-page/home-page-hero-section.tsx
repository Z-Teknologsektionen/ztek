import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { homePageSelectLinks } from "~/data/home-page-select-links";
import { homePageSponsors } from "~/data/home-page-sponsors";
import ImageCarousel from "./image-carousel";

const HomePageHeroSection: FC = () => {
  return (
    <>
      <div>
        <div className="mx-auto mt-8 max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex w-full flex-col gap-8">
              <div className="">
                <div className="text-balance align-text-bottom text-base font-bold md:text-2xl xl:text-4xl">
                  Välkommen till Automation och Mekatronik på Chalmers tekniska
                  högskola!
                </div>
                <div className="col-start-1 row-start-5 text-balance text-sm md:col-start-1 md:row-start-2 md:text-base xl:text-xl">
                  Z-teknologsektionen, eller Z som programmet kallas, är
                  civilingengörsprogrammet på Chalmers som beskrivs som länken
                  mellan maskin-, elektro och datateknik.
                </div>
              </div>

              <div className="relative hidden w-full max-w-[120rem] md:col-start-1 md:row-span-2 md:block">
                <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4 md:gap-8">
                  {homePageSponsors.map((sponsor) => (
                    <Link
                      key={sponsor.company}
                      href={sponsor.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={sponsor.company}
                        className={`object-scale-down drop-shadow-md`}
                        height={1080}
                        src={sponsor.img}
                        width={1920}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-4 md:w-1/2">
              <div className="w-full">
                <ImageCarousel />
              </div>

              <div className="flex items-start md:col-start-2 md:row-start-3">
                <div className="flex w-full gap-2 md:justify-end md:gap-4">
                  {homePageSelectLinks.map((link) => (
                    <Link
                      key={link.url}
                      className="w-full rounded-bl-lg rounded-tr-lg border-2 border-zBlack px-1 py-1 text-center align-middle text-base font-bold transition-all duration-200 hover:rounded-br-lg hover:rounded-tl-lg md:w-auto md:px-3 md:text-lg xl:px-5 xl:text-xl"
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative block w-full max-w-[120rem] md:col-start-1 md:row-span-2 md:hidden">
                <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-8">
                  {homePageSponsors.map((sponsor) => (
                    <Link
                      key={sponsor.company + "2"}
                      href={sponsor.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={sponsor.company}
                        className={`object-scale-down drop-shadow-md`}
                        height={600}
                        src={sponsor.img}
                        width={600}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageHeroSection;
