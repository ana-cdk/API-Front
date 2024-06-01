import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale);

const ReadingsGraphic = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        navigate('/auth');
        return;
    }

    const fetchData = async () => {
      try {
        const sensorId = 1; // Altere para o ID do sensor desejado
        const response = await fetch(`http://localhost:8081/leitura?idSensor=${sensorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid JSON response');
        }
        const labels = data.map(leitura => leitura.data);
        const valores = data.map(leitura => leitura.valor);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Leitura do Sensor',
              data: valores,
              borderColor: 'rgba(0, 0, 255, 1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}> {/* Define a largura e centraliza o conteúdo */}
      <h1>Dashboard de Leituras</h1>
      {error ? <p>Error: {error}</p> : <Line data={chartData} options={{
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }} />}
    </div>
  );
};

export default ReadingsGraphic;
