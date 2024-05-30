import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            const response = await fetch('http://localhost:8081/auth', {
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
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <fieldset className="form-group">
                    <label className="form-label">E-mail</label>
                    <input type="text" name="email" 
                        className="form-control" placeholder="ana@hotmail.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label className="form-label">Senha</label>
                    <input type="password" name="password" 
                        className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <div className="pagination justify-content-center mt-4">
                    <button type="submit" className="btn btn-success me-1">Entrar</button>
                    <button type="button" className="btn btn-danger">Voltar</button>
                </div>
            </form>
        </>
    );
}

export default Login;