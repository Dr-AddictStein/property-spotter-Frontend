import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="min-h-screen flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
