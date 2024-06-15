import { Link } from "react-router-dom";

const PlacesCard = ({ item }) => {
    return (
        <div className="block rounded-xl w-52">
            <h2 className="text-2xl text-secondary font-semibold py-1 my-2">
                {item.provinces}
            </h2>
            <div>
                {item.cities.map((item, idx) => (
                    <Link className="block" to={`/buy?city=${item}`} key={idx}>{item}</Link>
                ))}
            </div>
        </div>
    );
};

export default PlacesCard;
