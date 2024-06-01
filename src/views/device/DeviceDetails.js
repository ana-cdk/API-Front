import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

        fetch(`http://localhost:8081/dispositivo/${id}`, {
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

        fetch(`http://localhost:8081/dispositivo/${id}`, {
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

        fetch(`http://localhost:8081/sensor/${idSensor}`, {
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

        fetch(`http://localhost:8081/atuador/${idAtuador}`, {
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
        <div>
            <h2>Detalhes do Dispositivo: {device.nome}</h2>
            <p>Descrição: {device.descricao}</p>
            <p>Localização: {device.localizacao}</p>
            <p>Endereço: {device.endereco}</p>
            <p>Gateway: {device.gatewayId}</p>
            
            <h3>Sensores</h3>
            {sensors.length > 0 ? (
                <ul>
                    {sensors.map(sensor => (
                        <li key={sensor.idSensor}>
                            {sensor.nome}
                            <button type="button" className="btn btn-success" onClick={() => navigate(`/sensor/${sensor.idSensor}?deviceId=${id}`)}>Editar</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteSensor(sensor.idSensor)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum sensor encontrado.</p>
            )}
            <button type="button" className="btn btn-primary" onClick={() => navigate(`/sensor/new?deviceId=${id}`)}>Add Sensor</button>

            <h3>Atuadores</h3>
            {actuators.length > 0 ? (
                <ul>
                    {actuators.map(actuator => (
                        <li key={actuator.idAtuador}>
                            {actuator.nome}
                            <button type="button" className="btn btn-success" onClick={() => navigate(`/actuator/${actuator.idAtuador}?deviceId=${id}`)}>Editar</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteActuator(actuator.idAtuador)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            ) : (
               <p>Nenhum atuador encontrado.</p>
            )}
            <button type="button" className="btn btn-primary" onClick={() => navigate(`/actuator/new?deviceId=${id}`)}>Add Atuador</button>

            <button type="button" className="btn btn-success" onClick={() => navigate(`/device/${id}`)}>Editar</button>
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteDevice(id)}>Excluir</button>
        </div>
    );
}

export default DeviceDetails;
