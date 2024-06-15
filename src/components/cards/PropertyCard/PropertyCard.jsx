import { useContext } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const PropertyCard = ({ item }) => {
    const { user } = useContext(AuthContext);
    const copyToClip = (e, link) => {
        e.stopPropagation();
        const url = window.location.origin + link;
        navigator.clipboard.writeText(url);
        toast.success("Copied");
    };
    return (
        <div className=" bg-white shadow rounded-xl">
            <div className="relative">
                {item.image ? (
                    <img
                        src={item.image}
                        alt=""
                        className="rounded-lg h-56 mx-auto mt-2"
                    />
                ) : (
                    <div class="flex items-center justify-center w-full h-48 bg-gray-200 rounded">
                        <svg
                            class="w-14 h-14 text-gray-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                )}
                <div className="absolute flex flex-col justify-center items-center left-3.5 gap-2 bottom-2">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={item.agencyImage}
                        alt=""
                    />
                    <h3 className="bg-blue-100/60 px-2 rounded-md py-0.5 text-primary">
                        {item.agencyName}
                    </h3>
                </div>
                <div className="absolute flex flex-col justify-center items-center right-3.5 gap-2 bottom-2">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={item.agentImage}
                        alt=""
                    />
                    <h3 className="bg-blue-100/60 px-2 rounded-md py-0.5 text-primary">
                        {item.agent}
                    </h3>
                </div>
            </div>
            <div className="px-3 pt-2.5">
                {/* {user && (
                    <h3 className="flex items-center text-sm text-gray-500 uppercase font-semibold gap-2">
                        <span className="text-primary text-2xl">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.3"
                                    d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </span>{" "}
                        {item.address.split(" ").pop()}
                    </h3>
                )} */}
                <h2 className="font-medium bg-gradient-to-r from-black to-slate-800 bg-clip-text text-transparent py-3 ">
                    {` ${
                        item.propertyType === "commercial property"
                            ? item.room
                            : item.bedroom
                    } ${
                        item.propertyType === "commercial property"
                            ? 'Room'
                            : 'Bedroom'
                    }  and ${item.bathroom} Bathroom in ${item.suburb} ${item.city}  ${item.province}`}
                </h2>
                <ul className="flex-grow flex justify-between items-center text-gray-700 py-5">
                    <li className="space-x-2">
                        <Link
                            className="text-blue-500 hover:text-blue-700"
                            to={`/property-details/${item._id}`}
                        >
                            View Details
                        </Link>
                    </li>
                    <li
                        className="space-x-2 cursor-pointer"
                        onClick={(e) =>
                            copyToClip(e, `/property-details/${item._id}`)
                        }
                    >
                        <span class="tooltip" data-tip="Copy Link">
                            Share:{" "}
                        </span>
                        <FaRegShareSquare className="inline" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PropertyCard;
