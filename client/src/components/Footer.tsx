
import {
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiTwitch
} from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
    return (
    <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex p-5 flex-col bg-[#fcf5f5]">
            {/* left */}
            <h1>
                {/* logo */}
                ASTARR.
            </h1>
            <p className="my-5 mx-0">
                {/* desc */}
                Astarr. is a clothing store perfectly designed to suit your fashion needs & desires. It's built atop of CRA, and its data served through a loopback 4 REST pipeline.
            </p>
            <div className="flex">
                {/* social container  */}
                <div className="text-white w-10 h-10 rounded-[50%] flex items-center justify-center mr-5 bg-[#3b5999]">
                    {/* facebook */}
                    <FiFacebook />
                </div>
                <div className="text-white w-10 h-10 rounded-[50%] flex items-center justify-center mr-5 bg-[#55acee]">
                    {/* twitter */}
                    <FiTwitter />
                </div>
                <div className="text-white w-10 h-10 rounded-[50%] flex items-center justify-center mr-5 bg-[#e4405f]">
                    {/* instagram */}
                    <FiInstagram />
                </div>
                <div className="text-white w-10 h-10 rounded-[50%] flex items-center justify-center mr-5 bg-[#e60023]">
                    {/* pinterest */}
                    <FiTwitch />
                </div>
            </div>
        </div>
        <div className="flex-1 p-5 hidden text-center md:block">
            {/* center  */}
            <h3 className="mb-7 5">
                Useful Links
            </h3>
            <ul className="m-0 p-0 list-none flex flex-wrap">
                <li className="mb-2.5 w-1/2"> Home </li>
                <li className="mb-2.5 w-1/2"> Cart </li>
                <li className="mb-2.5 w-1/2"> Order Status </li>
                <li className="mb-2.5 w-1/2"> About Us </li>
                <li className="mb-2.5 w-1/2"> Investors </li>
                <li className="mb-2.5 w-1/2"> Blog </li>
                <li className="mb-2.5 w-1/2"> Careers </li>
                <li className="mb-2.5 w-1/2"> News </li>
                <li className="mb-2.5 w-1/2"> Payment Options </li>
                <li className="mb-2.5 w-1/2"> FAQ </li>
                <li className="mb-2.5 w-1/2"> Shipping & Delivery </li>
                <li className="mb-2.5 w-1/2"> Gift Cards </li>
            </ul>
        </div>
        <div className="flex-1 p-5 bg-[#fcf5f5]">
            {/* right  */}
            <h3 className="mb-7 5">
                Contact Us
            </h3>
            <div className="mb-5 flex items-center">
                <TiLocation className="mr-2.5" /> 93 Sam Toby Route, Wellington Brown's, Queenstown.
            </div>
            <div className="mb-5 flex items-center">
                <AiOutlinePhone className="mr-2.5" /> +738 379 121
            </div>
            <div className="mb-5 flex items-center">
                <AiOutlineMail className="mr-2.5" /> contact@astarr.shop
            </div>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" className="w-1/2" />
        </div>
    </div>
    );
}

export default Footer;