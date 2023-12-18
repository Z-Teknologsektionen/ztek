import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import HeadLayout from "~/components/layout/HeadLayout";

// First page carousel images
const carouselImg = [
  "https://zfoto.ztek.se/img/full/20230902-DH6_7840.jpg",
  "https://zfoto.ztek.se/img/full/20230908-DH8_8364.jpg",
  "https://zfoto.ztek.se/img/full/20230904-DH8_8302.jpg",
];

// First page sponsor images and URLs
const sponsors = [
  { company: "Cpac", img: "/cpac.png", href: "https://cpacsystems.se/" },
];

// Useful quick-links
const selectLinks = [
  {
    title: "Canvas",
    url: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1",
  },
  {
    title: "Ladok",
    url: "https://www.student.ladok.se/student/app/studentwebb/",
  },
  { title: "Activity@Z", url: "https://www.facebook.com/groups/activityatz" },
];

const linkGroup = [
  {
    title: "Studier",
    links: [
      {
        title: "Canvas",
        url: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1",
      },
      { title: "Outlook", url: "https://outlook.office.com/owa/chalmers.se" },
      {
        title: "Ladok",
        url: "https://www.student.ladok.se/student/app/studentwebb/",
      },
      { title: "Tentastatistik", url: "https://stats.ftek.se/" },
      { title: "Utskrift på Chalmers", url: "https://papercut.chalmers.se/" },
    ],
  },
  {
    title: "Schema & Campus",
    links: [
      {
        title: "Lunchmeny",
        url: "https://chalmerskonferens.se/en/lunchmenyer-johanneberg/",
      },
      {
        title: "Boka Grupprum",
        url: "https://cloud.timeedit.net/chalmers/web/b1",
      },
      {
        title: "Schema TKAUT-1",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y015Q42x4956g580YQQ697.html",
      },
      {
        title: "Schema TKAUT-2",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y085Q42x4956g580YQQ677.html",
      },
      {
        title: "Schema TKAUT-3",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y075Q42x4956g580YQQ687.html",
      },
      {
        title: "Timeedit",
        url: "https://cloud.timeedit.net/chalmers/web/?en=t",
      },
      {
        title: "Felanmäl Lokaler",
        url: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
      },
      {
        title: "Trygg på chalmers",
        url: "https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/",
      },
    ],
  },
  {
    title: "Sektionen",
    links: [
      { title: "Boka Zaloonen", url: "https://forms.gle/yCvBenvr4RzhJv13A" },
      {
        title: "Activity@Z",
        url: "https://www.facebook.com/groups/activityatz",
      },
      {
        title: "Kårappen iOS",
        url: "https://apps.apple.com/se/app/chalmers-studentk%C3%A5r/id1633440660",
      },
      {
        title: "Kårappen Android",
        url: "https://play.google.com/store/apps/details?id=com.helo.karappen",
      },
    ],
  },
];

const HomePage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Z" />
      <ParagraphWelcome />
      <div className="relative">
        <div className="absolute h-[5vh] w-full md:h-[10vh] xl:h-[15vh]">
          <Image
            alt="Lucky luke"
            className="absolute bottom-[2.5vh] left-1/2 z-20  w-[30vw] -translate-x-1/2 -rotate-[4deg]  transform drop-shadow-md  md:bottom-[5vh] md:w-[24vw] xl:bottom-[7.5vh]"
            height={1080}
            src="/lucky_horizontal.png"
            width={1920}
          />
        </div>
        <ParagraphLinks />
      </div>
    </>
  );
};

const ParagraphWelcome: FC = () => {
  return (
    <>
      <div>
        <div className="mx-auto max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex w-full flex-col gap-8">
              <div className="">
                <div className="text-balance align-text-bottom text-base font-bold md:text-2xl xl:text-4xl">
                  Välkommen till Automation och Mekatronik på Chalmers tekniska
                  högskola!
                </div>
                <div className="text-balance col-start-1 row-start-5 text-sm md:col-start-1 md:row-start-2 md:text-base xl:text-xl">
                  Z-teknologsektionen, eller Z som programmet kallas, är
                  civilingengörsprogrammet på Chalmers som beskrivs som länken
                  mellan maskin-, elektro och datateknik.
                </div>
              </div>

              <div className="relative hidden w-full max-w-[120rem] md:col-start-1 md:row-span-2 md:block">
                <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4 md:gap-8">
                  {sponsors.map((sponsor) => (
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
                <Carousel />
              </div>

              <div className="flex items-start md:col-start-2 md:row-start-3">
                <div className="flex w-full gap-2 md:justify-end md:gap-4">
                  {selectLinks.map((link) => (
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
                  {sponsors.map((sponsor) => (
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

const ParagraphLinks: FC = () => {
  return (
    <>
      <div
        className="relative flex h-screen w-full items-center justify-center bg-cover bg-center object-cover py-32 drop-shadow-xl [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)] "
        style={{ backgroundImage: "url(./wallpaper_automation.jpg)" }}
      >
        <div className="m-auto flex h-full max-w-[85rem] flex-col justify-center gap-10 px-4 sm:px-6 lg:px-8">
          {linkGroup.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-white drop-shadow-xl">
                {group.title}
              </div>
              <div className="flex flex-wrap gap-4 ">
                {group.links.map((link) => (
                  <Link
                    key={link.url}
                    className="rounded-bl-lg rounded-tr-lg border-2 bg-zBlack bg-opacity-60 px-2 py-1 text-center align-middle text-base font-bold text-white transition-all duration-200 hover:rounded-br-lg hover:rounded-tl-lg md:w-auto md:px-3 md:text-lg xl:px-5  xl:text-xl"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Carousel: FC = () => {
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
        {carouselImg.map((slide) => (
          <div key={slide} className="keen-slider__slide">
            <Image
              alt="asv"
              className="h-full w-full object-cover"
              height={1080}
              src={slide}
              width={1920}
            />
          </div>
        ))}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              left
            />

            <Arrow
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

type arrowProps = {
  left?: boolean;
  onClick: React.MouseEventHandler<SVGSVGElement>;
};

const Arrow: FC<arrowProps> = (props) => {
  return (
    <svg
      className={`invisible absolute top-1/2 -translate-y-1/2 fill-white hover:cursor-pointer md:visible md:h-[30px] md:w-[30px] ${
        props.left ? "left-1" : "right-1"
      }`}
      onClick={props.onClick}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
};

export default HomePage;
