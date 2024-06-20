import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import AdvertisesProperty from "./AdvertisesProperty";
import Banner from "./Banner";
import Places from "./Places";
import ReducedPrice from "./ReducedPrice";
import SplashScreen from "./SplashScreen";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        const res = await fetch(
            "https://api.propertyspotter.co.za/house/houseAvailableData"
        );
        const data = await res.json();
        setMainData(data);
    };
    const filterData = (item) => {
        const searchMatch = item.propertyType
            .toLowerCase()
            .includes(search.toLowerCase());
        const locationMatch = item.address
            .toLowerCase()
            .includes(search.toLowerCase());
        return searchMatch || locationMatch;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(user);
    return (
        <main>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {user?.role === 'spotter' && <AdvertisesProperty />}
            {!user && <SplashScreen />}
            <Banner
                search={search}
                setSearch={setSearch}
                mainData={mainData}
                filterData={filterData}
            />
            <Places />
            <ReducedPrice mainData={mainData} filterData={filterData} />
            {/* <Steper /> */}
        </main>
    );
};
export default Home;
