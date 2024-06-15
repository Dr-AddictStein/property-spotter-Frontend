import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Main from "../Layout/Main";
import Chat from "../MessageComponents/Chat";
import AboutUs from "../Pages/AboutUs";
import BuyPage from "../Pages/Buy/Buy";
import CommercialPage from "../Pages/Commercial/Commercial";
import Home from "../Pages/Home/Home";
import ManageSpottedListings from "../Pages/ManageSpottedListings/ManageSpottedListings";
import PaidOutListings from "../Pages/PaidOutListings/PaidOutListings";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import ResidentialPage from "../Pages/Residential/Residential";
import SellPage from "../Pages/Sell/Sell";
import SuccessfulListings from "../Pages/SuccessfulListings/SuccessfulListings";
import UnsuccessfulListings from "../Pages/UnsuccessfulListings/UnsuccessfulListings";
import LoginSignUp from "../components/Authentication/LoginSignUp";
import OtpUI from "../components/Authentication/OtpUI/OtpUI";
import ManageAgency from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgency";
import ManageAgent from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageAgent";
import ManageListByAdmin from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageListByAdmin";
import ManageListByAgency from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageListByAgency";
import ManageListBySpotter from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageListBySpotter";
import ManageSpotters from "../components/DashBoardComponent/AdminComponents/ManageAllLists/ManageSpotters";
import ManageArea from "../components/DashBoardComponent/AdminComponents/ManageArea/ManageArea";
import ManageListing from "../components/DashBoardComponent/AgencyComponents/ManageListing";
import ManageListsByAgent from "../components/DashBoardComponent/AgencyComponents/ManageListsByAgent";
import ManageListsBySpotter from "../components/DashBoardComponent/AgencyComponents/ManageListsBySpotter";
import PendingSpottedLists from "../components/DashBoardComponent/AgencyComponents/PendingSpottedLists";
import ManageLIstings from "../components/DashBoardComponent/AgentCoomponents/ManageLIstings";
import PendingSpottedLIst from "../components/DashBoardComponent/AgentCoomponents/PendingSpottedLIst";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ForgotPassword/ResetPassword/ResetPassword";
import Profiles from "../components/Profiles/Profiles";
import SoopReg from "../components/SpooterRegistra/SoopReg";
import PrivateRouter from "./PrivateRouter";
// import Chat from "../MessageComponents/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/buy",
        element: <BuyPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sell",
        element: <PrivateRouter><SellPage /></PrivateRouter>,
      },
    
      {
        path: "/residential",
        loader: () => fetch("http://localhost:5000/house/houseAvailableData"),
        element: <ResidentialPage />,
      },
      {
        path: "/commercial",
        loader: () => fetch("http://localhost:5000/house/houseAvailableData"),
        element: <CommercialPage />,
      },
      {
        path: "/loginSignup",
        element: <LoginSignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset_password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/spotter-reg",
        element: <SoopReg />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/otp",
        element: <OtpUI />,
      },
      {
        path: '/property-details/:id',
        loader: ({ params }) => fetch(`http://localhost:5000/house/single-house-data/${params.id}`),
        element: <PropertyDetails />
      },
      {
        path: "/manage-spotted-listings",
        element: <PrivateRouter><ManageSpottedListings /></PrivateRouter>
      },
      {
        path: "/successful-listings",
        element: <PrivateRouter><SuccessfulListings /></PrivateRouter>
      },
      {
        path: "/unsuccessful-listings",
        element: <PrivateRouter><UnsuccessfulListings /></PrivateRouter>
      },
      {
        path: "/paid-out-listings",
        element: <PrivateRouter><PaidOutListings /></PrivateRouter>
      },
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/manageAreas",
        element: <ManageArea />,
      },
      {
        path: "/dashboard/ManageAllListings/manageAgencies",
        element: <ManageAgency />,
      },
      {
        path: "/dashboard/ManageAllListings/manageAgents",
        element: <ManageAgent />,
      },
      {
        path: "/dashboard/ManageAllListings/manageSpotters",
        element: <ManageSpotters />,
      },
      {
        path: "/dashboard/ManageAllListings/manageListingByAgency",
        element: <ManageListByAgency />,
      },
      {
        path: "/dashboard/ManageAllListings/manageListingBySpotter",
        element: <ManageListBySpotter />
      },
      {
        path: "/dashboard/ManageAllListings/manageListingByAdmin",
        element: <ManageListByAdmin />,
      },
      {
        path: "/dashboard/ManageAllListings/profile",
        element: <Profiles />,
      },
      {
        path: "/dashboard/message",
        element: <Chat />,
      },

      //Agency Components--------------------------
      {
        path: "/dashboard/agency/manageListings",
        element: <ManageListing />,
      },
      {
        path: "/dashboard/agency/manageListingsByAgent",
        element: <ManageListsByAgent />,
      },
      {
        path: "/dashboard/agency/pendingSpottedListings",
        element: <PendingSpottedLists />,
      },
      {
        path: "/dashboard/agency/manageListingsBySpotter",
        element: <ManageListsBySpotter />,
      },
      {
        path: "/dashboard/agency/profile",
        element: <Profiles />,
      },
      {
        path: "/dashboard/message",
        element: <Chat />,
      },

      //Agent Components-----------------------
      {
        path: "/dashboard/agent/profile",
        element: <Profiles />,
      },
      {
        path: "/dashboard/agent/pendingSpottedListings",
        element: <PendingSpottedLIst />,
      },
      {
        path: "/dashboard/agent/manageListing",
        element: <ManageLIstings />,
      },
      {
        path: "/dashboard/message",
        element: <Chat />,
      },
    ],
  },
]);
