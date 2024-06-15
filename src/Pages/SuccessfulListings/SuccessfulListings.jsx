import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Container from "../../components/Container/Container";
import Loading from "../../components/Loader/Loading";
import { Helmet } from "react-helmet-async";

const SuccessfulListings = () => {
    const { user, loading } = useContext(AuthContext);
    const [spottedList, setSpottedList] = useState([]);
    const [rowsLimit] = useState(5);
    const [rowsToShow, setRowsToShow] = useState(
        spottedList.slice(0, rowsLimit)
    );
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = spottedList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = spottedList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = spottedList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    const fetchData = async () => {
        if (user?.email) {
            const res = await fetch(
                `http://localhost:5000/house/spotted-list-success/${user.email}`
            );
            const data = await res.json();
            console.log(data);
            setSpottedList(data);
            setCustomPagination(
                Array(Math.ceil(data?.length / rowsLimit)).fill(null)
            );
            setRowsToShow(data.slice(0, rowsLimit));
            setTotalPage(Math.ceil(data?.length / rowsLimit));
        }
    };
    useEffect(() => {
        fetchData();
    }, [user?.email]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
             <Helmet>
        <title>Successful Listings</title>
      </Helmet>
            <div className="flex flex-col md:flex-row justify-between py-10 lg:gap-10 px-3 lg:px-0">
                <div className="md:w-1/4">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-2xl text-primary bg-blue-300 rounded-xl text-center py-2">
                            {" "}
                            My Account
                        </h3>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-primary text-white text-lg w-full px-5 py-2.5"
                                    : "bg-blue-100 text-primary text-lg w-full px-5 py-2.5"
                            }
                            to={"/manage-spotted-listings"}
                        >
                            Manage Spotted Listings
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-primary text-white text-lg w-full px-5 py-2.5"
                                    : "bg-blue-100 text-primary text-lg w-full px-5 py-2.5"
                            }
                            to={"/successful-listings"}
                        >
                            Successful Listings
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-primary text-white text-lg w-full px-5 py-2.5"
                                    : "bg-blue-100 text-primary text-lg w-full px-5 py-2.5"
                            }
                            to={"/unsuccessful-listings"}
                        >
                            Unsuccessful listings
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-primary text-white text-lg w-full px-5 py-2.5"
                                    : "bg-blue-100 text-primary text-lg w-full px-5 py-2.5"
                            }
                            to={"/paid-out-listings"}
                        >
                            Paid Out Listings
                        </NavLink>
                    </div>
                </div>
                <div className="md:w-3/4">
                    <div className="w-full px-2">
                        <div>
                            <h1 className="text-2xl text-primary text-center md:text-left font-medium pt-3.5 md:pt-0">
                                Successful Listings
                            </h1>
                        </div>
                        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
                                <thead className="w-full">
                                    <tr className="bg-primary text-white">
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            ID
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Image
                                        </th>
                                        <th className="py-3 px-3  justify-center gap-1 sm:text-base font-bold whitespace-nowrap">
                                            Owner Name
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Owner Phone
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Bedroom
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Bathroom
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Sell Time
                                        </th>
                                        <th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rowsToShow?.map((data, index) => (
                                        <tr
                                            className={`${
                                                index % 2 == 0
                                                    ? "bg-white"
                                                    : "bg-blue-100"
                                            }`}
                                            key={index}
                                        >
                                            <td
                                                className={`py-2 px-3 font-normal text-base whitespace-nowrap`}
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                className={`py-2 px-3 font-normal text-base whitespace-nowrap`}
                                            >
                                                <img
                                                    src={data?.image}
                                                    className="rounded w-12 h-12"
                                                    alt=""
                                                />
                                            </td>
                                            <td
                                                className={`py-2 px-3 font-normal text-base whitespace-nowrap`}
                                            >
                                                {data?.houseOwnerName}
                                            </td>
                                            <td
                                                className={`py-2 px-3 text-base  font-normal whitespace-nowrap`}
                                            >
                                                {data?.houseOwnerPhone}
                                            </td>
                                            <td
                                                className={`py-5 px-4 text-base  font-normal`}
                                            >
                                                {data?.bedroom}
                                            </td>
                                            <td
                                                className={`py-5 px-4 text-base  font-normal`}
                                            >
                                                {data?.bathroom}
                                            </td>
                                            <td
                                                className={`py-5 px-4 text-base  font-normal`}
                                            >
                                                {data?.sellTime}
                                            </td>
                                            <td
                                                className={`py-5 px-4 text-base font-normal`}
                                            >
                                                {data?.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                            <div className="text-lg">
                                Showing{" "}
                                {currentPage == 0
                                    ? 1
                                    : currentPage * rowsLimit + 1}{" "}
                                to{" "}
                                {currentPage == totalPage - 1
                                    ? spottedList?.length
                                    : (currentPage + 1) * rowsLimit}{" "}
                                of {spottedList?.length} entries
                            </div>
                            <div className="flex">
                                <ul
                                    className="flex justify-center items-center gap-x-[10px] z-30"
                                    role="navigation"
                                    aria-label="Pagination"
                                >
                                    <li
                                        className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-blue-200 disabled] ${
                                            currentPage == 0
                                                ? "bg-blue-100 pointer-events-none"
                                                : " cursor-pointer"
                                        }
  `}
                                        onClick={previousPage}
                                    >
                                        <MdKeyboardArrowLeft className="text-xl text-primary inline" />
                                    </li>
                                    {customPagination?.map((data, index) => (
                                        <li
                                            className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                                                currentPage == index
                                                    ? "text-primary  border-primary"
                                                    : "border-blue-200 "
                                            }`}
                                            onClick={() => changePage(index)}
                                            key={index}
                                        >
                                            {index + 1}
                                        </li>
                                    ))}
                                    <li
                                        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-blue-200 ${
                                            currentPage == totalPage - 1
                                                ? "bg-blue-100 pointer-events-none "
                                                : " cursor-pointer"
                                        }`}
                                        onClick={nextPage}
                                    >
                                        <MdKeyboardArrowRight className="text-xl text-primary inline" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SuccessfulListings;
