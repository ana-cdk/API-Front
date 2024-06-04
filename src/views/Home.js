import React, { useEffect, useState } from 'react';
import DeviceSensorReadings from "./dashboard/DeviceSensorReadings";
import '../styles/UserForm.css'; // Certifique-se de que este caminho esteja correto

function Home() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('showAlert') === 'true') {
            setShowAlert(true);
            sessionStorage.removeItem('showAlert');
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    }, []);

    return (
        <>

            
            {showAlert && (
                <div className="alert alert-success alert-container" role="alert">
                    Usuário criado com sucesso!
                </div>
            )}
            <DeviceSensorReadings />
        </>
    );
}

export default Home;
