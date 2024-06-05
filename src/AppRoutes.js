import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import GatewayForm from "./views/gateways/GatewayForm";
import GatewayList from "./views/gateways/GatewayList";
import DeviceForm from "./views/device/DeviceForm";
import DeviceList from "./views/device/DeviceList";
import DeviceDetails from "./views/device/DeviceDetails";
import ActuatorForm from "./views/actuator/ActuatorForm";
import SensorForm from "./views/sensor/SensorForm";
import SensorReadings from './views/sensor/SensorReadings';
import AddReading from './views/sensor/AddReading';
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
            <Route path="/gateway" element={<GatewayList />}></Route>
            <Route path="/gateway/new" element={<GatewayForm />}></Route>
            <Route path="/gateway/:id" element={<GatewayForm />}></Route>
            <Route path="/device" element={<DeviceList />}></Route>
            <Route path="/device/new" element={<DeviceForm />}></Route>
            <Route path="/device/:id" element={<DeviceForm />}></Route>
            <Route path="/device/details/:id" element={<DeviceDetails />}></Route>     
            <Route path="/actuator/new" element={<ActuatorForm />}></Route>
            <Route path="/sensor/new" element={<SensorForm />}></Route>
            <Route path="/actuator/:id" element={<ActuatorForm />}></Route>
            <Route path="/sensor/:id" element={<SensorForm />}></Route>
            <Route path="/sensor/:idSensor/readings" element={<SensorReadings />} />
            <Route path="/sensor/:idSensor/readings/new" element={<AddReading />} />
            <Route path="/sensor/:idSensor/readings/:id" element={<AddReading />} />
        </Routes>
    );
}

export default AppRoutes;