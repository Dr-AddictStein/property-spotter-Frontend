/* eslint-disable react/prop-types */
import { createElement, useState } from "react";
import * as Lucide from "react-icons/lu";
import { Link} from "react-router-dom";

export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(false);
    
    const toggleHandler = (e_) => {
        e_.stopPropagation();
        setOpen(!open);
    };

    if (item.childrens) {
        return (
            <div
                className={
                    open
                        ? "sidebar-item open text-white cursor-pointer"
                        : "sidebar-item  text-white cursor-pointer"
                }
                onClick={toggleHandler}
            >
                <div className="sidebar-title">
                    <span>
                        {item.icon && Lucide[item.icon]
                            ? createElement(Lucide[item.icon])
                            : null}
                        {item.title}
                    </span>
                    <button>
                        <svg
                            className={open ? "rotate-180" : ""}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                        </svg>
                    </button>
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => (
                        <SidebarItem key={index} item={child} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="sidebar-item plain">
                <Link to={item.path || "#"} className="sidebar-link">
                    {item.icon && Lucide[item.icon]
                        ? createElement(Lucide[item.icon])
                        : null}
                    {item.title}
                </Link>
            </div>
        );
    }
}
