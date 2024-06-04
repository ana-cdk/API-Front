import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URL_API } from "../../Const";
import styles from '../../styles/Lists.module.css'

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

        fetch(`${URL_API}sensor/${idSensor}`, {
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
        .then(data => {
            console.log('Data fetched:', data); // Adicionando log para verificar os dados
            setReadings(data.leituras);
        })
        .catch(e => console.log(e));
    }, [idSensor, navigate]);

    const handleAddReading = () => {
        navigate(`/sensor/${idSensor}/readings/new`);
    };

    return (

        <>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</button>

            <div className={`row ${styles.marginBottom}`}>
                <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <div class="card">
                            <div class="card-body">
                                <div className={styles.headerRow}>
                                    <h3>Registro de leituras</h3>
                                    <i type="button" className="fa-solid fa-plus" onClick={handleAddReading}></i>
                                </div>

                                <table class="table table-striped">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Valor</th>
                                            <th>Data</th>
                                            <th>Hora</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {readings.length > 0 ? (
                                            readings.map((reading, index) => (
                                            <tr key={index}>
                                                <td>{reading.valor}</td>
                                                <td>{new Date(reading.data).toLocaleDateString()}</td>
                                                <td>{new Date(reading.data).toLocaleTimeString()}</td>
                                                <td className={styles.btnGap}>
                                                    <i type="button" className={`fa-solid fa-pen-to-square ${styles.editIcon}`} ></i>
                                                    <i type="button" className={`fa fa-trash ${styles.deleteIcon}`}></i>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="4">Nenhuma leitura encontrada.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table> 
                        </div>
                    </div>
                </div>
            </div>












            <div>
                


                
                

            </div>

        </>

    );
}

export default SensorReadings;
