import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { type NextPage } from "next";
import React, { useEffect, useState } from "react";

const CarouselImg = [
  "https://zfoto.ztek.se/img/full/20230902-DH6_7840.jpg",
  "https://zfoto.ztek.se/img/full/20230908-DH8_8364.jpg",
  "https://zfoto.ztek.se/img/full/20230904-DH8_8302.jpg",
]

const Sponsors = [
  { img: "./cpac.png", rel_height: "h-[14vh]", href: "https://cpacsystems.se/" },
  { img: "./TetraPak.png", rel_height: "h-[20vh]", href: "https://www.tetrapak.com/" },
]

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
        className="keen-slider max-w-[80vw] mx-auto w-full aspect-video rounded-xl flex-1 drop-shadow-md">
        {
          CarouselImg.map((key, value) => 
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
      className={`w-[30px] h-[30px] top-1/2 -translate-y-1/2 absolute hover:cursor-pointer fill-white ${
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

const HomePage: NextPage = () => {
  return (
    <>
    <div>
      <div className='mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8'>

      
        <div className="sticky w-full flex justify-between md:flex-row flex-col mx-auto max-w-[120rem] z-10">
          <div className="md:w-1/2">
            <div className='flex flex-col gap-4'>
              <div className="xl:text-4xl md:text-2xl text-base font-bold">
                Välkommen till Automation och Mekatronik på Chalmers tekniska högskola!
              </div>
              <div className="xl:text-xl md:text-base text-sm text-balance">
                Z-teknologsektionen, eller Z som programmet kallas, är civilingengörsprogrammet på Chalmers som beskrivs som länken mellan maskin-, elektro och datateknik.
              </div>
            </div>
            
            <div className="relative w-full max-w-[120rem] mt-10 h-10">
              <div className="absolute flex md:mx-0 md:flex-col flex-row gap-5">

                {
                  Sponsors.map((key, value) =>
                    <a className='' href={key.href}  target="_blank">
                      <img src={key.img} className={`mx-auto ` + key.rel_height + ` drop-shadow-md`}/>
                    </a>
                  )
                }
                
              </div>
            </div>
          </div>
          <Carousel/>
          <img src="./lucky_horizontal.png" className={`z-20 left-1/2 transform -translate-x-1/2 absolute xl:-bottom-[calc(7.5vh+40px)] md:-bottom-[calc(5vh+40px)] -bottom-[calc(2.5vh+40px)] xl:h-[15vh] md:h-[10vh] h-[5vh] w-auto -rotate-[4.5deg] drop-shadow-md`} height={120}  width={360} />
        </div>
        
      </div>
      
      <div className="relative w-full h-screen drop-shadow-xl">
        
        <div className="w-full h-full xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)]">
          <img className="w-full h-full object-cover" src="https://media.istockphoto.com/id/1290656529/photo/robotic-pneumatic-piston-sucker-unit-on-industrial-machine.jpg?s=612x612&w=0&k=20&c=KfRjZlT6CEX8KpOXylDu_3ggvOftlQF3yh5JVT2KFUw="/>
     
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
