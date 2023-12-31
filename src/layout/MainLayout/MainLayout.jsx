import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const MainLayout = () => {
    return (
        <div className="flex justify-center items-center">
           <div>
           <Header></Header>
            <Outlet></Outlet>
           </div>
        </div>
    );
};

export default MainLayout;