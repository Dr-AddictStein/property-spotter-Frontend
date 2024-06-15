import { Select } from "antd";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";

const ManageAgent = () => {
  const [showName, setShowName] = useState("");
  const [showImagePreview, setShowImagePreview] = useState("");
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [AgentPerPage] = useState(6);
  const [allAgency, setAllAgency] = useState([]);
  const [listings, setListings] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editAgentData, setEditAgentData] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/allusers/filterby/agency"
      );
      setAllAgency(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/allusers/filterby/agent`
      );

      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchAgentData();
  }, [user]);

  const getBadgeClass = (role) => {
    switch (role) {
      case "approved":
        return "badge-accent";
      case "pending":
        return "badge-warning";
      case "offer pending":
        return "badge-warning";
      case "pending mandate":
        return "badge-warning";
      case "hold":
        return "badge-warning";
      case "available":
        return "badge-success";
      case "sold":
        return "badge-success";
      default:
        return "";
    }
  };

  // Logic for pagination
  const indexOfLastFlat = currentPage * AgentPerPage;
  const indexOfFirstFlat = indexOfLastFlat - AgentPerPage;
  const currentJobs = listings.slice(indexOfFirstFlat, indexOfLastFlat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const createModal = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("role", "agent");
    formData.append("images", showName);
    formData.append("agencyName", selectedOrganization);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: formData,
      });
      e.target.reset();
      fetchAgentData();
      setOpenCreateModal(false);
      handleClearFile();
      toast.success(`Successfully Added`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (email) => {
    try {
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
        await fetch(`http://localhost:5000/user/delete/${email}`, {
          method: "DELETE",
        });
        fetchAgentData();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Canceled!",
          text: "Your file safe.",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openEditModalF = (agent) => {
    setEditAgentData(agent);
    setTimeout(setOpenEditModal(true), 100);
  };
  const openCloseModalF = (agent) => {
    setEditAgentData(null);
    setOpenEditModal(false);
  };
  const editModal = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("images", showName);

    try {
      const res = await fetch(
        `http://localhost:5000/update/${editAgentData.email}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      fetchAgentData();
      setOpenEditModal(false);
      handleClearFile();
      toast.success(`Successfully Updated`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Manage Agent</title>
      </Helmet>
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-7">
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
            Total Agent:
            <span className="text-3xl text-primary font-bold">
              {listings.length}
            </span>
          </h4>
        </div>
        <div className="flex justify-center items-center shadow-xl border-2 border-primary p-4 rounded-md mb-7">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="text-xl text-white active:scale-95 bg-primary font-medium px-3 py-2.5"
          >
            Create Agent
          </button>
          <div
            onClick={() => setOpenCreateModal(false)}
            className={`fixed z-[100] flex items-center justify-center ${
              openCreateModal ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className={`absolute w-full rounded-lg bg-white drop-shadow-2xl sm:w-[500px] ${
                openCreateModal
                  ? "opacity-1 translate-y-0 duration-300"
                  : "-translate-y-20 opacity-0 duration-150"
              }`}
            >
              <form
                onSubmit={createModal}
                className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 overflow-y-scroll h-96 lg:h-[500px]"
              >
                <svg
                  onClick={() => setOpenCreateModal(false)}
                  className="mx-auto mr-0 w-10 cursor-pointer fill-primary dark:fill-white"
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
                      name="name"
                      placeholder="Name"
                      className="border border-black py-3 px-5 w-full"
                    />
                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                      Agent Name
                    </h1>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="border border-black py-3 px-5 w-full"
                    />
                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                      Email
                    </h1>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="password"
                      placeholder="*********"
                      className="border border-black py-3 px-5 w-full"
                    />
                    <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                      Password
                    </h1>
                  </div>
                  {/* Image preview section */}
                  <div className="my-10">
                    {showName && (
                      <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                        <img
                          className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                          src={showImagePreview}
                          alt="Uploaded"
                        />
                        {/* Display the name and size of the uploaded image */}
                        <div className="flex-1 space-y-1.5 overflow-hidden">
                          <h5 className="text-xl font-medium tracking-tight truncate">
                            {showName.name}
                          </h5>
                          <p className="text-gray-500">
                            {(showName.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        {/* Button to clear the file */}
                        <div
                          className="btn btn-primary"
                          onClick={handleClearFile}
                        >
                          X
                        </div>
                      </div>
                    )}
                    {/* Input field for file upload */}
                    <label
                      className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
                      htmlFor="fileInput"
                    >
                      <svg
                        width={50}
                        viewBox="0 0 42 32"
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG content */}
                      </svg>
                      <div className="space-y-1.5 text-center">
                        <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
                          Upload your file
                        </h5>
                        <p className="text-sm text-gray-500">
                          File should be in PNG, JPEG, or JPG format
                        </p>
                      </div>
                    </label>
                    <input
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const imageFile = e.target.files[0];
                          setShowName(imageFile);
                          setShowImagePreview(URL.createObjectURL(imageFile));
                        }
                      }}
                      className="hidden"
                      id="fileInput"
                      type="file"
                    />
                    <div className="mt-6 relative">
                      <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-black">
                        Select Agency
                      </label>
                      <Select
                        defaultValue={selectedOrganization}
                        name="colors"
                        className="w-full"
                        options={allAgency.map((agents) => ({
                          value: agents.name,
                          label: agents.name,
                        }))}
                        onChange={(value) => setSelectedOrganization(value)}
                      />
                    </div>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="border-2 bg-primary text-white border-primary py-3 px-5 w-full"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-2xl border-2 border-primary p-5 rounded-md">
        <div className="flex justify-between"></div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>No.</th>
                <th>Agent</th>
                <th>Name</th>
                <th>Email</th>
                <th>Agency Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentJobs.map((agent, index) => (
                <tr key={agent?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={agent?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{agent?.name}</td>
                  <td>{agent?.email}</td>
                  <td>{agent?.agencyName}</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => openEditModalF(agent)}
                        className="btn btn-primary px-0 py-0"
                      >
                        <CiEdit className="mx-2 my-1.5" size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(agent?.email)}
                        className="btn btn-error bg-red-700 border-red-700 px-0 py-0"
                      >
                        <MdOutlineDelete className="mx-2 my-1.5" size={20} />
                      </button>
                    </div>
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
            <span className="text-white"> &larr; Previous page</span>
          </button>
          {Array.from(
            { length: Math.ceil(listings.length / AgentPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`join-item btn btn-outline btn-primary  text-white mr-2 ${
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
            className="join-item btn btn-outline btn-primary  mr-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(listings.length / AgentPerPage)}
          >
            <span className="text-white">Next&rarr;</span>
          </button>
        </div>
      </div>
      <div
        onClick={() => openCloseModalF()}
        className={`fixed z-[100] flex items-center justify-center ${
          openEditModal ? "opacity-1 visible" : "invisible opacity-0"
        } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-full rounded-lg bg-white drop-shadow-2xl sm:w-[500px] ${
            openEditModal
              ? "opacity-1 translate-y-0 duration-300"
              : "-translate-y-20 opacity-0 duration-150"
          }`}
        >
          <form
            onSubmit={editModal}
            className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10 overflow-y-scroll h-96 lg:h-[500px]"
          >
            <svg
              onClick={() => openCloseModalF()}
              className="mx-auto mr-0 w-10 cursor-pointer fill-primary dark:fill-white"
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
                  name="name"
                  placeholder="Name"
                  defaultValue={editAgentData?.name}
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Agent Name
                </h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  defaultValue={editAgentData?.email}
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Email
                </h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="password"
                  placeholder="*********"
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Password
                </h1>
              </div>
              {/* Image preview section */}
              <div className="my-10">
                {showName && (
                  <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                    <img
                      className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                      src={showImagePreview}
                      alt="Uploaded"
                    />
                    {/* Display the name and size of the uploaded image */}
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <h5 className="text-xl font-medium tracking-tight truncate">
                        {showName.name}
                      </h5>
                      <p className="text-gray-500">
                        {(showName.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    {/* Button to clear the file */}
                    <div className="btn btn-primary" onClick={handleClearFile}>
                      X
                    </div>
                  </div>
                )}
                {/* Input field for file upload */}
                <label
                  className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
                  htmlFor="fileInput"
                >
                  <svg
                    width={50}
                    viewBox="0 0 42 32"
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG content */}
                  </svg>
                  <div className="space-y-1.5 text-center">
                    <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
                      Upload your file
                    </h5>
                    <p className="text-sm text-gray-500">
                      File should be in PNG, JPEG, or JPG format
                    </p>
                  </div>
                </label>
                <input
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setShowName(imageFile);
                      setShowImagePreview(URL.createObjectURL(imageFile));
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                  type="file"
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="border-2 bg-primary text-white border-primary py-3 px-5 w-full"
              >
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageAgent;
