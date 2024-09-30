import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import ManagePieChart from "./ManagePieChart";
import ManageAddRecipes from "./ManageAddRecipes";
import OverView from "./OverView";

const Dashboard = () => {
    const [open, setOpen] = useState();

    return (
        <>
            <div className="min-h-[100vh]">
                <div className="md:hidden">
                    <div className="w-full absolute z-20">
                        {!open && (
                            <IoIosMenu
                                className='size-9 absolute top-4 left-4 text-[#16cc95f3] cursor-pointer'
                                onClick={() => setOpen(true)}
                            />
                        )}
                        <Sidebar open={open} setOpen={setOpen} />
                        <Link
                            to='/'
                            className="flex justify-center items-center py-1"
                        >
                            <img src="/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-14 w-14 mr-2" />
                            <span className="text-[2.5rem] text-[#16cc95f3] font-bold">FoodMania</span>
                        </Link>
                    </div>
                </div>
                <div className="pt-14 md:p-0">
                    <div className="flex flex-col justify-center px-4 md:flex md:flex-row md:justify-between md:items-center">
                        <h1 className="text-[2rem] font-semibold text-center p-5 md:pl-10">Dashboard</h1>
                    </div>
                    <div className="md:flex md:flex-row gap-x-4 px-2">
                        <div className="md:w-[50%]">
                            <OverView />
                            <ManageAddRecipes />
                        </div>
                        <div className="md:w-[50%]">
                            <ManagePieChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;