import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const AdminLayout = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminLayout;