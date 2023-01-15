
import { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Products } from '../components';



const ProductList = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    color: "",
    size: ""
  });
  const [sort, setSort] = useState("newest");

  const category = location.pathname.split("/")[2];

  const handleFilterChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const val = ev.target.value;
    setFilters({
        ...filters,
        [ev.target.name]: val
    });
  }

  return (
    <div className="">
        <h1 className="m-5">

        </h1>
        <div className='flex justify-between '>
            <div className="m-5 flex flex-col md:block">
                <span className='text-xl font-semibold md:mr-5 mr-0'>
                    Filter products:
                </span>
                <select name="color" className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer" onChange={handleFilterChange}>
                    <option value="" disabled>
                        Color
                    </option> 
                    <option className='capitalize cursor-pointer' value="red">Red</option>
                    <option className='capitalize cursor-pointer' value="green">green</option>
                    <option className='capitalize cursor-pointer' value="blue">blue</option>
                    <option className='capitalize cursor-pointer' value="pink">pink</option>
                    <option className='capitalize cursor-pointer' value="yellow">yellow</option>
                    <option className='capitalize cursor-pointer' value="orange">orange</option>
                </select>
                <select name="size" className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer" onChange={handleFilterChange}>
                    <option value="" disabled className='capitalize'>
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
                <select 
                    name="products" 
                    id="products" 
                    className="p-2.5 md:mr-5 my-2.5 mx-0 cursor-pointer "
                    onChange={ev => setSort(ev.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="asc"> Price (asc) </option>
                    <option value="desc"> Price (desc) </option>
                </select>
            </div>
        </div>
        <Products 
            cat={category}        
            filters={filters}
            sort={sort}
        />
    </div>
  )
}



export default ProductList;