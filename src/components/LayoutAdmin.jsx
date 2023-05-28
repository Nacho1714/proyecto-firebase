import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayoutAdmin = ({ user }) => {

    return (

        <>
            <Sidebar />

            <Outlet />
        </>

    );
};

export default LayoutAdmin;
