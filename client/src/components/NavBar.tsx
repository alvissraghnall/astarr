import React, { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/cart";

const ShoppingCartBadge = () => {
    const quantity = useSelector((state: RootState) => state.cart.quantity);
    return (
    <button type="button" className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <ShoppingCartIcon />
        <span className="sr-only">Cart</span>
        <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">8</div>
    </button>
)
}

const NavBar = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: FormEvent) => {

    }

    return (
        <div className="md:h-[60px] h-[40px]">
            <div className="flex justify-between flex-row items-center md:px-3 px-0">
                <div className="flex-1 flex items-center">
                    <span className="cursor-pointer hidden md:inline-block text-sm uppercase">
                        en
                    </span>
                    <div className="w-full">
                        <form
                            className="p-2 text-gray-400 focus-within:text-gray-600"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <label 
                                htmlFor="search-field" 
                                className="sr-only">
                                    Search all songs
                            </label>
                            <div className="flex items-center justify-start flex-row">
                                <FiSearch
                                    className="w-5 h-5 ml-4"
                                />
                                <input
                                    name="search-field"
                                    autoComplete="off"
                                    id="search-field"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4 md:w-full w-[50px]"
                                />
                            </div>
                            
                        </form>
                    
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="font-bold text-2xl text-center">
                        ASKARR.
                    </h1>
                </div>
                <div className="flex-[2] flex items-center justify-center md:justify-end">
                    <div className="md:ml-6 ml-2.5 cursor-pointer md:text-sm text-xs uppercase">
                        register
                    </div>
                    <div className="md:ml-6 ml-2.5 cursor-pointer md:text-sm text-xs uppercase">
                        sign in
                    </div>
                    <div className="md:ml-6 ml-2.5 cursor-pointer md:text-sm text-xs uppercase">
                        <ShoppingCartBadge />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;