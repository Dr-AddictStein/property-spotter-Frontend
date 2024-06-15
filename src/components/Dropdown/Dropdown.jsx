import React, { useState } from "react";

const Dropdown = ({houseUpdate}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="flex items-center">
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="btn btn-primary"
                >
                    Action
                </button>

                <div
                    onClick={() => setDropdownOpen(false)}
                    className={`fixed inset-0 z-50 w-full h-full ${
                        dropdownOpen ? "" : "hidden"
                    }`}
                ></div>

                <div
                    className={`absolute right-0 bottom-0 z-50 w-32 mt-2 overflow-hidden bg-white rounded shadow-xl ${
                        dropdownOpen ? "" : "hidden"
                    }`}
                >
                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        Approved
                    </button>
                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        Sold
                    </button>

                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        Hold
                    </button>
                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        PENDING MANDATE
                    </button>
                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        Pending
                    </button>
                    <button onClick={(e) => houseUpdate(e, house._id)}>
                        PENDING CONTACT WITH CLIENT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
