import { useContext, useEffect, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { LuMenu, LuX } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOPen] = useState(false);
  const navigate = useNavigate()
  const handleLogOut = async () => {
    await logOut()
    navigate('/')
  };

  useEffect(() => {
    const handleScroll = () => {
      return setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={`backdrop-blur-[8px] w-full top-0 ${scrollY > 200 ? "sticky shadow-md animate" : ""
          } transition-all duration-300 bg-white`}
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-5 py-3.5 px-6 lg:px-0">
            <div className="hidden sm:block">
              <Link to={"/"} className="flex items-center">
                <img className="w-40" src={logo} alt="logo" />
              </Link>

            </div>
            <div className="w-full flex justify-end sm:hidden">
              <div className="md:hidden flex items-center gap-2">
                <div className="">
                  <Link to={"/spotter-reg"}>
                    <button className="inline-flex justify-center items-center bg-primary text-white text-sm font-medium rounded-md gap-2 px-3.5 h-12">
                      <GrUserManager size={18} />
                      Become A Spotter
                    </button>
                  </Link>
                </div>
                <button onClick={() => setIsMenuOPen(!isMenuOpen)}>
                  {!isMenuOpen ? <LuMenu size={20} /> : <LuX size={20} />}
                </button>
              </div>
            </div>
            <div className="sm:block hidden">
              <div className="md:hidden flex items-center gap-2">
                <div className="">
                  <Link to={"/spotter-reg"}>
                    <button className="inline-flex justify-center items-center bg-primary text-white text-sm font-medium rounded-md gap-2 px-3.5 h-12">
                      <GrUserManager size={18} />
                      Become A Spotter
                    </button>
                  </Link>
                </div>
                <button onClick={() => setIsMenuOPen(!isMenuOpen)}>
                  {!isMenuOpen ? <LuMenu size={20} /> : <LuX size={20} />}
                </button>
              </div>
            </div>
            <ul className="hidden md:flex flex-row gap-8 *:font-medium mr-auto px-10 *:text-sm ">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b border-primary py-1" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/buy"}
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b border-primary py-1" : ""
                  }
                >
                  Buy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/sell"}
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b border-primary py-1" : ""
                  }
                >
                  Sell
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/residential"}
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b border-primary py-1" : ""
                  }
                >
                  Residential
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/commercial"}
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b border-primary py-1" : ""
                  }
                >
                  Commercial
                </NavLink>
              </li>
            </ul>
            <div className="hidden sm:block">
              {user ? (
                <div className="dropdown cursor-pointer pt-1 dropdown-end">
                  <div className="avatar" tabIndex={0}>
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL || "https://i.ibb.co/wNXrMXd/images.png"} alt="" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {user && user?.role === "admin" && (
                      <>
                        <li>
                          <Link to="/dashboard" className="justify-between">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/manageAreas"
                            className="justify-between"
                          >
                            Manage Areas
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/ManageAllListings/manageListingByAgency"
                            className="justify-between"
                          >
                            Manage Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/ManageAllListings/manageAgencies"
                            className="justify-between"
                          >
                            Manage Agencies
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/ManageAllListings/manageAgents"
                            className="justify-between"
                          >
                            Manage Agents
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/ManageAllListings/manageSpotters"
                            className="justify-between"
                          >
                            Manage Spotters
                          </Link>
                        </li>
                      </>
                    )}

                    {user && user?.role === "agency" && (
                      <>
                        <li>
                          <Link
                            to="/dashboard/agency/manageListings"
                            className="justify-between"
                          >
                            Manage Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/agency/manageListingsByAgent"
                            className="justify-between"
                          >
                            Listings by Agents
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/agency/pendingSpottedListings"
                            className="justify-between"
                          >
                            Spotted Listings Pending (0)
                          </Link>
                        </li>
                      </>
                    )}

                    {user && user?.role === "agent" && (
                      <>
                        <li>
                          <Link
                            to="/dashboard/agent/manageListing"
                            className="justify-between"
                          >
                            Manage Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/agent/pendingSpottedListings"
                            className="justify-between"
                          >
                            Spotted listings pending
                          </Link>
                        </li>
                      </>
                    )}

                    {user && user?.role === "spotter" && (
                      <>
                        <li>
                          <Link
                            to="/manage-spotted-listings"
                            className="justify-between"
                          >
                            Manage Spotted Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/successful-listings"
                            className="justify-between"
                          >
                            Successful Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/unsuccessful-listings"
                            className="justify-between"
                          >
                            Unsuccessful Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/paid-out-listings"
                            className="justify-between"
                          >
                            Paid out Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/message"
                            className="justify-between"
                          >
                            Chat
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Common items */}
                    <li>
                      <Link to="/profiles" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <div
                        onClick={handleLogOut}
                        className="flex items-center gap-2"
                      >
                        <p>Logout</p>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center gap-1 font-medium *:text-[#8a98a9] *:text-sm">
                    <span className="svg-icon svg-icon-2hx me-1">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.3"
                          d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                          fill="currentColor"
                        ></path>
                        <rect
                          x="7"
                          y="6"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </span>
                    <Link to={"/loginSignup"}>
                      <button>Login or Signup</button>
                    </Link>
                  </div>
                  <div className="">
                    <Link to={"/spotter-reg"}>
                      <button className="inline-flex justify-center items-center bg-primary text-white text-sm font-medium rounded-md gap-2 px-3.5 h-12">
                        <GrUserManager size={18} />
                        Become A Spotter
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`${isMenuOpen ? "" : "hidden"
              } lg:hidden h-screen w-full`}
          >
            <div className="flex justify-center items-center pb-10">
              <ul className="flex flex-col *:text-center gap-5 py-10 px-6 *:text-gray-800">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/buy"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    }
                  >
                    Buy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/sell"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    }
                  >
                    Sell
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/residential"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    }
                  >
                    Residential
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/commercial"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    }
                  >
                    Commercial
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
