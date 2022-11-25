import React from 'react'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { productItems } from "../assets/constants";
import images from "../assets";

interface ProductItem {
    item: {
        id: number,
        img: string
    }
}

const Item = ({ item }: ProductItem) => (
    <div className="group flex-1 min-w-[200px] flex items-center justify-center relative hover:-translate-y-1 hover:scale-95">
        <div className="bg-white/95 absolute w-48 h-48 rounded-full">

        </div>
        <img 
            src={(images as any)["products"][item.img]}
            alt={`Product Item ${item.id}`}
            className='z-10 h-4/5 object-cover w-full'
        />

        <div className="w-full cursor-pointer flex items-center justify-center z-20 top-0 left-0 opacity-0 absolute transition-all ease-in-out duration-700 delay-100 bg-[#00000033] group-hover:opacity-100 mt-[2.4em] h-4/5">
            <div className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer">
                <AiOutlineShoppingCart />
            </div>
            <div className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer">
                <AiOutlineSearch />
            </div>
            <div className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer">
                <MdOutlineFavoriteBorder />
            </div>
        </div>
    </div>
)

const Products = () => {
  return (
    <div className='flex p-5 justify-between flex-wrap flex-col sm:flex-row'>
        {productItems.map(item => (
            <Item
                key={item.id}
                item={item}
            />
        ))}
    </div>
  )
}

export default Products;