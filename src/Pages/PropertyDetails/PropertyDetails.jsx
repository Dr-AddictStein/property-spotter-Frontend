import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaRegCalendarAlt, FaTag } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PropertyDetails = () => {
    const propertyData = useLoaderData();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Helmet>
                <title>Property Details</title>
            </Helmet>
            <div className="max-w-screen-2xl mx-auto">
                <div className=" w-[80%] mx-auto my-28">
                    {/* Detais part */}
                    <img
                        className="w-full rounded-3xl md:h-[600px] h-[400px]"
                        src={propertyData?.image}
                        alt=""
                    />
                    <div>
                        <div className=" flex items-center justify-start gap-7 mt-7">
                            <p className=" text-xl flex items-center justify-center gap-2">
                                <FaRegCalendarAlt className=" text-primary"></FaRegCalendarAlt>
                                <span className=" hover:text-primary uppercase text-sm">
                                    {new Date(
                                        propertyData?.createDate
                                    ).toDateString()}
                                </span>
                            </p>
                            {user && (
                                <p className=" md:text-xl flex justify-center items-center gap-2">
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
                                    </span>
                                    <span className=" hover:text-primary uppercase text-xs md:text-base">
                                        {`${propertyData.suburb} ${propertyData.city}  ${propertyData.province}`}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className=" flex items-center gap-1 text-xl py-8">
                            <FaTag></FaTag>
                            <h4>
                                <span className="text-3xl font-extrabold">
                                    Property Type:{" "}
                                    <span className="capitalize">
                                        {propertyData?.propertyType}
                                    </span>
                                </span>
                            </h4>
                        </div>
                        <p className="my-5 space-y-2 font-bold text-3xl ">
                            Details :
                        </p>
                        <div className="bg-white rounded-3xl border flex md:flex-row flex-col items-center gap-8 py-10 px-7">
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                >
                                    <path
                                        d="M34.615 46.1542L21.1533 46.1542C19.5506 46.1542 18.1881 45.5935 17.0662 44.4716C15.9449 43.3497 15.3835 41.9876 15.3835 40.3845V38.4623C15.3835 34.2152 16.8862 30.5897 19.8914 27.5846C22.8963 24.5805 26.5225 23.0778 30.7691 23.0778H34.615C35.6565 23.0778 36.5576 22.697 37.3191 21.9361C38.0803 21.1747 38.4608 20.2736 38.4608 19.2319V11.5389C38.4608 10.4974 38.0801 9.59543 37.3191 8.83408C36.5578 8.07379 35.6567 7.69238 34.615 7.69238L30.7691 7.69238C26.602 7.69238 22.6265 8.50446 18.84 10.1263C15.0539 11.7492 11.7791 13.9429 9.01428 16.7077C6.2497 19.4712 4.0566 22.7462 2.43393 26.5328C0.811258 30.3188 -0.000183105 34.2954 -0.000183105 38.4621L-0.000183105 80.7688C-0.000183105 83.9756 1.1211 86.6985 3.36472 88.9429C5.60854 91.1861 8.33355 92.3076 11.5385 92.3076H34.6164C37.8212 92.3076 40.5453 91.1861 42.7894 88.9429C45.0326 86.6985 46.1545 83.9756 46.1545 80.7688V57.6929C46.1545 54.4867 45.0326 51.7638 42.7879 49.5191C40.5449 47.2762 37.8197 46.1542 34.615 46.1542Z"
                                        fill="#151515"
                                    />
                                    <path
                                        d="M96.6366 49.5191C94.3936 47.2762 91.6692 46.1542 88.4637 46.1542L75.0022 46.1542C73.4004 46.1542 72.0366 45.5935 70.9166 44.4716C69.7942 43.3497 69.2339 41.9876 69.2339 40.3845V38.4623C69.2339 34.2152 70.7366 30.5897 73.7403 27.5846C76.7442 24.5805 80.3701 23.0778 84.6189 23.0778H88.4639C89.5056 23.0778 90.4074 22.697 91.1683 21.9361C91.9288 21.1747 92.3108 20.2736 92.3108 19.2319V11.5389C92.3108 10.4974 91.929 9.59543 91.1683 8.83408C90.4076 8.07379 89.5058 7.69238 88.4639 7.69238L84.6189 7.69238C80.4495 7.69238 76.4748 8.50446 72.6872 10.1263C68.9018 11.7492 65.628 13.9429 62.8632 16.7077C60.0984 19.4712 57.9043 22.7462 56.2822 26.5328C54.66 30.3188 53.8475 34.2954 53.8475 38.4621V80.7688C53.8475 83.9756 54.9698 86.6985 57.2128 88.9429C59.456 91.1861 62.1804 92.3076 65.3857 92.3076H88.4624C91.668 92.3076 94.3921 91.1861 96.6351 88.9429C98.8798 86.6985 99.9998 83.9756 99.9998 80.7688V57.6929C100 54.4865 98.8798 51.7638 96.6366 49.5191Z"
                                        fill="#151515"
                                    />
                                </svg>
                            </button>
                            <p className="mt-3 space-y-2">
                                {propertyData?.description}
                            </p>
                        </div>
                        <div className=" border flex md:flex-row flex-col bg-white rounded-3xl justify-between items-center gap-8 py-6 px-5 mt-7">
                            <div className=" flex items-center gap-1 text-xl">
                                <LuBedDouble></LuBedDouble>
                                <h4>
                                    {propertyData.propertyType ===
                                    "commercial property" ? (
                                        <span className=" font-bold">
                                            Room: {propertyData?.room}
                                        </span>
                                    ) : (
                                        <span className=" font-bold">
                                            Bedroom: {propertyData?.bedroom}
                                        </span>
                                    )}
                                </h4>
                            </div>
                            <div className=" flex items-center gap-1 text-xl">
                                <LuBedDouble></LuBedDouble>
                                <h4>
                                    <span className=" font-bold">
                                        Bathroom: {propertyData?.bathroom}
                                    </span>
                                </h4>
                            </div>
                            <div className=" flex items-center gap-1 text-xl">
                                <MdOutlineTimer></MdOutlineTimer>
                                <h4>
                                    <span className=" font-bold">
                                        Sell Time: {propertyData?.sellTime}
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white rounded-3xl border flex md:flex-row flex-col justify-evenly items-center gap-8 py-6 px-5 my-7">
                        <div>
                            <img
                                className="h-40 w-40 rounded-full"
                                src={propertyData?.agencyImage}
                                alt=""
                            />
                            <div>
                                <h2 className="text-xs lg:text-3xl font-bold ">
                                    {propertyData?.agencyName}
                                </h2>
                                {/* <p className=" leading-8 text-xs lg:text-xl text-gray-400 mt-2">
                                Email: {propertyData?.agencyEmail}
                            </p> */}
                            </div>
                        </div>
                        <div>
                            <img
                                className="h-40 w-40 rounded-full"
                                src={propertyData?.agentImage}
                                alt=""
                            />
                            <div>
                                <h2 className="text-xs lg:text-3xl font-bold ">
                                    {propertyData?.agent}
                                </h2>
                                <p className=" leading-8 text-xs lg:text-xl text-gray-400 mt-2">
                                Email: {propertyData?.agentEmail}
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyDetails;
