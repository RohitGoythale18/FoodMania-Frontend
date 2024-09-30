import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <>
            <div>
                <Link
                    to='/'
                    className="flex flex-row justify-center items-center my-1 md:flex md:flex-col"
                >
                    <img src="/public/images/OIG.png" id="logo" alt="logo" className="bg-[#16cc95f3] rounded-full h-16 w-16 mr-2
                        md:h-24 md:w-24 md:my-3" />
                    <span className="text-4xl text-[#16cc95f3] font-bold md:text[2rem]">FoodMania</span>
                </Link>
            </div>
        </>
    )
}

export default AdminHeader;