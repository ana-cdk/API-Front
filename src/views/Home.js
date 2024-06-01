import { useNavigate } from "react-router-dom";
import ReadingsGraphic from "./dashboard/ReadingsGraphic";

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
            <ReadingsGraphic></ReadingsGraphic>
           
            <button className="btn btn-secondary" onClick={handleGateway}>Gateways</button>
            <button className="btn btn-secondary" onClick={handleDispositivo}>Dispositivos</button>
        </>
    );
}
export default Home;