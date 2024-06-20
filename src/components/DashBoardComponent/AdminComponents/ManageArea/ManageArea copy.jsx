import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageArea = () => {
    const [openModal, setOpenModal] = useState(false);
    const [area, setArea] = useState([]);

    const handleManageArea = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("city", e.target.city.value);
            formData.append("provinces", e.target.country.value);

            const response = await axios.post(
                "https://api.propertyspotter.co.za/area/add-area",
                formData
            );
            if (response.data._id) {
                toast.success("Successfully added areas");
                setOpenModal(false);
                fetchArea();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchArea();
    }, []);

    const fetchArea = async () => {
        try {
            const response = await axios.get(
                "https://api.propertyspotter.co.za/area/AreasData"
            );
            setArea(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAreaDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await axios.delete(`https://api.propertyspotter.co.za/area/delete/${id}`);
            toast.success("deleted");
            await fetchArea();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Cancelled",
                text: "Your E file is safe :)",
                icon: "error",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Manage Area</title>
            </Helmet>
            <div className="mx-auto flex items-center justify-end py-5 gap-2">
                <div>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="btn btn-primary py-2.5 px-10 text-white"
                    >
                        Add Provinces
                    </button>
                    <div
                        onClick={() => setOpenModal(false)}
                        className={`fixed z-[100] flex items-center justify-center ${
                            openModal
                                ? "opacity-1 visible"
                                : "invisible opacity-0"
                        } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
                    >
                        <div
                            onClick={(e_) => e_.stopPropagation()}
                            className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
                                openModal
                                    ? "opacity-1 translate-y-0 duration-300"
                                    : "-translate-y-20 opacity-0 duration-150"
                            }`}
                        >
                            <form
                                onSubmit={handleManageArea}
                                className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 h-96 lg:h-[500px] overflow-y-scroll"
                            >
                                <svg
                                    onClick={() => setOpenModal(false)}
                                    className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                    </g>
                                </svg>
                                <div className="space-y-5">
                                    {/* Input fields for name, city, and country */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="border border-black py-3 px-5 w-full"
                                        />
                                        <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                            Your City
                                        </h1>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            className="border border-black py-3 px-5 w-full"
                                        />
                                        <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                            Your Provinces
                                        </h1>
                                    </div>
                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        className="border-2 bg-black text-white border-black py-3 px-5 w-full"
                                    >
                                        Submit Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="btn btn-primary py-2.5 px-10 text-white"
                    >
                        + Add City
                    </button>
                    <div
                        onClick={() => setOpenModal(false)}
                        className={`fixed z-[100] flex items-center justify-center ${
                            openModal
                                ? "opacity-1 visible"
                                : "invisible opacity-0"
                        } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
                    >
                        <div
                            onClick={(e_) => e_.stopPropagation()}
                            className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${
                                openModal
                                    ? "opacity-1 translate-y-0 duration-300"
                                    : "-translate-y-20 opacity-0 duration-150"
                            }`}
                        >
                            <form
                                onSubmit={handleManageArea}
                                className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 h-96 lg:h-[500px] overflow-y-scroll"
                            >
                                <svg
                                    onClick={() => setOpenModal(false)}
                                    className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g strokeWidth="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                    </g>
                                </svg>
                                <div className="space-y-5">
                                    {/* Input fields for name, city, and country */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="border border-black py-3 px-5 w-full"
                                        />
                                        <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                            Your City
                                        </h1>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            className="border border-black py-3 px-5 w-full"
                                        />
                                        <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                            Your Provinces
                                        </h1>
                                    </div>
                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        className="border-2 bg-black text-white border-black py-3 px-5 w-full"
                                    >
                                        Submit Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* card show for remove  */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {area.map((item, index) => (
                    <Link
                        key={index}
                        to="#"
                        className="block border rounded-xl px-2.5 py-2.5 my-2"
                    >
                        <div className="rounded-2xl h-44 object-center object-cover overflow-hidden">
                            <img
                                className="rounded-2xl hover:scale-150 transition-transform duration-300"
                                src={`https://api.propertyspotter.co.za/image/areas/${item.image}`}
                                alt="area"
                            />
                        </div>
                        <h2 className="text-2xl text-secondary font-semibold py-1 my-2">
                            {item.city}
                        </h2>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleAreaDelete(item._id)}
                                className="bg-red-500 rounded-md text-white px-2 py-1.5"
                            >
                                Remove{" "}
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ManageArea;
