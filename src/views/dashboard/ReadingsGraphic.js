import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { URL_API } from "../../Const";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale);

const ReadingsGraphic = ({ sensorId }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [sensorName, setSensorName] = useState('');
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
        const response = await fetch(`${URL_API}sensor/${sensorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Nenhum gráfico a ser mostrado');
        }
        const data = await response.json();
        if (!data || !data.leituras) {
          throw new Error('Invalid JSON response');
        }

        const labels = data.leituras.map(leitura => leitura.data);
        const valores = data.leituras.map(leitura => leitura.valor);

        setSensorName(data.nome); // Define o nome do sensor

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Leituras ${data.nome}`, // Usa o nome do sensor no label do gráfico
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
  }, [sensorId, navigate]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Leituras {sensorName}</h2> {/* Usa o nome do sensor no título */}
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
