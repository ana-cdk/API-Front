import { useNavigate } from "react-router-dom";

function Home() {
    
    const navigate = useNavigate();

    function handleGateway() {
        navigate('/gateway');
    }
    return(
        <>
            Dashboard
           
            <button className="btn btn-secondary" onClick={handleGateway}>Gateways</button>
        </>
    );
}
export default Home;