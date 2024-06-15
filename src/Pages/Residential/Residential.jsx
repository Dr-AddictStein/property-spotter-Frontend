import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiLocationOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import Container from "../../components/Container/Container";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";

const ResidentialPage = () => {
    const [search, setSearch] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const residentialData = useLoaderData();

    useEffect(() => {
        setMainData(
            residentialData.filter(
                (item) => item.propertyType !== "commercial property"
            )
        );
        fetchProvinces();
    }, [residentialData]);

    const filterData = (item) => {
        const searchMatch = item.propertyType
            .toLowerCase()
            .includes(search.toLowerCase());
        const locationMatch = item.address
            .toLowerCase()
            .includes(locationValue.toLowerCase());
        return (
            (searchMatch && locationMatch) ||
            (search === "" && locationValue === "")
        );
    };

    const handleClearFilter = () => {
        setSearch("");
        setLocationValue("");
    };
    const fetchProvinces = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/area/AreasData"
            );
            setProvinces(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Residential</title>
            </Helmet>
            <Breadcrumb title={"Residential"} />
            <Container>
                <div className="flex flex-col md:flex-row justify-between gap-5 py-10 px-6 md:px-0">
                    <div className="bg-white rounded-md px-6 py-5 md:w-1/3 space-y-2.5 h-fit">
                        <div className="relative">
                            <input
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="search"
                                name="search"
                                id="search"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Here ..."
                            />
                            <IoSearch
                                className="absolute top-3 left-2 text-primary"
                                size={20}
                            />
                        </div>
                        <div className="relative">
                            <input
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="text"
                                name="location"
                                id="location"
                                onChange={(e) =>
                                    setLocationValue(e.target.value)
                                }
                                placeholder="Enter Location.."
                            />
                            <CiLocationOn
                                className="absolute top-3 left-2 text-primary"
                                size={20}
                            />
                        </div>
                        <div>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">
                                        Select Provinces
                                    </span>
                                </div>
                                <select
                                    name="selectProvinces"
                                    id="selectProvinces"
                                    defaultValue={locationValue}
                                    onChange={(e) =>
                                        setLocationValue(e.target.value)
                                    }
                                    className="select bg-primary/10 select-bordered w-full"
                                >
                                    <option value="" disabled>
                                        Select a city
                                    </option>
                                    {provinces.map((province, idx) => (
                                        <option key={idx} value={province.city}>
                                            {province.city}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="flex py-2 gap-3">
                            <button className="bg-primary px-5 py-3.5 text-center text-sm inline-block text-white cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 w-full">
                                Filter
                            </button>
                            <button
                                onClick={handleClearFilter}
                                className="bg-primary px-5 py-3.5 text-center text-sm inline-block text-white cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 w-full"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className="px-6 py-5 md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            {mainData?.filter(filterData).map((item, idx) => (
                                <PropertyCard key={idx} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ResidentialPage;
