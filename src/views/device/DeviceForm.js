import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeviceForm() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [gateways, setGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState('');
    const { id } = useParams(); // Para obter o ID do Dispositivo a ser editado
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            navigate('/auth');
            return;
        }

        // Buscar os gateways cadastrados
        fetch('http://localhost:8081/gateway', {
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
            fetch(`http://localhost:8081/dispositivo/${id}`, {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
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
    
            const response = await fetch(`http://localhost:8081/dispositivo${id ? `/${id}` : ''}`, {
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
            <h2>{id ? 'Editar Dispositivo' : 'Criar Dispositivo'}</h2>
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
                <fieldset className="form-group">
                    <label htmlFor="localizacao" className="form-label">Localização</label>
                    <input type="text" id="localizacao" name="localizacao"
                        className="form-control"
                        value={loc} onChange={(e) => setLoc(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="gateway" className="form-label">Gateway</label>
                    <select
                        id="gateway"
                        name="gateway"
                        className="form-control"
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
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/dispositivo')}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

export default DeviceForm;
