import React, { useState, useEffect } from 'react';

function GatewayForm() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log('UserId retrieved from localStorage:', storedUserId);  // Adicione este log
        setUserId(storedUserId);
    }, []);

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
            const response = await fetch('http://localhost:8081/gateway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar gateway');
            }

            setName('');
            setDesc('');
            setEndereco('');
            console.log('Gateway criado com sucesso!');
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <>
            <h2>Gateway</h2>
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
                    <button type="button" className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default GatewayForm;