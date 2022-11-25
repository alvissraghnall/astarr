import { MdAdd, MdRemove } from "react-icons/md";

const Cart = () => {
    return (
        <div className="p-2.5 md:p-5 py-8">
            <h1 className="uppercase font-semibold text-center"> your cart </h1>
            <div className="flex items-center justify-between p-5">

                <button className="font-semibold uppercase p-2.5 cursor-pointer">
                    continue shopping
                </button>
                <div className="hidden md:inline-block">
                    <span className="underline cursor-pointer my-0 mx-2.5"> Shopping Cart [5] </span>
                    <span className="underline cursor-pointer my-0 mx-2.5"> Wishlist </span>
                </div>
                <button className="font-semibold uppercase p-2.5 cursor-pointer border-none bg-black text-white/80">
                    checkout now
                </button>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
                <div className="flex-[3]">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-[2]">
                            <img src="https://wwww.fye.com/dw/image/v2/BBNF_PRD/on/demandware.static/-/Sites-fye-master/default/dw35e93ccf/stylin/ts_/ts_zel/stylin.ts_zelda_legend_link.6.3x_0.jpg?sw=1000" alt="" width={200} />
                            <div className="flex flex-col p-5 justify-around">
                                <span> <b> Product Name: </b> Anime T-Shirt </span>
                                <div className="w-5 h-5 rounded-[50%] bg-blue-700"></div>
                                <span> <b> Product Size: </b> M </span>
                            </div>
                        </div>
                        <div className="flex flex-[1] flex-col items-center justify-center">
                            <div className="flex items-center mb-5">
                                <MdAdd />
                                <div className="md:m-1 mx-4 my-1 text-2xl">
                                    3
                                </div>
                                <MdRemove />
                            </div>
                            <div className="text-3xl font-light mb-5 md:mb-0">
                                $ 78
                            </div>
                        </div>
                    </div>

                    <hr className="border-none h-px bg-[#eee]" />

                    <div className="flex justify-between flex-col md:flex-row">
                        <div className="flex flex-[2]">
                            <img src="https://wwww.fye.com/dw/image/v2/BBNF_PRD/on/demandware.static/-/Sites-fye-master/default/dw35e93ccf/stylin/ts_/ts_zel/stylin.ts_zelda_legend_link.6.3x_0.jpg?sw=1000" alt="" width={200} />
                            <div className="flex flex-col p-5 justify-around">
                                <span> <b> Product Name: </b> Anime T-Shirt </span>
                                <div className="w-5 h-5 rounded-[50%] bg-blue-700"></div>
                                <span> <b> Product Size: </b> XL </span>
                            </div>
                        </div>
                        <div className="flex flex-[1] flex-col items-center justify-center">
                            <div className="flex items-center mb-5">
                                <MdAdd className="cursor-pointer mx-1" />
                                <div className="md:m-1 mx-4 my-1 text-2xl">
                                    1
                                </div>
                                <MdRemove className="cursor-pointer mx-1" />
                            </div>
                            <div className="text-3xl font-light mb-5 md:mb-0">
                                $ 22
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-[1] border-solid border-gray-400 rounded-lg border-[0.5px] p-5 h-[50vh]">
                    <h1 className="font-extralight uppercase"> order summary </h1>
                    <div className="flex justify-between my-3 mx-0">
                        <span> Subtotal </span>
                        <span> $ 80 </span>
                    </div>
                    <div className="flex capitalize justify-between my-3 mx-0">
                        <span> estimated shipping </span>
                        <span> $ 8.92 </span>
                    </div>
                    <div className="flex capitalize justify-between my-3 mx-0">
                        <span> shipping discount </span>
                        <span> $ -3.70 </span>
                    </div>
                    <div className="flex justify-between my-3 mx-0 font-bold text-2xl">
                        <span className="capitalize"> total </span>
                        <span> $ 85.22 </span>
                    </div>

                    <button className="w-full p-2.5 bg-stone-800 inline-block text-sm leading-tight shadow-md hover:bg-neutral-900 hover:shadow-lg focus:bg-neutral-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-200 ease-in-out text-white font-semibold uppercase clip-path:polygon(20% 0%, 100 0, 100% 100%, 0% 100%)">
                        checkout now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;