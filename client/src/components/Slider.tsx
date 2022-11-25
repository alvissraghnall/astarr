import { useState } from "react";
import { 
    BsArrowLeftCircleFill,
    BsArrowRightCircleFill
} from "react-icons/bs";
import { sliderItems } from "../assets/constants";
import images from "../assets";


enum Direction {
    LEFT = "left",
    RIGHT = "right"
}

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction: Direction) => {
        
        direction === Direction.LEFT ? setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 6) : setSlideIndex(slideIndex < 6 ? slideIndex + 1 : 0);
    };

    // const slide = {
    //     id: 1,
    //     bg: "fff",
    //     title: "Sale Happy",
    //     desc: "ahj dbsa khja hbd sjah dshfjksjuew iwhbe"
    // }

    return ( 
        <div className="w-full md:h-[80vh] relative overflow-hidden hidden md:flex">
            <div className="w-[60px] bg-[#fff8g9] rounded-full flex items-center justify-center absolute top-0 bottom-0 m-auto left-2.5 cursor-pointer opacity-50 z-10" onClick={() => handleClick(Direction.LEFT)}>
                <BsArrowLeftCircleFill
                    className="h-6 w-6"
                />
            </div>

            <div className={`h-full flex transition-all duration-1000 ease-in-out hover:-translate-y-1 hover:scale-110 delay-100`} style={{ transform: `translateX(${slideIndex * -100}vw)` }}>
                
                    {
                        sliderItems.map(slide => (
                            <div className={`flex items-center h-screen w-screen`} key={slide.id} style={{ backgroundColor: `#${slide.bg}` }}>
                                <div className="flex-1 h-full">
                                    {/** image */}
                                    <img
                                        src={(images as any)[slide.img]}
                                        // src={images.alteClothing}
                                        className="h-4/5 w-full mx-auto object-fill"
                                    />
                                </div>
                                <div className="flex-1 p-12">
                                    {/* info */}
                                    <div className="text-7xl capitalize">{slide.title}</div>
                                    <div className="uppercase mx-0 mt-[2rem] mb-[2.1rem] text-xl font-medium tracking-wider">{slide.desc}</div>
                                    <button className="uppercase p-2.5 text-xl cursor-pointer transition ease-in-out delay-150 bg-blue-700 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300">shop now</button>
                                </div>
                            </div>
                        ))
                    } 
                    {/* slide */}
                
            </div>

            <div className="w-[60px] bg-[#fff8g9] rounded-full flex items-center justify-center absolute top-0 bottom-0 m-auto right-2.5 cursor-pointer opacity-50 z-10" onClick={() => handleClick(Direction.RIGHT)}>
                <BsArrowRightCircleFill
                    className="h-6 w-6"
                />
            </div>
        </div>
    );
}
 
export default Slider;