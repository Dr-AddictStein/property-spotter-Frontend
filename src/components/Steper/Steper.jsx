import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/AuthProvider";

const Steper = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [description, setDescription] = useState("");
    const [access, setAccess] = useState(false);
    const [agencyList, setAgencyList] = useState([]);
    const [selectedAgencies, setSelectedAgencies] = useState("");
    const [name, setName] = useState(null);
    const [property, setProperty] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [room, setRoom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [image, setImage] = useState("");
    const [sellTime, setSellTime] = useState("");
    const [spooName, setSpooName] = useState("");
    const [spooEmail, setSpooEmail] = useState("");
    const [spooPhone, setSpooPhone] = useState("");
    const [selectedAgency, setSelectedAgency] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState({});
    const { user } = useContext(AuthContext);
    const [allAgent, setAllAgent] = useState([]);
    const [allAgency, setAllAgency] = useState([]);
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [selectedProvinces, setSelectedProvinces] = useState("");
    const [addParking, setAddParking] = useState(false);


    console.log(selectedAgent, 'selected agent');
    console.log(allAgent);

    const navigate = useNavigate();

    const fetchAgency = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/all-agency"
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
        fetchAgency();
        fetchProvinces();
    }, []);

    const handleAgencySelect = async (e) => {
        setSelectedAgencies(e.target.value);
        await fetchAgent(e.target.value);
    };

    const previousStep = () => {
        setActiveStep(activeStep - 1);
        setAccess(false);
    };

    const nextStep = () => {
        setActiveStep(activeStep + 1);
        setAccess(false);
    };

    const isLastStep = activeStep === 4;

    const handleButtonClick = async () => {
        if (isLastStep) {
            const formData = new FormData();
            formData.append("spooterName", name);
            formData.append("spooterEmail", user?.email);
            formData.append("status", "new");

            formData.append("address", street);
            formData.append("suburb", suburb);
            formData.append("city", city);
            formData.append("province", selectedProvinces);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("propertyType", property);
            if (property === "commercial property") {
                formData.append("room", room);
                formData.append("parking", addParking);
            } else {
                formData.append("bedroom", bedroom);
            }
            formData.append("bathroom", bathroom);
            formData.append("previousStep", previousStep);
            formData.append("sellTime", sellTime);
            formData.append("houseOwnerName", spooName);
            formData.append("houseOwnerEmail", spooEmail);
            formData.append("houseOwnerPhone", spooPhone);
            if (selectedAgency === "Yes") {
                formData.append("agency", [selectedAgencies]);
                formData.append("agentName", selectedAgent?.name);
                formData.append("agentEmail", selectedAgent?.email);
                formData.append("agentPhone", selectedAgent?.phone);
            } else {
                formData.append("agency", ["admin"]);
            }

            try {
                const res = await axios.post(
                    "http://localhost:5000/house/add",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                navigate("/");
                toast.success("Form submitted successfully");
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        } else {
            nextStep();
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/agency/agencyData")
            .then((res) => res.json())
            .then((data) =>
                setAgencyList(
                    data.map((item) => ({
                        value: item.agencyName,
                        label: item.agencyName,
                    }))
                )
            );
    }, []);

    const handleChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);

        // Find the corresponding province
        const selectedProvince = provinces.find((province) =>
            province.cities.includes(selectedCity)
        );

        if (selectedProvince) {
            setSelectedProvinces(selectedProvince.provinces);
        }
    };

    return (
        <div className="max-w-3xl mx-auto rounded-lg">
            <div className="py-10">
                <h2 className="sr-only">Steps</h2>

                <div className="after:mt-4 after:block max-w-[400px] mx-auto after:w-full">
                    <ol className="grid grid-cols-4 text-sm font-medium text-gray-500">
                        <li className="relative flex justify-start text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] start-0 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {activeStep === 2 ||
                                    activeStep === 3 ||
                                    activeStep === 4 ||
                                    activeStep === 5 ? (
                                    <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                                ) : (
                                    <h1>1</h1>
                                )}
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] -ml-10  border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 2
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {activeStep === 3 ||
                                    activeStep === 4 ||
                                    activeStep === 5 ? (
                                    <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                                ) : (
                                    <h1>2</h1>
                                )}
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] ml-16 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 3
                                    ? "bg-blue-500  text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {activeStep === 4 || activeStep === 5 ? (
                                    <IoIosCheckmarkCircle className="h-6 w-6 text-[#5D656A]" />
                                ) : (
                                    <h1>3</h1>
                                )}
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] end-0 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 4
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {activeStep === 5 ? (
                                    <IoIosCheckmarkCircle className="h-6 w-6 text-white" />
                                ) : (
                                    <h1>4</h1>
                                )}
                            </span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* here contents */}
            <div className="p-6">
                {activeStep === 1 && (
                    <div className="max-w-[400px] mx-auto py-20 space-y-5">
                        <div className="mt-4">
                            <div className="relative">
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    className="border border-black py-3 px-5 w-full"
                                />
                                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Your Name
                                </h1>
                            </div>
                            <div className="flex w-full justify-end items-center gap-5 py-10">
                                {!isLastStep && name && (
                                    <div
                                        onClick={handleButtonClick}
                                        className="flex cursor-pointer w-full justify-center items-center gap-2 bg-[#AEB2B4] px-10"
                                    >
                                        <button
                                            className={`text-white py-2 rounded ${name ? "enabled" : "disabled"
                                                }`}
                                        >
                                            Next{" "}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 2 && name && (
                    <div className="max-w-[600px] mx-auto py-10 space-y-5 flex flex-col justify-center items-center">
                        <div className="space-y-5">
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Property type
                                        </span>
                                    </div>
                                    <select
                                        onChange={(e) =>
                                            setProperty(e.target.value)
                                        }
                                        required
                                        className="select select-bordered"
                                        defaultValue={"Pick one"}
                                    >
                                        <option disabled value={"Pick one"}>
                                            Pick one
                                        </option>
                                        <option value={"house"}>House</option>
                                        <option value={"apartment/flat"}>
                                            Apartment/Flat
                                        </option>
                                        <option value={"townhouse"}>
                                            Townhouse
                                        </option>
                                        <option value={"farm"}>Farm</option>
                                        <option value={"commercial property"}>
                                            Commercial Property
                                        </option>
                                    </select>
                                </label>
                            </div>
                            {property === "commercial property" ? (
                                <div>
                                    <label className="form-control w-[400px]">
                                        <div className="label">
                                            <span className="label-text">
                                                Room
                                            </span>
                                        </div>
                                        <select
                                            required
                                            value={bedroom}
                                            onChange={(e) =>
                                                setRoom(e.target.value)
                                            }
                                            className="select select-bordered"
                                        >
                                            <option disabled value="">
                                                Pick one
                                            </option>
                                            <option value="1">1 Bedroom</option>
                                            <option value="2">
                                                2 Bedrooms
                                            </option>
                                            <option value="3">
                                                3 Bedrooms
                                            </option>
                                            <option value="4 or more">
                                                4 or more Bedrooms
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            ) : (
                                <div>
                                    <label className="form-control w-[400px]">
                                        <div className="label">
                                            <span className="label-text">
                                                Bedrooms
                                            </span>
                                        </div>
                                        <select
                                            required
                                            value={bedroom}
                                            onChange={(e) =>
                                                setBedroom(e.target.value)
                                            }
                                            className="select select-bordered"
                                        >
                                            <option disabled value="">
                                                Pick one
                                            </option>
                                            <option value="1">1 Bedroom</option>
                                            <option value="2">
                                                2 Bedrooms
                                            </option>
                                            <option value="3">
                                                3 Bedrooms
                                            </option>
                                            <option value="4 or more">
                                                4 or more Bedrooms
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            )}

                            {property === "commercial property" && (
                                <div class="bg-white rounded-lg border border-gray-300 px-3 py-1 form-control">
                                    <label class="cursor-pointer label">
                                        <span class="label-text">
                                            Add Parking ?
                                        </span>
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                            defaultValue={addParking}
                                            onChange={(e) =>
                                                setAddParking(!addParking)
                                            }
                                        />
                                    </label>
                                </div>
                            )}
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Street
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered"
                                        placeholder="Enter Street"
                                        value={street}
                                        onChange={(e) =>
                                            setStreet(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Suburb
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered"
                                        placeholder="Enter Suburb"
                                        value={suburb}
                                        onChange={(e) =>
                                            setSuburb(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Select Provinces & city
                                        </span>
                                    </div>
                                    <select
                                        name="selectProvinces"
                                        id="selectProvinces"
                                        defaultValue={selectedProvinces}
                                        onChange={handleChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" disabled>
                                            Select a Provinces & city
                                        </option>
                                        {provinces.map((province, idx) => (
                                            <optgroup
                                                label={province.provinces}
                                            >
                                                {province.cities.map(
                                                    (city, idx) => (
                                                        <option
                                                            key={idx}
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
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Description
                                        </span>
                                    </div>
                                    <textarea
                                        type="text"
                                        required
                                        className="textarea textarea-bordered"
                                        placeholder="Enter Description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Image
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        required
                                        name="image"
                                        className="file-input file-input-bordered"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">
                                            Bathrooms
                                        </span>
                                    </div>
                                    <select
                                        value={bathroom}
                                        required
                                        onChange={(e) =>
                                            setBathroom(e.target.value)
                                        }
                                        className="select select-bordered"
                                    >
                                        <option disabled value="">
                                            Pick one
                                        </option>
                                        <option value="1">1 Bathroom</option>
                                        <option value="2">2 Bathrooms</option>
                                        <option value="3">3 Bathrooms</option>
                                        <option value="4 or more">
                                            4 or more Bathrooms
                                        </option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-5 py-10">
                            <div className="grid grid-cols-2 w-[400px] justify-center items-center gap-5">
                                <button
                                    onClick={previousStep}
                                    className="bg-transparent w-full border border-gray-400 text-black px-10  py-2 rounded"
                                >
                                    Cancel
                                </button>

                                {!isLastStep &&
                                    property &&
                                    image &&
                                    description &&
                                    street &&
                                    suburb &&
                                    city &&
                                    bathroom && (
                                        <button
                                            onClick={handleButtonClick}
                                            className="bg-[#AEB2B4] px-10 w-full text-white py-2 rounded "
                                        >
                                            Next
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 3 &&
                    property &&
                    image &&
                    description &&
                    street &&
                    suburb &&
                    city &&
                    bathroom && (
                        <div className="py-20">
                            <div className="max-w-[400px] mx-auto clear-start space-y-5 ">
                                <p className="text-2xl font-medium text-center py-5">
                                    When would you likely be able to <br /> sell
                                    your property?
                                </p>
                                <button
                                    onClick={() => setSellTime("now")}
                                    className={`border w-full py-2 border-black hover:border-primary ${sellTime === "now"
                                        ? "bg-primary text-white"
                                        : ""
                                        }`}
                                >
                                    <h1>Now</h1>
                                </button>
                                <button
                                    onClick={() => setSellTime("1-3 month")}
                                    className={`border w-full py-2 border-black hover:border-primary ${sellTime === "1-3 month"
                                        ? "bg-primary text-white"
                                        : ""
                                        }`}
                                >
                                    <h1>1-3 months</h1>
                                </button>
                                <button
                                    onClick={() => setSellTime("4-6 month")}
                                    className={`border w-full py-2 border-black hover:border-primary ${sellTime === "4-6 month"
                                        ? "bg-primary text-white"
                                        : ""
                                        }`}
                                >
                                    <h1>4-6 months</h1>
                                </button>
                                <button
                                    onClick={() => setSellTime("not for sell")}
                                    className={`border w-full py-2 border-black hover:border-primary ${sellTime === "not for sell"
                                        ? "bg-primary text-white"
                                        : ""
                                        }`}
                                >
                                    <h1>I'm not looking to sell</h1>
                                </button>
                                <div className="flex justify-between items-center gap-5 py-5">
                                    {!isLastStep && sellTime && (
                                        <div
                                            onClick={handleButtonClick}
                                            className="flex bg-primary text-white w-[400px] cursor-pointer justify-center items-center gap-2 px-10"
                                        >
                                            <button className=" py-2 rounded">
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                {/* Step 4 content */}
                {activeStep === 4 && (
                    <div className=" py-20">
                        <div className="max-w-[400px] mx-auto space-y-8">
                            <div className="relative">
                                <input
                                    onChange={(e) =>
                                        setSpooName(e.target.value)
                                    }
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="border border-black py-3 px-5 w-full"
                                />
                                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Owner Name
                                </h1>
                            </div>
                            <div className="relative">
                                <input
                                    onChange={(e) =>
                                        setSpooEmail(e.target.value)
                                    }
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="shimul@gmail.com "
                                    className="border border-black py-3 px-5 w-full"
                                />
                                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Owner Email
                                </h1>
                            </div>
                            <div className="relative">
                                <input
                                    onChange={(e) =>
                                        setSpooPhone(e.target.value)
                                    }
                                    type="number"
                                    required
                                    name="mobile"
                                    placeholder="123456789"
                                    className="border border-black py-3 px-5 w-full"
                                />
                                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                                    Owner Phone Number
                                </h1>
                            </div>
                            <div className="relative">
                                <h1 className="px-1 bg-white text-sm">
                                    Do you have any selected agency?
                                </h1>
                                <div className="flex items-center space-x-4 py-5">
                                    <label>
                                        <input
                                            type="radio"
                                            name="selectedAgency"
                                            value="Yes"
                                            onChange={(e) =>
                                                setSelectedAgency(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="selectedAgency"
                                            value="No"
                                            onChange={(e) =>
                                                setSelectedAgency(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>
                            {selectedAgency === "Yes" && (
                                <div className="mt-6 relative">
                                    <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                        Select Agency
                                    </label>
                                    <select
                                        defaultValue={""}
                                        className="select select-bordered w-full"
                                        onChange={(e) => handleAgencySelect(e)}
                                    >
                                        <option value={""} disabled>
                                            Select an agency
                                        </option>
                                        {allAgency.map((agency, idx) => (
                                            <option
                                                key={idx}
                                                value={agency.name}
                                            >
                                                {agency.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {selectedAgency === "Yes" &&
                                (allAgent.length > 0 ? (
                                    <div className="mt-6 relative">
                                        <label className="block text-sm z-50 font-medium absolute -top-2 px-2 bg-white left-3 text-gray-700 rounded-xl">
                                            Select Agent
                                        </label>
                                        {/* <select
                                            className="select select-bordered w-full"
                                            defaultValue={""}
                                            onChange={(e) =>
                                                setSelectedAgent(e.target.value)
                                            }
                                        >
                                            <option value={""} disabled>
                                                Select an agent
                                            </option>
                                            {allAgent.map((agent, idx) => (
                                                <option
                                                    key={idx}
                                                    value={
                                                        {
                                                            name: agent.name,
                                                            email: agent.email
                                                        }
                                                    }
                                                >
                                                    {agent.name}
                                                </option>
                                            ))}
                                        </select> */}
                                        <select
                                            className="select select-bordered w-full"
                                            defaultValue=""
                                            onChange={(e) => {
                                                const selectedEmail = e.target.value;
                                                const selectedAgent = allAgent.find(agent => agent.email === selectedEmail);
                                                setSelectedAgent(selectedAgent);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select an agent
                                            </option>
                                            {allAgent.map((agent, idx) => (
                                                <option key={idx} value={agent.email}>
                                                    {agent.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <h3 className="text-center text-lg font-semibold">
                                        {" "}
                                        No Agent Available{" "}
                                    </h3>
                                ))}
                            <div className="flex justify-between items-center gap-5 py-10">
                                <div className="grid grid-cols-2 w-full justify-center items-center gap-5">
                                    <button
                                        onClick={previousStep}
                                        className="bg-transparent w-full border border-gray-400 text-black px-10  py-2 rounded"
                                    >
                                        Cancel
                                    </button>

                                    {isLastStep &&
                                        spooEmail &&
                                        spooName &&
                                        spooPhone &&
                                        (selectedAgency === "No" ||
                                            selectedAgency !== null) && (
                                            <button
                                                onClick={handleButtonClick}
                                                className="bg-blue-500 px-10 text-white py-2 rounded "
                                            >
                                                Submit
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Steper;
