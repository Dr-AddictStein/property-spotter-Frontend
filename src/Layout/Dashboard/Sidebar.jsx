/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/logo/logo.png";
import SidebarItem from "../../components/SubMenu/SidebarItem";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useContext(AuthContext);
    const role = user?.role;

    const adminItems = [
        // {
        //     title: "Chat moderate",
        //     icon: "uBuilding",
        //     path: "/chatModerate",
        // },
        {
            title: "Manage Areas",
            icon: "uBuilding",
            path: "/dashboard/manageAreas",
        },
        {
            title: "Manage All Listings",
            icon: "uBuilding",
            path: "/dashboard/ManageAllListings",
            childrens: [
                {
                    title: "Manage listings by Admin",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageListingByAdmin",
                },
                {
                    title: "Manage listing by Agency",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageListingByAgency",
                },
                {
                    title: "Manage listing by Spotter",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageListingBySpotter",
                },
                {
                    title: "Manage Agencies",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageAgencies",
                },
                {
                    title: "Manage Agents",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageAgents",
                },
                {
                    title: "Manage Spotters",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/manageSpotters",
                },
                {
                    title: "Profile",
                    icon: "uBuilding",
                    path: "/dashboard/ManageAllListings/profile",
                },
            ],
        },
        {
            title: "Message",
            icon: "uBuilding",
            path: "/dashboard/message",
        },
    ];

    const agencyItems = [
        {
            title: "Manage Listings",
            icon: "uBuilding",
            path: "/dashboard/agency/manageListings",
        },
        {
            title: "Manage listings by agent",
            icon: "uBuilding",
            path: "/dashboard/agency/manageListingsByAgent",
        },
        {
            title: "Manage listings by spotter",
            icon: "uBuilding",
            path: "/dashboard/agency/manageListingsBySpotter",
        },
        {
            title: "Pending spotted listings",
            icon: "uBuilding",
            path: "/dashboard/agency/pendingSpottedListings",
        },
        {
            title: "Profile",
            icon: "uBuilding",
            path: "/dashboard/agency/profile",
        },
        {
            title: "Message",
            icon: "uBuilding",
            path: "/dashboard/message",
        },
    ];

    const agentItems = [
        {
            title: "Manage Listings",
            icon: "uBuilding",
            path: "/dashboard/agent/manageListing",
        },
        {
            title: "Pending Spotted Listings",
            icon: "uBuilding",
            path: "/dashboard/agent/pendingSpottedListings",
        },
        {
            title: "Profile",
            icon: "Luuilding",
            path: "/dashboard/agent/profile",
        },
        {
            title: "Message",
            icon: "uBuilding",
            path: "/dashboard/message",
        },
    ];

    return (
        <>
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed inset-0 z-20 transition-opacity  bg-black opacity-50 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-30 w-80 flex flex-col border dark:border-slate-800 bg-[#0c1427] min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen
                        ? "translate-x-0 ease-out"
                        : "-translate-x-full ease-in"
                }`}
            >
                <div className="flex items-center justify-center border-b border-slate-800 py-4">
                    <Link to="/">
                        <img className="w-28" src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="overflow-y-auto custom-scroll">
                    <nav className="mt-5 px-3">
                        <ul>
                            {role === "admin" &&
                                adminItems.map((item, index) => (
                                    <SidebarItem key={index} item={item} />
                                ))}
                            {role === "agency" &&
                                agencyItems.map((item, index) => (
                                    <SidebarItem key={index} item={item} />
                                ))}
                            {role === "agent" &&
                                agentItems.map((item, index) => (
                                    <SidebarItem key={index} item={item} />
                                ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
};

export default Sidebar;
