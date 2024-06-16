import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Provider/AuthProvider";
const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
};
const ManageListByAgency = () => {
    const { user } = useContext(AuthContext);
    const [listingAgency, setListingAgency] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(6);
    const [listings, setListings] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedAgencies, setSelectedAgencies] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState([]);
    const [allAgency, setAllAgency] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState(false);
    const [allAgent, setAllAgent] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const fetchAgency = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/allusers/filterby/agency"
            );
            setAllAgency(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchAgent = async (name) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/all-agents/${name}`
            );
            return setAllAgent(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAgency();
        fetchListingAgency();
    }, []);

    const fetchListingAgency = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/house/houseData"
            );
            console.log("HOHOHO", response.data)
            setListingAgency(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("HHHHHHHH", selectedHouse)
    }, [selectedHouse])

    useEffect(() => {
        setSelectedHouse(listingAgency.agency);
        console.log("HHHHHHHH", listingAgency.agency)
    }, [listingAgency])

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

    const handleDetailsClick = (house) => {
        document.getElementById("my_modal_5").showModal();
        setSelectedHouse(house);
    };
    // Logic for pagination
    const indexOfLastFlat = currentPage * HousePerPage;
    const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
    const currentJobs = listingAgency.slice(indexOfFirstFlat, indexOfLastFlat);

    console.log("CUCUCU", currentJobs)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const houseUpdate = async (e, house) => {
        try {
            const value = e.target.innerText.toLowerCase();

            await fetch(
                `http://localhost:5000/house/updateHouseDataByAgent/${house._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: value,
                        agencyName: house.agency[0],
                        // agencyEmail: user.email,
                        // agencyImage: user.photoURL,
                    }),
                }
            );
            toast.success(`Successfully ${value}`);
            fetchListingAgency();
            document.getElementById(`my_modal_${house._id}`).close();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAgencySelect = async (e) => {
        setSelectedAgencies(e.target.value);
        await fetchAgent(e.target.value);
        setSelectedAgency(true);
    };

    const handleSubmit = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:5000/house/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        agency: [selectedAgencies],
                        agentName: selectedAgent,
                    }),
                }
            );
            toast.success(`Successfully Forward to Agency Agent!`);
            fetchListingAgency();
            document.getElementById(`my_modal_f${id}`).close();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnassigned = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:5000/house/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        agency: ["admin"],
                        agentName: "",
                    }),
                }
            );
            toast.success(`Successfully Unassigned!`);
            fetchListingAgency();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
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
                        Total Agency:{" "}
                        <span className="text-3xl text-primary font-bold">
                            {listingAgency.length}
                        </span>
                    </h4>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex items-center justify-center gap-2 py-2">
                    <h3>Filter By: </h3>
                    <select
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1.5"
                        name=""
                        id=""
                    >
                        <option value="new">New</option>
                        <option value="sold">sold</option>
                        <option value="pending">Pending</option>
                        <option value="offer pending">Offer Pending</option>
                        <option value="pending mandate">Pending Mandate</option>
                        <option value="pending contact with client">
                            Pending Contact With Client
                        </option>
                        <option value="hold">Hold</option>
                        <option value="available">Available</option>
                        <option value="sold, spotter paid">
                            Sold, Spotter paid
                        </option>
                    </select>
                    <button
                        onClick={() => setFilterValue("")}
                        className="btn-sm btn-primary text-white rounded-md active:scale-95"
                    >
                        Clear
                    </button>
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
                                <th>Spooter Name</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>Agency Name</th>
                                <th>Agent Name</th>
                                <th>Agent Cellphone</th>
                                <th>Action</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentJobs
                                .filter((item) =>
                                    item.agency.some((name) => name !== "admin")
                                )
                                .filter((house) =>
                                    filterValue
                                        ? house.status === filterValue
                                        : house
                                )
                                .map((house, index) => (
                                    <tr key={house?._id}>
                                        <td>{house?.random_id}</td>
                                        <td>{house?.spooterName}</td>
                                        <td>{house?.houseOwnerName}</td>
                                        <td>{house?.houseOwnerEmail}</td>
                                        <td>{house?.houseOwnerPhone}</td>
                                        <td className="">
                                            <div
                                                className={`px-1 py-1 capitalize text-lg rounded-lg ${getBadgeClass(
                                                    house?.status
                                                )} text-white`}
                                            >
                                                {house?.status}
                                            </div>
                                        </td>

                                        <td>{house.city}</td>
                                        <td>{house.province}</td>
                                        <td>{house.agency[0]}</td>
                                        <td>{house.agentName}</td>
                                        <td>{house?.agentPhone}</td>
                                        {/* <td>{house.agent.phone}</td> */}
                                        <td>
                                            <div className="flex gap-2">
                                                <div>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `my_modal_${house._id}`
                                                                )
                                                                .showModal()
                                                        }
                                                    >
                                                        Action
                                                    </button>
                                                    <dialog
                                                        id={`my_modal_${house._id}`}
                                                        className="modal"
                                                    >
                                                        <div className="modal-box w-fit">
                                                            <ul className="p-2 menu z-[1] rounded-box">
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        New
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        sold
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        Available
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        Unsuccessful
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        Sold,
                                                                        Spotter
                                                                        paid
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        Hold
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        PENDING
                                                                        MANDATE
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        Pending
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="hover:bg-primary hover:text-white"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            houseUpdate(
                                                                                e,
                                                                                house
                                                                            )
                                                                        }
                                                                    >
                                                                        PENDING
                                                                        CONTACT
                                                                        WITH
                                                                        CLIENT
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            <div className="modal-action">
                                                                <form method="dialog">
                                                                    <button className="btn btn-primary bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600">
                                                                        Close
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                                <div>
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
                                                                        Sell
                                                                        Time:
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
                                                                            selectedHouse?.agentName
                                                                        }
                                                                    </span>
                                                                </h1>
                                                                <h1>
                                                                    <span className="font-semibold">
                                                                        Address:
                                                                    </span>{" "}
                                                                    <span className="text-primary font-bold text-2xl">
                                                                        {
                                                                            selectedHouse?.address + ", " + selectedHouse?.city + ", " + selectedHouse?.suburb + ", " + selectedHouse?.province
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
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `my_modal_f${house._id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                FORWARD AGENCY
                                            </button>
                                            <dialog
                                                id={`my_modal_f${house._id}`}
                                                className="modal modal-top modal-backdrop sm:modal-middle"
                                            >
                                                <div className="modal-box  space-y-10 space-x-5">
                                                    <h1 className="text-2xl font-bold">
                                                        Select The Agency Agent
                                                    </h1>
                                                    <div className="mt-6 relative">
                                                        <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                                            Select Agency
                                                        </label>
                                                        <select
                                                            defaultValue={""}
                                                            className="select select-bordered w-full text-black"
                                                            onChange={(e) =>
                                                                handleAgencySelect(
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                value={""}
                                                                disabled
                                                            >
                                                                Select an agency
                                                            </option>
                                                            {allAgency.map(
                                                                (
                                                                    agency,
                                                                    idx
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            idx
                                                                        }
                                                                        value={
                                                                            agency.name
                                                                        }
                                                                        className="text-black"
                                                                    >
                                                                        {
                                                                            agency.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                    {selectedAgency &&
                                                        (allAgent.length > 0 ? (
                                                            <div className="mt-6 relative">
                                                                <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                                                    Select Agent
                                                                </label>
                                                                <select
                                                                    className="select select-bordered w-full text-black"
                                                                    defaultValue={
                                                                        ""
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSelectedAgent(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                >
                                                                    <option
                                                                        value={
                                                                            ""
                                                                        }
                                                                        disabled
                                                                    >
                                                                        Select
                                                                        an agent
                                                                    </option>
                                                                    {allAgent.map(
                                                                        (
                                                                            agent,
                                                                            idx
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                value={
                                                                                    agent.name
                                                                                }
                                                                                className="text-black"
                                                                            >
                                                                                {
                                                                                    agent.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <h3 className="text-center text-lg font-semibold">
                                                                {" "}
                                                                No Agent
                                                                Available{" "}
                                                            </h3>
                                                        ))}
                                                    <div>
                                                        <button
                                                            className="btn btn-accent"
                                                            onClick={(e) =>
                                                                handleSubmit(
                                                                    house._id
                                                                )
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn btn-error btn-outline">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    handleUnassigned(house._id)
                                                }
                                            >
                                                Unassign
                                            </button>
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
                                className={`join-item btn btn-outline btn-primary  text-white mr-2 ${currentPage === i + 1
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

export default ManageListByAgency;
