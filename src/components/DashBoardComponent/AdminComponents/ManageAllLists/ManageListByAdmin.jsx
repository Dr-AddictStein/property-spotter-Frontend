import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Provider/AuthProvider";

const ManageListByAdmin = () => {
    const { user } = useContext(AuthContext);
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
    const [searchName, setSearchName] = useState("");
    const searchRef = useRef(null);

    const fetchAgency = async () => {
        try {
            const response = await axios.get(
                "https://api.propertyspotter.co.za/allusers/filterby/agency"
            );
            setAllAgency(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchAgent = async (name) => {
        try {
            const response = await axios.get(
                `https://api.propertyspotter.co.za/all-agents/${name}`
            );
            return setAllAgent(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAgency();
        fetchListingData();
    }, []);

    const fetchListingData = async () => {
        try {
            const response = await axios.get(
                "https://api.propertyspotter.co.za/house/houseDataByAdmin"
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

    const houseUpdate = async (e, house, random_id, spooterEmail) => {
        try {
            const value = e.target.innerText.toLowerCase();
            const res = await fetch(
                `https://api.propertyspotter.co.za/house/update/${house._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: value,
                        agencyName: user.name,
                        agencyEmail: user.email,
                        agencyImage: user.photoURL,
                        spooterEmail: spooterEmail,
                        random_id:random_id,
                        forStatus:true
                    }),
                }
            );
            toast.success(`Successfully ${value}`);
            fetchListingData();
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
                `https://api.propertyspotter.co.za/house/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        agency: [selectedAgencies],
                        agentName: selectedAgent,
                        forStatus:false
                    }),
                }
            );
            toast.success(`Successfully Forward to Agency Agent!`);
            fetchListingData();
            document.getElementById(`my_modal_f${id}`).close();
        } catch (error) {
            console.log(error);
        }
    };
    const addP24ID = async (e, id) => {
        e.preventDefault();

        // console.log("GUGUGU",e.target.p24id.value)
        // console.log("ZZZZU",id)
        // console.log("GUCK");
        try {
            const res = await fetch(
                `https://api.propertyspotter.co.za/house/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        p24_id: e.target.p24id.value
                    }),
                }
            );
            toast.success(`Successfully Modified Property24 ID!`);
            fetchListingData();
            document.getElementById(`my_modal_f${id}`).close();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
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
                            Total Spotter:{" "}
                            <span className="text-3xl text-primary font-bold">
                                {listings.length}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center justify-center gap-2 py-2">
                        <input
                            type="search"
                            name="searchName"
                            id="searchName"
                            ref={searchRef}
                            placeholder="Search By Listing ID"
                            onChange={(e) => setSearchName(e.target.value)}
                            className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1"
                        />
                        <button
                            onClick={() => {
                                setSearchName("");
                                if (searchRef.current) {
                                    searchRef.current.value = "";
                                }
                            }}
                            className="btn-sm btn-primary text-white rounded-md active:scale-95"
                        >
                            Clear
                        </button>
                    </div>
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
                            <option value="pending mandate">
                                Pending Mandate
                            </option>
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
                                    <th>Property24 Id</th>
                                    <th>Spotter Name</th>
                                    <th>Spotter Email</th>
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
                                    .filter((house) => {
                                        if (filterValue) {
                                            return house.status === filterValue;
                                        }

                                        if (searchName) {
                                            console.log("NUM", house.random_id)
                                            console.log("FFFF", parseInt(searchName))
                                            return house.random_id === parseInt(searchName, 10);
                                        }
                                        return true;
                                    })
                                    .map((house, index) => (
                                        <tr key={house?._id}>
                                            <td>{house?.random_id}</td>
                                            <td className="flex gap-2">

                                                <form onSubmit={(e) => addP24ID(e, house?._id)} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        name="p24id"
                                                        placeholder="Property24 ID"
                                                        defaultValue={house?.p24_id}
                                                        className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1 text-base"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn-sm btn-primary text-white rounded-md active:scale-95"
                                                    >
                                                        Change
                                                    </button>
                                                </form>
                                            </td>
                                            <td>{house?.spooterName}</td>
                                            <td>{house?.spooterEmail}</td>
                                            <td>{house?.houseOwnerName}</td>
                                            <td>{house?.houseOwnerEmail}</td>
                                            <td>{house?.houseOwnerPhone}</td>
                                            <td>
                                                <div
                                                    className={`px-2 py-1 capitalize text-lg rounded-lg  ${getBadgeClass(
                                                        house?.status
                                                    )} text-white`}
                                                >
                                                    {house?.status}
                                                </div>
                                            </td>
                                            <td>{house.city}</td>
                                            <td>{house.province}</td>
                                            <td>
                                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                <div className="flex gap-2">
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                                house,
                                                                                house?.random_id,
                                                                                house?.spooterEMail
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
                                                                Select The
                                                                Agency Agent
                                                            </h1>
                                                            <div className="mt-6 relative">
                                                                <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                                                    Select
                                                                    Agency
                                                                </label>
                                                                <select
                                                                    defaultValue={
                                                                        ""
                                                                    }
                                                                    className="select select-bordered w-full text-black"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleAgencySelect(
                                                                            e
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
                                                                        an
                                                                        agency
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
                                                                (allAgent.length >
                                                                    0 ? (
                                                                    <div className="mt-6 relative">
                                                                        <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                                                            Select
                                                                            Agent
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
                                                                                an
                                                                                agent
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
                                                                    onClick={(
                                                                        e
                                                                    ) =>
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
                            {
                                length: Math.ceil(
                                    listings.length / HousePerPage
                                ),
                            },
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
        </div>
    );
};
export default ManageListByAdmin;
