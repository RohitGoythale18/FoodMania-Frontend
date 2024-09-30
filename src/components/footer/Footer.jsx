import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="bg-slate-700 pt-4 relative">
                <div className="">
                    <Link
                        to='/'
                        className="flex justify-center items-center py-1"
                    >
                        <img src="/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-14 w-14 mr-2 md:h-20 md:w-20" />
                        <span className="text-4xl text-[#16cc95f3] font-bold md:text-5xl">FoodMania</span>
                    </Link>
                </div>
                <div>
                    <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">About Us</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Navigation</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Site Map</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Popular Posts</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Recent Comments</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Privacy Policy</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Newsletter Signup</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Contact Information</Link>
                        <Link to="/" className="footer-tabs text-gray-400 hover:text-white">Terms of Service</Link>
                    </footer>
                </div>
                <div className="p-4 text-center text-gray-400">
                    &copy; FoodMania 2023 | All rights reserved.
                </div>
            </div>
        </>
    )
}

export default Footer;