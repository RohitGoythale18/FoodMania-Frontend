import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomeLayout;