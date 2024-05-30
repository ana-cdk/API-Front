import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import GatewayForm from "./views/gateways/GatewayForm";
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
            <Route path="/gateway/new" element={<GatewayForm />}></Route>
            
        </Routes>
    );
}

export default AppRoutes;