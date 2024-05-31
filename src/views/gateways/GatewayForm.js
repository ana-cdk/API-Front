import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GatewayForm() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [userId, setUserId] = useState(null);
    const { id } = useParams(); // Para obter o ID do gateway a ser editado
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            navigate('/'); // Redirecionar após salvar
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
            <h2>{id ? 'Editar Gateway' : 'Criar Gateway'}</h2>
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" id="name" name="name"
                        className="form-control"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="desc" className="form-label">Descrição</label>
                    <input type="text" id="desc" name="desc"
                        className="form-control"
                        value={desc} onChange={(e) => setDesc(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="endereco" className="form-label">Endereço</label>
                    <input type="text" id="endereco" name="endereco"
                        className="form-control"
                        value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </fieldset>
                <div className="pagination justify-content-center mt-4">
                    <button type="submit" className="btn btn-success me-1">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/gateway')}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default GatewayForm;