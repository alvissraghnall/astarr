import { AiOutlineSend } from "react-icons/ai";

const OurNewsletter = () => {

    return (
        <div className="h-[60vh] flex-col bg-[#fcf5f5] flex justify-center items-center">
            <h1 className="capitalize mb-5 text-7xl">
                newsletter
            </h1>
            <div className="text-2xl mb-5 font-light text-center">
                Get important updates concerning your selected favorite merchandise.
            </div>
            <div className="w-4/5 md:w-1/2 justify-between flex bg-white h-10 border-[1px] border-solid border-gray-500">
                <input 
                    type="text" 
                    placeholder="Enter your email"
                    className="border-none flex-[8] pl-5"
                />
                <button className="flex-[1] flex justify-center items-center text-white border-none bg-[teal]">
                    <AiOutlineSend className="text-base font-bold ml-2 h-3/5 w-9/12" />
                </button>
            </div>
        </div>
    )
}

export default OurNewsletter;