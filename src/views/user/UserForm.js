import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            nome: firstName,
            email: email,
            senha: password
        };
        
        try {
            const response = await fetch('http://localhost:8081/pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            setFirstName('');
            setEmail('');
            setPassword('');
            console.log('Usuário criado com sucesso!');
            navigate('/auth')
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
            <h2>Usuário</h2>

            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="first_name" className="form-label">Nome</label>
                    <input type="text" id="first_name" name="first_name"
                           className="form-control" placeholder="Ana"
                           value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="text" id="email" name="email"
                           className="form-control" placeholder="ana@hotmail.com"
                           value={email} onChange={(e) => setEmail(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" id="password" name="password"
                           className="form-control"
                           value={password} onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <div className="pagination justify-content-center mt-4">
                    <button type="submit" className="btn btn-success me-1">Salvar</button>
                    <button type="button" className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </>
    )
}

export default UserForm;