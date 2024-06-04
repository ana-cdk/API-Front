import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../../styles/Form.module.css'
import { URL_API } from "../../Const";


function SensorForm() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const { id } = useParams(); // Para obter o ID do sensor a ser editado
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [typeError, setTypeError] = useState('');
    

    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setNameError(value ? '' : 'Campo obrigatório');
                break;
            case 'type':
                setType(value);
                setTypeError(value ? '' : 'Campo obrigatório');
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
            fetch(`${URL_API}sensor/${id}`, {
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
                    throw new Error('Erro ao buscar sensor');
                }
                return response.json();
            })
            .then(data => {
                setName(data.nome);
                setType(data.tipo);
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

        if (!type.trim()) {
            setTypeError('Campo obrigatório');
            isValid = false;
        } else {
            setTypeError('');
        }

        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

       // if (!name || !type || !selectedDevice) {
       //     console.error('Todos os campos são obrigatórios');
       //     return;
       // }

        const data = {
            nome: name,
            tipo: type,
            idDispositivo: selectedDevice
        };

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('Token não encontrado. Redirecionando para autenticação.');
                navigate('/auth');
                return;
            }

            const response = await fetch(`${URL_API}sensor${id ? `/${id}` : ''}`, {
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
                throw new Error(id ? 'Erro ao atualizar sensor' : 'Erro ao criar sensor');
            }

            setName('');
            setSelectedDevice('');
            console.log(id ? 'Sensor atualizado com sucesso!' : 'Sensor criado com sucesso!');
            navigate(`/device`);
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.header}>
                        <h2>{id ? 'Editar Sensor' : 'Criar Sensor'}</h2>
                    </section>

                    <form id="form" className={styles.form}  onSubmit={handleSubmit}>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="name" className="formLabel">Nome do sensor</label>
                            <input type="text" id="name" name="name" maxlength="35" placeholder='Digite o nome do sensor... 45 '
                                 className={`${styles.formControl} ${nameError && styles.errorInput}`}
                                value={name} onChange={(e) => handleInputChange('name', e.target.value)}/>
                            <a className={styles.errorMessage}>{nameError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="type" className="formLabel">Tipo</label>
                            <input type="text" id="type" name="type"
                                className={`${styles.formControl} ${typeError && styles.errorInput}`} placeholder='Informe o tipo do sensor...'
                                value={type} onChange={(e) => handleInputChange('type', e.target.value)} /> 
                            <a className={styles.errorMessage}>{typeError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="device" className="formLabel">Dispositivo</label>
                            <select
                                id="device"
                                name="device"
                                className="formControl"
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
                            <button type="button" className="btn btn-danger me-1" onClick={() => navigate('/device')}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>



                
        </>
    );
}

export default SensorForm;
