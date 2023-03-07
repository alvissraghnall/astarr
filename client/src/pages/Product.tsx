import { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import images from "../assets";
import { cartActions } from "../redux/cart";
import { getProduct, PUBLIC_REQ } from "../services";
import { Product as ProductType } from "../types/Product";

export enum QuantityChange {
    DECREASE,
    INCREASE
}

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState<ProductType | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState();
    const [size, setSize] = useState();

    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(cartActions.addProduct(
            product
        ));

        toast.success("Product successfully added to cart!");
        // alert("Added to cart!");
    }

    const handleQuantityChange = (type: QuantityChange, value?: number) => {
        switch(type) {
            case QuantityChange.DECREASE:
                quantity >= 1 && setQuantity(prev => prev - 1);
            
            case QuantityChange.INCREASE: 
                setQuantity(prev => value ? value : prev + 1);
        }
    }

    useEffect(() => {
        const ran = async () => {
            try {
                const prod = await getProduct(id);
                setProduct(prod);
            } catch (error) {
                console.error(error);
            }
        }
        ran();
    }, [id]);

    return (
        <div className="md:p-12 p-4 pt-6 flex flex-col md:flex-row">
            <div className="flex-1">
                <img src={images["products"].product_10} alt="product" className="w-full h0[40vh] md:h-4/5 object-fill md:object-cover" />
            </div>

            <div className="flex-1 py-2.5 md:py-0 px-2.5 md:px-12">
                <h1 className="font-light">
                    Lorem ipsum dolor
                </h1>
                <div className="my-5 mx-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque minima dignissimos cum nam animi illo excepturi error minus unde quidem officia, ratione ea voluptatibus eligendi repudiandae mollitia hic quibusdam, consectetur sed. Temporibus quisquam facere laborum voluptate quasi sunt animi ipsam voluptatem, velit eaque numquam aliquam nisi quidem excepturi eligendi.
                </div>
                <span className="font-[100] text-4xl">
                    $43
                </span>

                <div className="flex justify-between w-full md:w-1/2 my-8 mx-0">
                    <div className="flex items-center mr-2">
                        <span className=" text-xl font-[200]"> Size: </span>
                        <select className="ml-2.5 p-1">
                            <option className='capitalize cursor-pointer' value="XS">XS</option>
                            <option className='capitalize cursor-pointer' value="S">S</option>
                            <option className='capitalize cursor-pointer' value="M">M</option>
                            <option className='capitalize cursor-pointer' value="L">L</option>
                            <option className='capitalize cursor-pointer' value="XL">XL</option>
                            <option className='capitalize cursor-pointer' value="XXL">XXL</option>
                
                        </select>
                    </div>
                    <div className="flex items-center ">
                        <span className=" text-xl font-[200]"> Colour:  </span>
                        <div className="w-5 h-5 rounded-[50%] bg-[#28b2ed] my-0 mx-1 cursor-pointer"></div>
                        <div className="w-5 h-5 rounded-[50%] bg-[#e932ba] my-0 mx-1 cursor-pointer"></div>
                        <div className="w-5 h-5 rounded-[50%] bg-[#000000] my-0 mx-1 cursor-pointer"></div>
                    </div>
                </div>

                <div className="flex items-center w-full md:w-1/2 justify-between">
                    { /* add container */}
                    <div className="items-center flex font-bold">
                        { /** amount container */}
                        <MdOutlineRemoveShoppingCart size={28} className="cursor-pointer" />
                        <input 
                            className="justify-center my-0 mx-1 w-8 h-8 rounded-lg border-2 border-solid border-teal-400 flex items-center" 
                            value={quantity} 
                            type="number"
                            onChange={ev => handleQuantityChange(QuantityChange.INCREASE, Number.parseInt(ev.target.value))} 
                        />
                        <MdOutlineAddShoppingCart size={28} className="cursor-pointer" />
                    </div>
                    <button className="uppercase border-solid border-teal-500 font-medium p-4 rounded-sm bg-white cursor-pointer hover:bg-[#f9f4f2]" onClick={addToCart}>
                        add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Product;