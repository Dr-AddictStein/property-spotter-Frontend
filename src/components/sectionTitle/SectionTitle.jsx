import React from "react";

const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className="max-w-6xl mx-auto py-3.5">
            <h3 className="text-3xl font-bold text-secondary">{heading}</h3>
            <h4 className="text-gray-800 my-1">{subheading}</h4>
        </div>
    );
};

export default SectionTitle;
