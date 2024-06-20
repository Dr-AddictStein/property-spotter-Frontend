import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";

const ManageArea = () => {
    const [provinces, setProvinces] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchProvinces = () => {
        fetch("https://api.propertyspotter.co.za/area/AreasData")
            .then((res) => res.json())
            .then((data) => setProvinces(data));
    };
    useEffect(() => {
        fetchProvinces();
    }, []);

    const createProvince = async (e) => {
        e.preventDefault();
        const provinces = e.target.provinces.value;

        const response = await axios.post(
            "https://api.propertyspotter.co.za/area/add-area",
            { provinces }
        );
        e.target.reset();
        if (response.data._id) {
            toast.success("Successfully added areas");
            fetchProvinces();
        } else {
            toast.error("already exits");
        }
    };

    const createCity = async (e) => {
        e.preventDefault();
        const provinces = e.target.province.value;
        const city = e.target.city.value;

        await axios.post("https://api.propertyspotter.co.za/area/add-city", {
            provinces,
            city,
        });
        e.target.reset();
        toast.success("Successfully added city");
        fetchProvinces();
    };

    const deleteCity = async (id, city) => {
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
            await axios.delete(
                `https://api.propertyspotter.co.za/area/delete-city/${id}?city=${city}`
            );
            toast.success("Successfully deleted");
            await fetchProvinces();
        } else {
            toast.warn("Canceled");
        }
    };

    const deleteProvince = async (id) => {
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
            await axios.delete(
                `https://api.propertyspotter.co.za/area/delete-province/${id}`
            );
            toast.success("Successfully deleted");
            await fetchProvinces();
        } else {
            toast.warn("Canceled");
        }
    };

    return (
        <div className="p-6">
            <Helmet>
                <title>Manage Provinces</title>
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
                        Total Provinces:{" "}
                        <span className="text-3xl text-primary font-bold">
                            {provinces.length}
                        </span>
                    </h4>
                </div>
            </div>
            <div className="flex justify-between">
                <form
                    className="flex items-center justify-center gap-2 py-2"
                    onSubmit={createProvince}
                >
                    <h3>Create Province: </h3>
                    <input
                        type="text"
                        name="provinces"
                        id="provinces"
                        className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1"
                    />
                    <button
                        type="submit"
                        className="btn-sm btn-primary text-white rounded-md active:scale-95"
                    >
                        Create
                    </button>
                </form>
                <form
                    className="flex items-center justify-center gap-2 py-2"
                    onSubmit={createCity}
                >
                    <h3>Create City: </h3>
                    <select
                        className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1"
                        name="province"
                        id="province"
                    >
                        {provinces.map((province) => (
                            <option
                                key={province._id}
                                value={province.provinces}
                            >
                                {province.provinces}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        className="bg-blue-50 rounded-md border border-blue-200 outline-none px-2 py-1"
                    />
                    <button
                        type="submit"
                        className="btn-sm btn-primary text-white rounded-md active:scale-95"
                    >
                        Create City
                    </button>
                </form>
            </div>
            <div className="shadow-2xl border-2 border-primary p-5 rounded-md">
                <div className="flex justify-between"></div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-base text-center">
                                <th>Province Name</th>
                                <th>Cities List</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {provinces.map((province, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-gray-50 transition duration-300"
                                >
                                    <td className="py-4 px-6 border-b">
                                        {province?.provinces}
                                    </td>
                                    <td className="py-4 px-6 border-b">
                                        <ul>
                                            {province?.cities?.map(
                                                (city, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex py-1 border-b border-gray-200 justify-between items-center"
                                                    >
                                                        {city}{" "}
                                                        <span
                                                            onClick={() =>
                                                                deleteCity(
                                                                    province._id,
                                                                    city
                                                                )
                                                            }
                                                            className="cursor-pointer text-red-500"
                                                        >
                                                            <MdDeleteOutline />
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={()=>deleteProvince(province._id)}
                                            className="text-red-500"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageArea;
