import React from "react";
import images from "../assets";
import { collectionItems } from "../assets/constants";


import {
    Swiper, SwiperSlide
} from "swiper/react/swiper-react.js";
import 'swiper/swiper-bundle.css';

import { FreeMode } from "swiper";
import { Link } from "react-router-dom";

interface ItemProps {
    item: {
        id: number,
        img: string,
        title: string,
        cat: string
    }
}

const Item = ({ item }: ItemProps) => {
    return ( 
        <div className="flex-1 m-1 h-[70vh] relative">
            <Link to={`/products/${item.cat}`}>
            
            <img 
                className="w-full h-full object-cover" 
                alt={item.title} 
                src={(images as any)["collections"][item.img]}
                />

            <div className="absolute w-full mt-11 h-full top-0 left-0 flex items-center justify-center flex-col">

                {/* info */}
                <h1 className="text-white text-4xl uppercase mb-5">
                    { item.title }
                </h1>

                <button className="p-2.5 border-none bg-white/95 cursor-pointer uppercase text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    shop now
                </button>
            </div>
            </Link>≥
        </div>
    );

}


const Collections = () => {

    return (
        <div className="flex mt-5 md:p-5 justify-between flex-row p-0">
            <Swiper
                spaceBetween={50}
                slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
            >
                { collectionItems.map(item => (
                    
                    <SwiperSlide 
                        key={item.id}
                        style={{ width: '25%', height: 'auto' }}
                        className="shadow-lg animate-slideright"
                    >
                        <Item
                            item={item}
                        />
                    </SwiperSlide>
                    
                ))}
            </Swiper>

        </div>
    )
}

export default Collections;