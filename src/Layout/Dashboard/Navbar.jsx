import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
// import useAuth from "../../hooks/useAuth";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleLogout = async () => {
        await logOut()
        navigate("/");
    };

    return (
        <header className="flex items-center border-b  justify-between px-6 py-3 ">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 focus:outline-none lg:hidden"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>


            </div>

            <div className="flex items-center">
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="relative block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
                    >
                        <img
                            className="object-cover w-full h-full"
                            src={user?.photoURL}
                            alt="Your avatar"
                        />
                    </button>

                    <div
                        onClick={() => setDropdownOpen(false)}
                        className={`fixed inset-0 z-10 w-full h-full ${dropdownOpen ? "" : "hidden"
                            }`}
                    ></div>

                    <div
                        className={`absolute right-0 z-10 w-32 mt-2 overflow-hidden bg-white dark:bg-[#0c1427] rounded shadow-xl ${dropdownOpen ? "" : "hidden"
                            }`}
                    >
                        <Link
                            to="/profiles"
                            className="block px-4 py-2 text-sm text-slate-400 hover:bg-primary hover:text-white w-full"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-slate-400 hover:bg-primary hover:text-white text-left w-full"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
Navbar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
};
export default Navbar;
