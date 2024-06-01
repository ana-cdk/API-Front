import { useNavigate } from "react-router-dom";

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
            Dashboard
           
            <button className="btn btn-secondary" onClick={handleGateway}>Gateways</button>
            <button className="btn btn-secondary" onClick={handleDispositivo}>Dispositivos</button>
        </>
    );
}
export default Home;