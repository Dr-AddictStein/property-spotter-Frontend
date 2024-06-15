import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiLocationOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";

const BuyPage = () => {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city");

    const [search, setSearch] = useState("");
    const [locationValue, setLocationValue] = useState(city || "");
    const [area, setArea] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(12);

    useEffect(() => {
        fetchArea();
        fetchProvinces();
    }, []);

    const fetchArea = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/house/houseAvailableData"
            );
            setArea(response.data);
        } catch (error) {
            console.error(error);
        }
    };
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
    // Logic for pagination
    const indexOfLastFlat = currentPage * HousePerPage;
    const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
    const currentAgency = area.slice(indexOfFirstFlat, indexOfLastFlat);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Helmet>
                <title>Buy</title>
            </Helmet>
            <Breadcrumb title={"Buy"} />
            <Container>
                <div className="flex flex-col md:flex-row justify-between gap-5 py-10 px-6 md:px-0">
                    <div className="bg-white rounded-md px-6 py-5 md:w-1/3 space-y-2.5 h-fit">
                        <div className="relative">
                            <input
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="search"
                                name="search"
                                id="search"
                                defaultValue={search}
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
                                        <optgroup
                                            className="text-gray-700 font-medium"
                                            key={idx}
                                            label={province.provinces}
                                        >
                                            {province.cities.map(
                                                (city, cityIdx) => (
                                                    <option
                                                        key={cityIdx}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </option>
                                                )
                                            )}
                                        </optgroup>
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
                            {currentAgency.length > 0 ? (
                                currentAgency
                                    ?.filter(filterData)
                                    .map((item, idx) => (
                                        <PropertyCard key={idx} item={item} />
                                    ))
                            ) : (
                                <h3> No Data Available</h3>
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            {/* for pagination */}
            <div className=" flex flex-wrap justify-center mb-10 mt-10">
                <button
                    className="join-agencys btn btn-outline btn-primary mr-2"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <span className="text-white"> &larr; Previous page</span>
                </button>
                {Array.from(
                    { length: Math.ceil(area.length / HousePerPage) },
                    (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`join-agencys btn btn-outline btn-primary  text-white mr-2 ${
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
                    className="join-agencys btn btn-outline btn-primary  mr-2"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                        currentPage === Math.ceil(area.length / HousePerPage)
                    }
                >
                    <span className="text-white">Next&rarr;</span>
                </button>
            </div>
        </div>
    );
};

export default BuyPage;
