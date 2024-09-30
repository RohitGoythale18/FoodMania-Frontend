import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { IoIosMenu } from "react-icons/io";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="md:hidden">
                <div className="w-full absolute z-20">
                    {!open && (
                        <IoIosMenu
                            className='size-9 absolute top-4 left-4 text-[#16cc95f3] cursor-pointer'
                            onClick={() => setOpen(true)}
                        />
                    )}
                    <Navbar open={open} setOpen={setOpen} />
                    <Link
                        to='/'
                        className="flex justify-center items-center py-1"
                    >
                        <img src="public/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-14 w-14 mr-2" />
                        <span className="text-[2.5rem] text-[#16cc95f3] font-bold">FoodMania</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;