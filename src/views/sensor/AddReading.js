import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/Form.module.css'
import { URL_API } from "../../Const";

function AddReading() {
    const [valor, setValor] = useState('');
    const { idSensor } = useParams();
    const navigate = useNavigate();

    const [valorError, setValorError] = useState('');


    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'valor':
                setValor(value);
                setValorError(value ? '' : 'Campo obrigatório');
                break;
            default:
                break;
        }
    };


    const validateForm = () => {
        let isValid = true;

        if (!valor.trim()) {
            setValorError('Campo obrigatório');
            isValid = false;
        } else {
            setValorError('');
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/auth');
            return;
        }

        const reading = {
            valor: valor,
            idSensor: idSensor // Aninhando o sensor
        };

        console.log('Request Body:', JSON.stringify(reading));

        fetch(`${URL_API}leitura`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reading)
        })
        .then(response => {
            if (response.ok) {
                navigate(`/sensor/${idSensor}/readings`); // Redireciona para a página de leituras do sensor
            } else {
                throw new Error('Erro ao adicionar leitura');
            }
        })
        .catch(e => console.error(e));
    };

    return (

            <>
                 <div className={styles.body}>
                    <div className={styles.container}>
                        <section className={styles.header}>
                            <h2>Adicionar Nova Leitura</h2>
                        </section>

                        <form id="form" className={styles.form}  onSubmit={handleSubmit}>

                            <fieldset className={styles.formGroup}>
                                <label htmlFor="valor" className="formLabel">Nome do sensor</label>
                                <input type="text" id="valor" name="valor" placeholder='Digite o valor da nova leitura...'
                                    className={`${styles.formControl} ${valorError && styles.errorInput}`}
                                    value={valor} onChange={(e) => handleInputChange('valor', e.target.value)}/>
                                <span className={styles.errorMessage}>{valorError}</span>
                            </fieldset>


                            <fieldset className={styles.formGroup}>
                                <label htmlFor="device" className="formLabel">Id do Sensor</label>
                                <input
                                    type="number"
                                    id="idSensor"
                                    value={idSensor}
                                    className="form-control"
                                    disabled
                                />
                            </fieldset>

                            <div className="pagination justify-content-center mt-4">
                                <button type="submit" className="btn btn-success me-1">Salvar</button>
                                <button type="button" className="btn btn-danger me-1" onClick={() => navigate(-1)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>





    );
}

export default AddReading;


