import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { URL_API } from "../../Const";
import styles from '../../styles/Form.module.css';

function ActuatorForm() {
    const [name, setName] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');

    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setNameError(value ? '' : 'Campo obrigatório');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            navigate('/auth');
            return;
        }

        // Buscar os dispositivos cadastrados
        fetch(`${URL_API}dispositivo`, {
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
            fetch(`http://localhost:8083/atuador/${id}`, {
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

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Campo obrigatório');
            isValid = false;
        } else {
            setNameError('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

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

            const response = await fetch(`http://localhost:8083/atuador${id ? `/${id}` : ''}`, {
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
            navigate(`/device/details/${selectedDevice}`);
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    const handleCancel = () => {
        if (selectedDevice) {
            navigate(`/device`);
        } else {
            navigate('/device');
        }
    }; 

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <section className={styles.header}>
                    <h2>{id ? 'Editar Atuador' : 'Criar Atuador'}</h2>
                </section>

                <form id="form" className={styles.form} onSubmit={handleSubmit}>
                    <fieldset className={styles.formGroup}>
                        <label htmlFor="name" className="formLabel">Nome do atuador</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder='Digite o nome do atuador...'
                            className={`${styles.formControl} ${nameError && styles.errorInput}`}
                            value={name} 
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <span className={styles.errorMessage}>{nameError}</span>
                    </fieldset>

                    <fieldset className={styles.formGroup}>
                        <label htmlFor="device" className="formLabel">Dispositivo</label>
                        <select
                            id="device"
                            name="device"
                            className={styles.formControl}
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
                        <button type="button" className="btn btn-danger me-1" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActuatorForm;
