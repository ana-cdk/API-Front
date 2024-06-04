import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReadingsGraphic from './ReadingsGraphic';
import { URL_API } from "../../Const";

const DeviceSensorReadings = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Obtém o ID do usuário autenticado do armazenamento local

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchDevices = async () => {
      try {
        const response = await fetch(`${URL_API}dispositivo/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar dispositivos');
        }
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchDevices();
  }, [navigate, userId]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>Dashboard de Dispositivos e Sensores</h1>
      {devices.length === 0 ? (
        <p>Nenhum dispositivo encontrado para os gateways cadastrados pelo usuário.</p>
      ) : (
        devices.map(device => (
          <div key={device.idDispositivo}>
            <h2>Dispositivo: {device.nome}</h2>
            {device.sensores && device.sensores.length > 0 ? (
              device.sensores.map(sensor => (
                <ReadingsGraphic key={sensor.idSensor} sensorId={sensor.idSensor} />
              ))
            ) : (
              <p>Nenhum sensor encontrado para este dispositivo.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DeviceSensorReadings;
