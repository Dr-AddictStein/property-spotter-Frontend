import { PiHouseLight } from "react-icons/pi";

import { LiaToiletSolid } from "react-icons/lia";
import { LuBedDouble } from "react-icons/lu";
import { Link } from "react-router-dom";
import BannerImage from "../../assets/images/banner.svg";

const Banner = ({ search, setSearch, mainData, filterData }) => {

    return (
        <div
            className="flex justify-center items-center bg-primary bg-no-repeat bg-bottom w-full h-[550px]"
            style={{ backgroundImage: `url(${BannerImage})` }}
        >
            <div className="relative text-center space-y-5 w-full md:w-1/2 mx-auto">
                <h3 className="text-2xl md:text-5xl font-bold text-white py-3">
                Your property, Our treasure
                </h3>
                <div className="relative m-2 w-[90%] sm:w-[80%] md:w-full lg:m-0 mx-auto">
                    <PiHouseLight
                        className="absolute left-2 top-3.5 text-gray-600"
                        size={28}
                    />
                    <input
                        className="border focus:outline-none border-primary ring-4 rounded-md w-full px-10 pr-32 py-4"
                        type="search"
                        placeholder="Search for your dream house"
                        name=""
                        id=""
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="absolute right-4 top-2 bg-primary text-white text-xl font-bold rounded-md px-5 py-2">
                        Search
                    </button>
                </div>
                <div
                    className={`absolute ${search ? "" : "hidden"
                        } top-36 bg-white border border-primary h-40 w-full overflow-y-scroll px-3`}
                >
                    <ul>
                        {mainData.length > 0 &&
                            mainData.filter(filterData).map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/property-details/${item._id}`}
                                        className="flex justify-between items-center gap-3 py-2 px-5"
                                    >
                                        <img
                                            src={item.image}
                                            className="w-12 h-12 rounded-md"
                                            alt=""
                                        />
                                        <h3 className="text-lg font-medium">
                                            {item.address}
                                        </h3>
                                        <div className="flex flex-col ml-auto">
                                            <h3 className="font-medium">
                                                <LuBedDouble className="inline" />{" "}
                                                Bed:{item.bedroom}
                                            </h3>
                                            <h3 className="font-medium">
                                                <LiaToiletSolid className="inline" />{" "}
                                                Births:{item.bathroom}
                                            </h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner;
