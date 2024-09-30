import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import Sidebar from "../sidebar/Sidebar";
import AdminHeader from "../adminHeader/AdminHeader";

const ResponsiveHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="md:hidden">
                <div className="w-full absolute z-20">
                    <IoIosMenu
                        className='size-9 absolute top-4 left-4 text-[#16cc95f3] cursor-pointer'
                        onClick={() => setOpen(true)}
                    />
                    <Sidebar open={open} setOpen={setOpen} />
                    <AdminHeader />
                </div>
            </div>
        </>
    )
}

export default ResponsiveHeader;