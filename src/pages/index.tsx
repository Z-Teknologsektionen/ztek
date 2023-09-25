import { type NextPage } from "next";

const HomePage: NextPage = () => {
  var luckyRotate = 5;
  return (
    <>
    <div>
      <div className="bg-lime-500 relative w-full min-h-[35vh] flex justify-between md:flex-row flex-col mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-500 w-1/2 flex flex-col gap-4">
          <div className="bg-sky-500 text-4xl">
            Välkommen till Automation och Mekatronik på Chalmers tekniska högskola!
          </div>
          <div className="bg-rose-500  text-xl">
            Z-teknologsektionen, eller Z som programmet kallas, är civilingengörsprogrammet på Chalmers som beskrivs som länken mellan maskin-, elektro och datateknik.
          </div>
        </div>
        <div className="bg-purple-500 flex-1 flex justify-end">
          <div className="bg-white aspect-video">

          </div>
        </div>
        
      </div>
      
      <div className="relative w-full">
        <div className="absolute w-full xl:h-[20vh] md:h-[15vh] h-[10vh] top-0">
          <div className="bg-white w-full h-full [clip-path:polygon(0%_0%,100%_0%,0%_100%)]">
          
          </div>
          <img src="./lucky_horizontal.png" className={`z-20 left-1/2 absolute -top-[60px] -rotate-[6deg]`} height={120}  width={360} />
        </div>
        <img src="https://media.istockphoto.com/id/1290656529/photo/robotic-pneumatic-piston-sucker-unit-on-industrial-machine.jpg?s=612x612&w=0&k=20&c=KfRjZlT6CEX8KpOXylDu_3ggvOftlQF3yh5JVT2KFUw=" className="w-full h-auto" />
      </div>
    </div>
    </>
  );
};

export default HomePage;
