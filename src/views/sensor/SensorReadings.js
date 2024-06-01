import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SensorReadings() {
    const { idSensor } = useParams();
    const navigate = useNavigate();
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetch(`http://localhost:8081/leitura?sensorId=${idSensor}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/auth');
                }
                throw new Error('Erro ao buscar leituras do sensor');
            }
            return response.json();
        })
        .then(data => setReadings(data))
        .catch(e => console.log(e));
    }, [idSensor, navigate]);

    const handleAddReading = () => {
        navigate(`/sensor/${idSensor}/readings/new`);
    };

    return (
        <div>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</button>
            <h2>Registros de Leituras do Sensor</h2>
            {readings.length > 0 ? (
                <ul>
                    {readings.map((reading, index) => (
                        <li key={index}>{reading.valor} em {new Date(reading.data).toLocaleString()}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma leitura encontrada.</p>
            )}
             <button type="button" className="btn btn-primary" onClick={handleAddReading}>Adicionar Nova Leitura</button>
            
        </div>
    );
}

export default SensorReadings;
