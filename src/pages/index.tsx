import { type NextPage } from "next";


const HomePage: NextPage = () => {
  var luckyRotate = 5;
  return (
    <>
    <div>
      <div className="bg-lime-500 relative w-full min-h-[40vh] flex justify-between md:flex-row flex-col mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-white <-TEMPORÄR_TA_BORT! md:w-1/2 flex flex-col gap-4">
          <div className="xl:text-4xl md:text-2xl text-base font-bold">
            Välkommen till Automation och Mekatronik på Chalmers tekniska högskola!
          </div>
          <div className="xl:text-xl md:text-base text-sm">
            Z-teknologsektionen, eller Z som programmet kallas, är civilingengörsprogrammet på Chalmers som beskrivs som länken mellan maskin-, elektro och datateknik.
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-orange-500 max-w-[80vw] mx-auto w-full aspect-video">

          </div>
        </div>
        
      </div>
      
      <div className="relative w-full h-screen">
        <img src="./lucky_horizontal.png" className={`z-20 left-1/2 transform -translate-x-1/2 absolute xl:-top-[7.5vh] md:-top-[5vh] -top-[2.5vh] xl:h-[15vh] md:h-[10vh] h-[5vh] w-auto -rotate-[4.5deg]`} height={120}  width={360} />
        <div className="w-full h-full xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)]">
          <img className="w-full h-full object-cover" src="https://media.istockphoto.com/id/1290656529/photo/robotic-pneumatic-piston-sucker-unit-on-industrial-machine.jpg?s=612x612&w=0&k=20&c=KfRjZlT6CEX8KpOXylDu_3ggvOftlQF3yh5JVT2KFUw="/>
     
        </div>
      </div>

      <div className="relative w-full h-screen bg-lime-600">
      </div>
    </div>
    </>
  );
};

export default HomePage;
