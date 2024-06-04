import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/Form.module.css'
import { URL_API } from "../../Const";

function DeviceForm() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [gateways, setGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState('');
    const { id } = useParams(); // Para obter o ID do Dispositivo a ser editado
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [enderecoError, setEnderecoError] = useState('');
    const [locError, setLocError] = useState('');
    const [descError, setDescError] = useState('');

    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setNameError(value ? '' : 'Campo obrigatório');
                break;
            case 'endereco':
                setEndereco(value);
                setEnderecoError(value ? '' : 'Campo obrigatório');
                break;
            case 'loc':
                setLoc(value);
                setLocError(value ? '' : 'Campo obrigatório');
                break;
            case 'desc':
                setDesc(value);
                setDescError(value ? '' : 'Campo obrigatório');
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

        // Buscar os gateways cadastrados
        fetch(`${URL_API}gateway`, {
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
                    throw new Error('Erro ao buscar gateways');
                }
                return response.json();
            })
            .then(data => setGateways(data))
            .catch(e => console.log(e));


        if (id) {
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
                    setName(data.nome);
                    setDesc(data.descricao);
                    setLoc(data.localizacao);
                    setEndereco(data.endereco);
                    setSelectedGateway(data.gatewayId); // Assumindo que o dispositivo possui uma propriedade gatewayId
                })
                .catch(e => console.log(e));
        }
    }, [id, navigate]);

    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Campo obrigatório');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!endereco.trim()) {
            setEnderecoError('Campo obrigatório');
            isValid = false;
        } else {
            setEnderecoError('');
        }

        if (!loc.trim()) {
            setLocError('Campo obrigatório');
            isValid = false;
        } else {
            setLocError('');
        }

        if (!desc.trim()) {
            setDescError('Campo obrigatório');
            isValid = false;
        } else {
            setDescError('');
        }

        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }
    
        if (!name || !desc || !loc || !endereco || !selectedGateway) {
            console.error('Todos os campos são obrigatórios');
            return;
        }
    
        const data = {
            nome: name,
            descricao: desc,
            localizacao: loc,
            endereco: endereco,
            idGateway: selectedGateway
        };
    
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('Token não encontrado. Redirecionando para autenticação.');
                navigate('/auth');
                return;
            }
    
            const response = await fetch(`${URL_API}dispositivo${id ? `/${id}` : ''}`, {
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
                throw new Error(id ? 'Erro ao atualizar dispositivo' : 'Erro ao criar dispositivo');
            }
    
            setName('');
            setDesc('');
            setEndereco('');
            setLoc('');
            setSelectedGateway('');
            console.log(id ? 'Dispositivo atualizado com sucesso!' : 'Dispositivo criado com sucesso!');
            navigate('/device');
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>

            <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.header}>
                        <h2>{id ? 'Editar Dispositivo' : 'Criar Dispositivo'}</h2>
                    </section>

                    <form id="form" className={styles.form}  onSubmit={handleSubmit}>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="name" className="formLabel">Nome do dispositivo</label>
                            <input type="text" id="name" name="name" placeholder='Digite o nome do dispositivo...'
                                 className={`${styles.formControl} ${nameError && styles.errorInput}`}
                                value={name} onChange={(e) => handleInputChange('name', e.target.value)}/>
                            <a className={styles.errorMessage}>{nameError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="endereco" className="formLabel">Endereço</label>
                            <input type="text" id="endereco" name="endereco"
                                className={`${styles.formControl} ${enderecoError && styles.errorInput}`} placeholder='Insira um endereço...'
                                value={endereco} onChange={(e) => handleInputChange('endereco', e.target.value)} /> 
                            <a className={styles.errorMessage}>{enderecoError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="localizacao" className="formLabel">Localização</label>
                            <input type="text" id="localizacao" name="localizacao"
                                className={`${styles.formControl} ${locError && styles.errorInput}`} placeholder='Insira uma localização...'
                                value={loc} onChange={(e) => handleInputChange('loc', e.target.value)} /> 
                            <a className={styles.errorMessage}>{locError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="desc" className="formLabel">Descrição</label>
                            <textarea type="text" id="desc" name="desc"
                                className={`${styles.formControl} ${descError && styles.errorInput}`} placeholder='Insira uma pequena descrição...'
                                value={desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
                            <a className={styles.errorMessage}>{descError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="gateway" className="formLabel">Gateway</label>
                            <select
                                id="gateway"
                                name="gateway"
                                className="formControl"
                                value={selectedGateway}
                                onChange={(e) => setSelectedGateway(e.target.value)}
                            >
                                <option value="">Selecione um Gateway</option>
                                {gateways.map(gateway => (
                                    <option key={gateway.idGateway} value={gateway.idGateway}>{gateway.nome}</option>
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

export default DeviceForm;
