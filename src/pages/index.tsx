import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import HeadLayout from "~/components/layout/HeadLayout";


// First page carousel images
const carouselImg = [
  "https://zfoto.ztek.se/img/full/20230902-DH6_7840.jpg",
  "https://zfoto.ztek.se/img/full/20230908-DH8_8364.jpg",
  "https://zfoto.ztek.se/img/full/20230904-DH8_8302.jpg",
]

// First page sponsor images and URLs
const sponsors = [
  {company: "Cpac", img: "./cpac.png", href: "https://cpacsystems.se/" },
]

// Useful quick-links
const selectLinks = [
  {title:"Canvas", url:"https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1"},
  {title:"Ladok",url:"https://www.student.ladok.se/student/app/studentwebb/"},
  {title:"Activity@Z", url:"https://www.facebook.com/groups/activityatz"},
]

const links = [
  {
    title: "Studier",
    links: [
      {title:"Canvas", url:"https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1"},
      {title:"Outlook",url:"https://outlook.office.com/owa/chalmers.se"},
      {title:"Ladok",url:"https://www.student.ladok.se/student/app/studentwebb/"},
      {title:"Tentastatistik",url:"https://stats.ftek.se/"},
      {title:"Utskrift på Chalmers",url:"https://papercut.chalmers.se/"},
    ]
  },
  {
    title: "Schema & Campus",
    links: [
      {title:"Lunchmeny", url:"https://chalmerskonferens.se/en/lunchmenyer-johanneberg/"},
      {title:"Boka Grupprum",url:"https://cloud.timeedit.net/chalmers/web/b1"},
      {title:"Schema TKAUT-1",url:"https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y015Q42x4956g580YQQ697.html"},
      {title:"Schema TKAUT-2",url:"https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y085Q42x4956g580YQQ677.html"},
      {title:"Schema TKAUT-3",url:"https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y075Q42x4956g580YQQ687.html"},
      {title:"Timeedit", url:"https://cloud.timeedit.net/chalmers/web/?en=t"},
      {title:"Felanmäl Lokaler",url:"https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna"},
      {title:"Trygg på chalmers",url:"https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/"},
    ]
  },
  {
    title: "Sektionen",
    links: [
      {title:"Boka Zaloonen",url:"https://forms.gle/yCvBenvr4RzhJv13A"},
      {title:"Activity@Z", url:"https://www.facebook.com/groups/activityatz"},
      {title:"Kårappen iOS",url:"https://apps.apple.com/se/app/chalmers-studentk%C3%A5r/id1633440660"},
      {title:"Kårappen Android",url:"https://play.google.com/store/apps/details?id=com.helo.karappen"},
    ]
  },
]

const HomePage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Z"/>
      <ParagraphWelcome/>
      <div className='relative'>
        <div className='w-full xl:h-[15vh] md:h-[10vh] h-[5vh] absolute'>
          <img src="./lucky_horizontal.png" className='-rotate-[4deg] absolute z-20 transform  xl:bottom-[7.5vh] md:bottom-[5vh] bottom-[2.5vh]  -translate-x-1/2 left-1/2  md:w-[24vw] w-[30vw] drop-shadow-md' height={120}  width={360} />
        
        </div>
        <ParagraphLinks/>
      </div>
    </>
  );
};

const ParagraphWelcome = () => {
  return ( 
    <>
      <div>
        <div className='mx-auto max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-4'>
            <div className="flex md:flex-row flex-col w-full gap-4 justify-between">
              <div className=''>
                <div className="xl:text-4xl md:text-2xl text-base align-text-bottom font-bold text-balance">
                  Välkommen till Automation och Mekatronik på Chalmers tekniska högskola!
                </div>
                <div className="xl:text-xl md:text-base text-sm md:col-start-1 md:row-start-2 col-start-1 row-start-5 text-balance">
                  Z-teknologsektionen, eller Z som programmet kallas, är civilingengörsprogrammet på Chalmers som beskrivs som länken mellan maskin-, elektro och datateknik.
                </div>
              </div>
              
              <div className='md:w-1/2 w-full'>
                <Carousel/>
              </div>
            </div>
            
            <div className='flex md:flex-row flex-col-reverse w-full gap-4 justify-between'>
              <div className="md:row-span-2 md:col-start-1 relative w-full max-w-[120rem]">
                <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-8">
                  {
                    sponsors.map((key, value) =>
                      <a href={key.href} target="_blank" rel="noopener noreferrer">
                        <img src={key.img}  className={`object-scale-down drop-shadow-md`}/>
                      </a>
                    )
                  }
                </div>
              </div>
              
              <div className='md:col-start-2 md:row-start-3 flex items-start'>
                  <div className='flex md:justify-end md:gap-4 gap-2 w-full'>
                    {
                      selectLinks.map((key, value) =>
                        <a href={key.url} target='_blank' rel="noopener noreferrer" className='py-1 px-1 xl:px-5 md:px-3 md:w-auto w-full text-center xl:text-xl md:text-lg text-base font-bold border-zBlack transition-all duration-200 align-middle hover:rounded-tl-lg hover:rounded-br-lg rounded-tr-lg rounded-bl-lg border-2'>
                          {key.title}
                        </a>
                      )
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ParagraphLinks = () => {
  return (
    <>
      <div className="h-screen bg-[url('http://localhost:5000/wallpaper_automation.jpg')] relative backdrop-blur-2xl w-full py-32 flex items-center justify-center object-cover drop-shadow-xl xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)] bg-cover bg-center ">     
        <div className='m-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 h-full flex flex-col gap-10 justify-center'>
          {
            links.map((key, value) =>
              <div key={key.title} className='flex flex-col gap-2'>
                <div className='text-2xl font-bold text-white drop-shadow-xl'>
                  {key.title}
                </div>
                <div className='flex flex-wrap gap-4 '>
                  {
                    key.links.map((key, value) =>
                      <a href={key.url} target='_blank' rel="noopener noreferrer" className='py-1 xl:px-5 md:px-3 px-2 md:w-auto text-center xl:text-xl md:text-lg text-base font-bold text-white transition-all duration-200 bg-zBlack bg-opacity-60 align-middle hover:rounded-tl-lg hover:rounded-br-lg rounded-tr-lg rounded-bl-lg  border-2'>
                        {key.title}
                      </a>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider(
    
    {
      loop: true,
      created() {
        setLoaded(true)
      },
      initial: 0,
    }
  )

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div ref={sliderRef}
        className="keen-slider md:max-w-[80vw] mx-auto w-full aspect-video rounded-xl flex-1 drop-shadow-md">
        {
          carouselImg.map((key, value) => 
            <div className="keen-slider__slide">
              <img className='w-full h-full object-cover' src={key}/>
            </div>
          )
        }
      
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
  }) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`md:w-[30px] md:h-[30px] md:visible invisible top-1/2 -translate-y-1/2 absolute hover:cursor-pointer fill-white ${
        props.left ? "left-1" : "right-1"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

export default HomePage;