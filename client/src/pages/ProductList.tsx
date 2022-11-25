
import React from 'react'
import { Products } from '../components';



const ProductList = () => {
  return (
    <div className="">
        <h1 className="m-5">

        </h1>
        <div className='flex justify-between '>
            <div className="m-5 flex flex-col md:block">
                <span className='text-xl font-semibold md:mr-5 mr-0'>
                    Filter products:
                </span>
                <select name="color" id="color" className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer">
                    <option value="" disabled selected>
                        Color
                    </option> 
                    <option className='capitalize cursor-pointer' value="red">Red</option>
                    <option className='capitalize cursor-pointer' value="green">green</option>
                    <option className='capitalize cursor-pointer' value="blue">blue</option>
                    <option className='capitalize cursor-pointer' value="pink">pink</option>
                    <option className='capitalize cursor-pointer' value="yellow">yellow</option>
                    <option className='capitalize cursor-pointer' value="orange">orange</option>
                </select>
                <select name="size" id="size" className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer">
                    <option value="" disabled selected className='capitalize'>
                        size
                    </option> 
                    <option className='capitalize cursor-pointer' value="XS">XS</option>
                    <option className='capitalize cursor-pointer' value="S">S</option>
                    <option className='capitalize cursor-pointer' value="M">M</option>
                    <option className='capitalize cursor-pointer' value="L">L</option>
                    <option className='capitalize cursor-pointer' value="XL">XL</option>
                    <option className='capitalize cursor-pointer' value="XXL">XXL</option>
                </select>
            </div>

            <div className="m-5 flex flex-col md:block">
                <span className='text-xl font-semibold mr-0 md:mr-5'>
                    Sort products:
                </span>
                <select name="products" id="products" className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer ">
                    <option value="newest" selected>Newest</option>
                    <option value=""> Price (asc) </option>
                    <option value=""> Price (desc) </option>
                </select>
            </div>
        </div>
        <Products />
    </div>
  )
}



export default ProductList;