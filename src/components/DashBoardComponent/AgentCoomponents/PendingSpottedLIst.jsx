import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const PendingSpottedLIst = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(6);
    const [listings, setListings] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);

    const fetchListingData = async () => {
        try {
            const response = await axios.get(
                `https://api.propertyspotter.co.za/house/houseDataByAgent/${user?.name}`
            );
            setListings(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDetailsClick = (house) => {
        document.getElementById("my_modal_5").showModal();
        setSelectedHouse(house);
    };

    useEffect(() => {
        fetchListingData();
    }, []);

    const getBadgeClass = (role) => {
        switch (role) {
            case "new":
                return "badge-accent";
            case "sold":
                return "badge-accent";
            case "pending":
                return "badge-warning";
            case "offer pending":
                return "badge-warning";
            case "pending mandate":
                return "badge-warning";
            case "pending contact with client":
                return "badge-warning";
            case "hold":
                return "badge-warning";
            case "available":
                return "badge-success";
            case "sold, spotter paid":
                return "badge-success";
            case "unsuccessful":
                return "badge-error";
            default:
                return "";
        }
    };

    // Logic for pagination
    const indexOfLastFlat = currentPage * HousePerPage;
    const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
    const currentJobs = listings.slice(indexOfFirstFlat, indexOfLastFlat);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const houseUpdate = async (id) => {
        try {
            const res = await fetch(
                `https://api.propertyspotter.co.za/house/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "sold",
                        agency: [user.name],
                    }),
                }
            );
            toast.success("Successfully Updated");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <Helmet>
                <title>Pending Spotted Listing</title>
            </Helmet>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-7">
                <div className="flex justify-center shadow-xl border-2 border-primary p-4 rounded-md mb-7">
                    <div className="text-center">
                        <h4 className="text-xl font-medium ">
                            Hello,
                            <span className="text-3xl font-bold text-primary uppercase">
                                {user?.name}
                            </span>
                        </h4>
                        <p>{"Here's what's going on"}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center shadow-xl border-2 border-primary p-4 rounded-md mb-7">
                    <h4 className="text-2xl font-medium">
                        Total Houses:
                        <span className="text-3xl text-primary font-bold">
                            {listings.length}
                        </span>
                    </h4>
                </div>
            </div>
            <div className="shadow-2xl border-2 border-primary p-5 rounded-md">
                <div className="flex justify-between"></div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-base text-center">
                                <th>Random Id</th>
                                <th>Property24 Id</th>
                                <th>Spooter Name</th>
                                <th>Spooter Email</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentJobs
                                .filter((item) => item.status === "pending")
                                .map((house, index) => (
                                    <tr key={house?.jobData?._id}>
                                        <td>{house?.random_id}</td>
                                        <td>{house?.p24_id}</td>
                                        <td>{house?.spooterName}</td>
                                        <td>{house?.spooterEmail}</td>
                                        <td>{house?.houseOwnerName}</td>
                                        <td>{house?.houseOwnerEmail}</td>
                                        <td>{house?.houseOwnerPhone}</td>
                                        <td>
                                            <div
                                                className={` ${getBadgeClass(
                                                    house?.status
                                                )} px-2 py-1 rounded-lg text-white`}
                                            >
                                                {house?.status}
                                            </div>
                                        </td>
                                        <td>{house.city}</td>
                                        <td>{house.province}</td>
                                        <td>
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            <div className="flex gap-2">
                                                {/* <button
                                                  className="btn btn-info"
                                                  onClick={() =>
                                                      houseUpdate(house._id)
                                                  }
                                              >
                                                  Approve
                                              </button> */}
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        handleDetailsClick(
                                                            house
                                                        )
                                                    }
                                                >
                                                    Details
                                                </button>
                                            </div>
                                            <dialog
                                                id="my_modal_5"
                                                className="modal modal-bottom sm:modal-middle"
                                            >
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-3xl mb-3">
                                                        House{" "}
                                                        <span className="text-primary font-bold">
                                                            Details!
                                                        </span>
                                                    </h3>
                                                    <div className="text-center text-xl">
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Bedroom:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.bedroom
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Bathroom:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.bathroom
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Sell Time:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.sellTime
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Agency:
                                                            </span>
                                                            {selectedHouse?.agency.map(
                                                                (
                                                                    agencyItem,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-primary font-bold text-2xl ml-2"
                                                                    >
                                                                        {
                                                                            agencyItem
                                                                        }
                                                                        ,
                                                                    </span>
                                                                )
                                                            )}
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Agent:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.agent
                                                                }
                                                            </span>
                                                        </h1>
                                                        <h1>
                                                            <span className="font-semibold">
                                                                Address:
                                                            </span>{" "}
                                                            <span className="text-primary font-bold text-2xl">
                                                                {
                                                                    selectedHouse?.address
                                                                }
                                                            </span>
                                                        </h1>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn btn-error">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {/* for pagination */}
                <div className=" flex flex-wrap justify-center mb-10 mt-5">
                    <button
                        className="join-item btn btn-outline btn-primary mr-2"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span className="text-white">
                            {" "}
                            &larr; Previous page
                        </span>
                    </button>
                    {Array.from(
                        { length: Math.ceil(listings.length / HousePerPage) },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`join-item btn btn-outline btn-primary  text-white mr-2 ${
                                    currentPage === i + 1
                                        ? "bg-primary border-2 border-black text-white"
                                        : ""
                                }`}
                            >
                                <span className="text-white">{i + 1}</span>
                            </button>
                        )
                    )}
                    <button
                        className="join-item btn btn-outline btn-primary  mr-2"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                            currentPage ===
                            Math.ceil(listings.length / HousePerPage)
                        }
                    >
                        <span className="text-white">Next&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingSpottedLIst;
