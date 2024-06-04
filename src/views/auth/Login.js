import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { URL_API } from "../../Const";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            username: email,
            password: password
        };

        try {
            const response = await fetch(`${URL_API}auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao autenticar');
            }

            const result = await response.json();
            console.log('Result from server:', result);  // Adicione este log
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('userId', result.userId);
            

            setEmail('');
            setPassword('');
            console.log('Autenticado com sucesso!');
            navigate('/'); // Redireciona para a página inicial ou outra rota
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
            <main id="container-form-login">
                <form id="login_form" onSubmit={handleLogin}>

                    <div id="form_header">
                        <h1>Login</h1>
                    </div>

                    <div id="social-media">
                        <a><FontAwesomeIcon icon={faFacebook}/></a>
                        <a><FontAwesomeIcon icon={faGoogle}/></a>
                        <a><FontAwesomeIcon icon={faGithub}/></a>
                    </div>
               
                    <div id="inputs">

                        <fieldset className="input-box">
                            <label className="form-label">E-mail
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="fa-icon"/>
                                    <input type="text" name="email" 
                                    className="form-control" placeholder="E-mail"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </label>
                        </fieldset>

                        <fieldset className="input-box">
                            <label className="form-label">Senha
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faKey} className="fa-icon"/> 
                                    <input type="password" name="password" 
                                    className="form-control"  placeholder="Insira a senha"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </label>
                        </fieldset>

                        
                    </div>

                    <div className="pagination justify-content-center mt-4">
                        <button type="submit" className="custom-button btn-cadastro">Login</button>
                    </div>

                </form>   
            </main>
            



            
                    

                    

                    

                        

                        

                      

                        

                    
                




        </>
    );
}

export default Login;