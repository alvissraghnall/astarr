import React, { useEffect, useState } from 'react'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { productItems } from "../assets/constants";
import images from "../assets";
import { getProducts } from '../services';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cart';
import { toast } from 'react-toastify';
import { splitArrayIntoChunks } from '../util/split-array';

interface ProductItem {
    item: {
        id: number,
        img: string
    }
}

interface ProductsProps {
    cat?: string;
    filters?: {
        color: string,
        size: string
    },
    sort?: string
}

const Item = ({ item }: ProductItem) => {

    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(cartActions.addProduct(
            item
        ));

        toast.success("Product successfully added to cart!");
        // alert("Added to cart!");
    }

    return (
        <div className="group flex-[1_0_100%] sm:flex-[1_0_50%] md:flex-[1_0_33%] flex items-center justify-center relative hover:-translate-y-1 hover:scale-100">
            <div className="bg-white/95 absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-45 duration-300 ease-in transition-opacity">

            </div>
            <img
                src={(images as any)["products"][item.img]}
                alt={`Product Item ${item.id}`}
                className='h-full max-w-full rounded-lg'
            />

            <div className="w-full h-full cursor-pointer flex items-center justify-center z-20 top-0 left-0 opacity-0 absolute transition-all ease-in-out duration-700 delay-100 bg-[#00000033] group-hover:opacity-100 rounded-lg">
                <div className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer" onClick={addToCart}>
                    <AiOutlineShoppingCart />
                </div>
                <Link to={`/product/${item.id}`} className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer">
                    <div>
                        <AiOutlineSearch />
                    </div>
                </Link>
                <div className="items-center m-3 w-10 rounded-[50%] flex justify-center transition-all duration-700 ease-in-out bg-white/95 h-10 hover:bg-[#e9f5f5] hover:scale-[1.1] cursor-pointer">
                    <MdOutlineFavoriteBorder />
                </div>
            </div>
        </div>
    )
}

const getSortedProducts = (products: any[], sort?: string) => products.sort(
    (a: any, b: any) => 
        sort === "newest"
            ? a.createdAt - b.createdAt
            : sort === "asc"
                ? a.price - b.price
                : b.price - a.price
    );

    const getFilteredProducts = (products: ProductItem["item"][], filters?: ProductsProps["filters"]) => {
        if (!filters) {
            return products;
        }
    
        const filtered = products.filter(prod =>
            Object.entries(filters).every(([key, value]) =>
                (prod as unknown as { [s: string]: string })[key].includes(value)
            )
        );
    
        console.log(filtered);
        return filtered;
    };
const Products = ({ cat, filters, sort }: ProductsProps) => {
    console.log(cat, filters, sort);

    const [products, setProducts] = useState(productItems);
    // console.log(products);

    useEffect(() => {
        try {
            getProducts(cat);
        } catch (error) {
            console.error(error);
        }
        console.log("in products useeffect.");

    }, [cat]);

    const filteredProducts = getFilteredProducts(products, filters);

    const sortedProducts = getSortedProducts(products, sort)
    const splitProducts = splitArrayIntoChunks(products, 3);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {
                splitProducts.map(productsChunk => (
                    <div className="grid gap-4">
                        {
                            productsChunk.map(prod => (
                                <Item
                                    key={prod.id}
                                    item={prod}
                                />
                            ))
                        }
                    </div>
                ))
            }
            {
                /**cat
                    ? filteredProducts.map((item: any) => (
                        <Item
                            key={item.id}
                            item={item}
                        />))
                    : productItems.map(item => (
                        <Item
                            key={item.id}
                            item={item}
                        />
                    )) */
            }
        </div>
    )
}

export default Products;