import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

function ActuatorForm() {
    const [name, setName] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const { id } = useParams(); // Para obter o ID do atuador a ser editado
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            navigate('/auth');
            return;
        }

        // Buscar os dispositivos cadastrados
        fetch('http://localhost:8081/dispositivo', {
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
                throw new Error('Erro ao buscar dispositivos');
            }
            return response.json();
        })
        .then(data => setDevices(data))
        .catch(e => console.log(e));

        const deviceIdFromParams = searchParams.get('deviceId');
        if (deviceIdFromParams) {
            setSelectedDevice(deviceIdFromParams);
        }

        if (id) {
            fetch(`http://localhost:8081/atuador/${id}`, {
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
                    throw new Error('Erro ao buscar atuador');
                }
                return response.json();
            })
            .then(data => {
                setName(data.nome);
                setSelectedDevice(data.dispositivoId);
            })
            .catch(e => console.log(e));
        }
    }, [id, navigate, searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();

      //  if (!name || !selectedDevice) {
       //     console.error('Todos os campos são obrigatórios');
      //      return;
       // }

        const data = {
            nome: name,
            idDispositivo: selectedDevice
        };

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('Token não encontrado. Redirecionando para autenticação.');
                navigate('/auth');
                return;
            }

            const response = await fetch(`http://localhost:8081/atuador${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/auth');
                }
                const errorText = await response.text();
                console.error('Erro do servidor:', errorText);
                throw new Error(id ? 'Erro ao atualizar atuador' : 'Erro ao criar atuador');
            }

            setName('');
            setSelectedDevice('');
            console.log(id ? 'Atuador atualizado com sucesso!' : 'Atuador criado com sucesso!');
            navigate('/device');
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
            <h2>{id ? 'Editar Atuador' : 'Criar Atuador'}</h2>
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" id="name" name="name"
                        className="form-control"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="device" className="form-label">Dispositivo</label>
                    <select
                        id="device"
                        name="device"
                        className="form-control"
                        value={selectedDevice}
                        onChange={(e) => setSelectedDevice(e.target.value)}
                    >
                        <option value="">Selecione um Dispositivo</option>
                        {devices.map(device => (
                            <option key={device.idDispositivo} value={device.idDispositivo}>{device.nome}</option>
                        ))}
                    </select>

                </fieldset>
                <div className="pagination justify-content-center mt-4">
                    <button type="submit" className="btn btn-success me-1">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/device')}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default ActuatorForm;
