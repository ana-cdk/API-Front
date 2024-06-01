import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddReading() {
    const [valor, setValor] = useState('');
    const { idSensor } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        const reading = {
            valor: valor,
            idSensor: parseInt(idSensor)
        };

        fetch('http://localhost:8081/leitura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reading)
        })
        .then(response => {
            if (response.ok) {
                navigate(`/sensor/${idSensor}/readings`); // Redireciona para a página de leituras do sensor
            } else {
                throw new Error('Erro ao adicionar leitura');
            }
        })
        .catch(e => console.error(e));
    };

    return (
        <div>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</button>
            <h2>Adicionar Nova Leitura</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="text"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idSensor">ID do Sensor</label>
                    <input
                        type="number"
                        id="idSensor"
                        value={idSensor}
                        className="form-control"
                        disabled
                    />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar Leitura</button>
            </form>
           
        </div>
    );
}

export default AddReading;
