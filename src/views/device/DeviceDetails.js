import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/Details.module.css'
import { URL_API } from "../../Const";

function DeviceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [device, setDevice] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [actuators, setActuators] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetch(`${URL_API}dispositivo/${id}`, {
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
                throw new Error('Erro ao buscar dispositivo');
            }
            return response.json();
        })
        .then(data => {
            setDevice(data);
            setSensors(data.sensores || []);
            setActuators(data.atuadores || []);
        })
        .catch(e => console.log(e));
    }, [id, navigate]);

    const handleDeleteDevice = (id) => {
        if (!window.confirm('Tem certeza de que deseja excluir este dispositivo?')) {
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetch(`${URL_API}dispositivo/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/auth');
                }
                throw new Error('Erro ao excluir dispositivo');
            }
            navigate('/device');
        })
        .catch(e => console.log(e));
    };

    const handleDeleteSensor = (idSensor) => {
        if (!window.confirm('Tem certeza de que deseja excluir este sensor?')) {
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetch(`${URL_API}sensor/${idSensor}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/auth');
                }
                throw new Error('Erro ao excluir sensor');
            }
            setSensors(sensors.filter(sensor => sensor.idSensor !== idSensor));
        })
        .catch(e => console.log(e));
    };

    const handleDeleteActuator = (idAtuador) => {
        if (!window.confirm('Tem certeza de que deseja excluir este atuador?')) {
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetch(`${URL_API}atuador/${idAtuador}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/auth');
                }
                throw new Error('Erro ao excluir atuador');
            }
            setActuators(actuators.filter(actuator => actuator.idAtuador !== idAtuador));
        })
        .catch(e => console.log(e));
    };

    if (!device) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            
            <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.header}>
                        <h2>Detalhes do Dispositivo</h2>
                    </section>

                    <div className= {styles.card}>
                        <h5>Nome: <p>{device.nome}</p> </h5>
                        <h5>Descrição: <p>{device.descricao}</p> </h5>
                        <h5>Localização: <p>{device.localizacao}</p> </h5>
                        <h5>Endereço: <p>{device.endereco}</p> </h5>
                    </div>

                    <div className={`${styles.pagination} pagination justify-content-center mt-4`}>
                        <button type="button" className="btn btn-info ms-1 mb-3" onClick={() => navigate(`/device/${id}`)}>
                            <i type="button" className="fa-solid fa-pen-to-square"></i> Editar
                        </button>

                        <button type="button" className="btn btn-danger ms-1 mb-3" onClick={() => handleDeleteDevice(id)}>
                            <i type="button" className="fa fa-trash delete-icon"></i> Excluir
                        </button>
                    </div>
                </div>
            </div>
            
            
            <div className={`row ${styles.marginBottom}`}>
                <div class="col-sm-1"></div>

                <div class="col-sm-5">
                    <div class="card">
                        <div class="card-body">
                            <div className={styles.headerRow}>
                                <h3>Atuadores</h3>
                                <i type="button" className="fa-solid fa-plus" onClick={() => navigate(`/actuator/new?deviceId=${id}`)}></i>
                            </div>

                            <div className={styles.listaItens}>
                                {actuators.length > 0 ? (
                                    <ul>
                                        {actuators.map(actuator => (
                                            <li key={actuator.idAtuador}>
                                                <div className={styles.sensorInfo}>
                                                    <div >
                                                        <h5>Nome: <p>{actuator.nome}</p></h5>
                                                    </div>
                                                    
                                                    <div className={styles.btns}>
                                                        <button type="button" className="btn btn-info ms-1 mb-3" onClick={() => navigate(`/actuator/${actuator.idAtuador}?deviceId=${id}`)}>
                                                            <i type="button" className="fa-solid fa-pen-to-square" onClick={() => navigate(`/device/${id}`)}></i> Editar
                                                        </button>

                                                        <button type="button" className="btn btn-danger ms-1 mb-3" onClick={() => handleDeleteActuator(actuator.idAtuador)}>
                                                            <i type="button" className="fa fa-trash delete-icon" onClick={() => handleDeleteDevice(id)}></i> Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                <p>Nenhum atuador encontrado.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                
                <div class="col-sm-5">
                    <div class="card">
                    <div class="card-body">
                        <div className={styles.headerRow}>
                            <h3>Sensores</h3>
                            <i type="button" className="fa-solid fa-plus" onClick={() => navigate(`/sensor/new?deviceId=${id}`)}></i>
                        </div>
                        
                        <div className={styles.listaItens}>
                            {sensors.length > 0 ? (
                                <ul>
                                    {sensors.map(sensor => (
                                        <li key={sensor.idSensor}>
                                            <div className={styles.sensorInfo}>
                                                <div>
                                                    <h5>Nome: <p>{sensor.nome}</p></h5>
                                                </div>
                                                <div className={styles.btns}>
                                                    <button type="button" className="btn btn-secondary ms-1 mb-3" onClick={() => navigate(`/sensor/${sensor.idSensor}/readings`)}>Leituras</button>
                                                    <button type="button" className="btn btn-info ms-1 mb-3" onClick={() => navigate(`/sensor/${sensor.idSensor}?deviceId=${id}`)}>
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button type="button" className="btn btn-danger ms-1 mb-3" onClick={() => handleDeleteSensor(sensor.idSensor)}>
                                                        <i className="fa fa-trash delete-icon"></i> Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    
                                    ))}
                                </ul>
                            ) : (
                                <p>Nenhum sensor encontrado.</p>
                            )}   
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                                    
            
            
        </>

    );
}

export default DeviceDetails;
