import { IoIosClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import AdminHeader from "../adminHeader/AdminHeader";
import Logout from "../logout/Logout";

const Sidebar = ({ open, setOpen }) => {
    return (
        <>
            <nav className="h-screen md:flex flex-col hidden item-center bg-black opacity-80 py-2 min-w-64">
                <AdminHeader />
                <div className="flex flex-col space-y-2 py-4 px-6 text-xl text-white font-semibold">
                    <NavLink to="/dashboard" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/dashboard/manage-sweets" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Sweets</NavLink>
                    <NavLink to="/dashboard/manage-spices" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Spices</NavLink>
                    <NavLink to="/dashboard/manage-soups" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Soups</NavLink>
                    <NavLink to="/dashboard/manage-non-veg" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Non Veg</NavLink>
                    <NavLink to="/dashboard/feedback" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Feedback</NavLink>
                </div>
                <Logout />
            </nav>

            {/* Responsive Sidebar */}
            <nav className={`bg-slate-600 text-white w-[80%] h-screen z-10 duration-500 fixed top-0 ${open ? "left-0" : "left-[-100%]"}`}>
                <IoIosClose
                    className='size-10 absolute top-2 right-1 text-3xl text-[#20c997]  cursor-pointer'
                    onClick={() => setOpen(false)}
                />
                <div className="flex flex-col h-full">
                    <div className="mt-3 ml-2">
                        <Link to='/' className="flex items-center p-2">
                            <img src="/public/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-16 w-16 mr-2" />
                            <span className="text-4xl text-[#16cc95f3] font-bold">FoodMania</span>
                        </Link>
                    </div>
                    <div className="flex flex-col space-y-2 py-4 px-6 text-xl font-semibold">
                        <NavLink to="/dashboard" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Dashboard</NavLink>
                        <NavLink to="/dashboard/manage-sweets" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Sweets</NavLink>
                        <NavLink to="/dashboard/manage-spices" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Spices</NavLink>
                        <NavLink to="/dashboard/manage-soups" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Soups</NavLink>
                        <NavLink to="/dashboard/manage-non-veg" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Non Veg</NavLink>
                        <NavLink to="/dashboard/feedback" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Feedback</NavLink>
                    </div>
                    <div>
                        <Logout />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar;