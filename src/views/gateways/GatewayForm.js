import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/GatewayForm.module.css'


function GatewayForm() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [userId, setUserId] = useState(null);
    const { id } = useParams(); // Para obter o ID do gateway a ser editado
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [enderecoError, setEnderecoError] = useState('');
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
            case 'desc':
                setDesc(value);
                setDescError(value ? '' : 'Campo obrigatório');
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const token = localStorage.getItem('jwtToken');
        
        if (!storedUserId || !token) {
            navigate('/auth');
            return;
        }

        
        setUserId(storedUserId);

        if (id) {
            fetch(`http://localhost:8081/gateway/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setName(data.nome);
                    setDesc(data.descricao);
                    setEndereco(data.endereco);
                })
                .catch(e => console.log(e));
        }
    }, [id]);

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

        const data = {
            nome: name,
            descricao: desc,
            endereco: endereco,
            idPessoa: userId
        };

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`http://localhost:8081/gateway${id ? `/${id}` : ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(id ? 'Erro ao atualizar gateway' : 'Erro ao criar gateway');
            }

            setName('');
            setDesc('');
            setEndereco('');
            console.log(id ? 'Gateway atualizado com sucesso!' : 'Gateway criado com sucesso!');
            navigate('/gateway'); // Redirecionar após salvar
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
        
        <div className={styles.body}>
                <div className={styles.container}>
                    <section className={styles.header}>
                        <h2>{id ? 'Editar Gateway' : 'Criar Gateway'}</h2>
                    </section>

                    <form id="form" className={styles.form}  onSubmit={handleSubmit}>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="name" className="formLabel">Nome do gateway</label>
                            <input type="text" id="name" name="name" placeholder='Digite o nome do gateway...'
                                 className={`${styles.formControl} ${nameError && styles.errorInput}`}
                                value={name} onChange={(e) => handleInputChange('name', e.target.value)}/>
                            <a className={styles.errorMessage}>{nameError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="endereco" className="formLabel">Endereço</label>
                            <input type="text" id="endereco" name="endereco"
                                className={`${styles.formControl} ${enderecoError && styles.errorInput}`} placeholder='Insira um endereço'
                                value={endereco} onChange={(e) => handleInputChange('endereco', e.target.value)} /> 
                            <a className={styles.errorMessage}>{enderecoError}</a>
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="desc" className="formLabel">Descrição</label>
                            <textarea type="text" id="desc" name="desc"
                                className={`${styles.formControl} ${descError && styles.errorInput}`} placeholder='Insira uma pequena descrição...'
                                value={desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
                            <a className={styles.errorMessage}>{descError}</a>
                        </fieldset>

                        

                        <div className="pagination justify-content-center mt-4">
                            <button type="submit" className="btn btn-success me-1">Salvar</button>
                            <button type="button" className="btn btn-danger me-1" onClick={() => navigate('/gateway')}>Cancelar</button>
                        </div>
                    </form>
                
                </div>
            </div>
        </>
    );
}

export default GatewayForm;