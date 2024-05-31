import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import GatewayForm from "./views/gateways/GatewayForm";
import GatewayList from "./views/gateways/GatewayList";
import DeviceForm from "./views/device/DeviceForm";
import NotFound from "./views/NotFound";
import Login from "./views/auth/Login"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/user" element={<UserList />}></Route>
            <Route path="/user/new" element={<UserForm />}></Route>
            <Route path="/user/:id" element={<UserForm />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/auth" element={<Login />}></Route>
            <Route path="/device" element={<GatewayList />}></Route>
            <Route path="/gateway" element={<GatewayList />}></Route>
            <Route path="/gateway/new" element={<GatewayForm />}></Route>
            <Route path="/gateway/:id" element={<GatewayForm />}></Route>
            <Route path="/device/new" element={<DeviceForm />}></Route>    
        </Routes>
    );
}

export default AppRoutes;