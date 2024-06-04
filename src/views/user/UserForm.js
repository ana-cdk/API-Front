import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { URL_API } from "../../Const";

function UserForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            nome: firstName,
            email: email,
            senha: password
        };

        try {
            const response = await fetch(`${URL_API}pessoa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            // Se o usuário foi criado com sucesso, limpa os campos do formulário
            setFirstName('');
            setEmail('');
            setPassword('');

            sessionStorage.setItem('showAlert', 'true');

            // Redireciona para a página "Home"
            navigate('/');
        } catch (error) {
            console.error('Erro:', error.message);
            setShowErrorAlert(true);

            // Oculta o alerta de erro após 5 segundos
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 5000);
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!firstName.trim()) {
            setFirstNameError('Campo obrigatório');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!email.trim()) {
            setEmailError('Campo obrigatório');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Campo obrigatório');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            {showErrorAlert && (
                        <div className="alert alert-danger alert-container" role="alert">
                            Erro ao criar usuário. Email ja cadastrado.
                        </div>
                    )}

            <div id="container-form-cadastro">
                <form id="login_form" onSubmit={handleSubmit}>
                    <div id="form_header">
                        <h1>Cadastrar</h1>
                    </div>

                    <div id="social-media">
                        <a><FontAwesomeIcon icon={faFacebook} /></a>
                        <a><FontAwesomeIcon icon={faGoogle} /></a>
                        <a><FontAwesomeIcon icon={faGithub} /></a>
                    </div>

                    <div id="inputs">
                        <fieldset className="input-box">
                            <label htmlFor="first_name" className="form-label">Nome
                                <div className='input-field'>
                                    <FontAwesomeIcon icon={faUser} className="fa-icon" />
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className={`custom-input form-control ${firstNameError ? 'error' : ''}`}
                                        placeholder="Nome completo"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    
                                </div>
                                {firstNameError && <p className="error-message">{firstNameError}</p>}
                            </label>
                        </fieldset>

                        <fieldset className="input-box">
                            <label htmlFor="email" className="form-label">E-mail
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                                    <input type="text" id="email" name="email"
                                        className={`custom-input form-control ${emailError ? 'error' : ''}`}
                                        placeholder="E-mail"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                {emailError && <p className="error-message">{emailError}</p>}
                            </label>
                        </fieldset>

                        <fieldset className="form-group">
                            <label htmlFor="password" className="form-label">Senha
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faKey} className="fa-icon" />
                                    <input type="password" id="password" name="password"
                                        className={`custom-input form-control ${passwordError ? 'error' : ''}`}
                                        placeholder='Crie sua senha'
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {passwordError && <p className="error-message">{passwordError}</p>}
                            </label>
                        </fieldset>

                        <div className="pagination justify-content-center mt-4">
                            <button type="submit" className="custom-button btn-cadastro">Salvar</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}

export default UserForm;
