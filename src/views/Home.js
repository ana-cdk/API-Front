import { useNavigate } from "react-router-dom";
import DeviceSensorReadings from "./dashboard/DeviceSensorReadings";

function Home() {
    
    const navigate = useNavigate();

    function handleGateway() {
        navigate('/gateway');
    }

    function handleDispositivo(){
        navigate('/device');
    }

    return(
        <>
            <DeviceSensorReadings />
        </>
    );
}
export default Home;