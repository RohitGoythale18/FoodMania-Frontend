import { Link, NavLink } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const Navbar = ({ open, setOpen }) => {
    return (
        <>
            <nav className="md:flex hidden md:bg-black md:opacity-80 z-20 absolute top-0 w-full items-center justify-between text-white px-5">
                <div>
                    <Link
                        to='/'
                        className="flex items-center my-1"
                    >
                        <img src="/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-16 w-16 mr-2" />
                        <span className="text-4xl text-[#16cc95f3] font-bold">FoodMania</span>
                    </Link>
                </div>
                <div className="flex justify-between w-[30vw] text-lg font-semibold">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/sweets">Sweets</NavLink>
                    <NavLink to="/spices">Spices</NavLink>
                    <NavLink to="/soups">Soups</NavLink>
                    <NavLink to="/non-veg">Non Veg</NavLink>
                </div>
                <div className="flex justify-between items-center w-48 mr-5 text-lg font-semibold">
                    <NavLink to="/">About Us</NavLink>
                    <NavLink to="/contact-us">Contact Us</NavLink>
                </div>
            </nav>

            {/* Responsive Sidebar */}
            <nav className={`bg-slate-600 text-white w-[80%] h-screen z-10 duration-500 fixed top-0 ${open ? "left-0" : "left-[-100%]"}`}>
                <IoIosClose
                    className='size-10 absolute top-2 right-1 text-3xl text-[#20c997]  cursor-pointer'
                    onClick={() => setOpen(false)}
                />
                <div className="flex flex-col">
                    <div className="mt-3 ml-2">
                        <Link to='/' className="flex items-center p-2">
                            <img src="/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-16 w-16 mr-2" />
                            <span className="text-4xl text-[#16cc95f3] font-bold">FoodMania</span>
                        </Link>
                    </div>
                    <div className="flex flex-col space-y-2 py-4 px-6 text-xl font-semibold">
                        <NavLink to="/" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Home</NavLink>
                        <NavLink to="/sweets" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Sweets</NavLink>
                        <NavLink to="/spices" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Spices</NavLink>
                        <NavLink to="/soups" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Soups</NavLink>
                        <NavLink to="/non-veg" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Non Veg</NavLink>
                        <NavLink to="/" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>About</NavLink>
                        <NavLink to="/contact-us" className="hover:text-[#20c997] p-2" onClick={() => setOpen(false)}>Contact</NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
