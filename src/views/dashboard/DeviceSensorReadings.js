import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReadingsGraphic from './ReadingsGraphic';

const DeviceSensorReadings = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:8081/dispositivo', {
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
  }, [navigate]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>Dashboard de Dispositivos e Sensores</h1>
      {devices.map(device => (
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
      ))}
    </div>
  );
};

export default DeviceSensorReadings;
