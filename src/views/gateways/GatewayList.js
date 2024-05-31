import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../Const";

function GatewayList() {
    const [gateways, setGateways] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetch(`${URL_API}gateway`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    navigate('/auth'); // Redireciona para a página de login
                    throw new Error('Unauthorized');
                } else {
                    throw new Error('Unexpected error');
                }
            })
            .then(res => {
                setGateways(res);
            })
            .catch(e => console.log(e));
    }, []);

    function handleEdit(id) {
        navigate(`/gateway/${id}`);
    }

    function handleDelete(id) {
        if (window.confirm('Você tem certeza que deseja deletar este gateway?')) {
            const token = localStorage.getItem('jwtToken');
            fetch(`${URL_API}gateway/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        setGateways(prevGateways => prevGateways.filter(gateway => gateway.idGateway !== id));
                    } else {
                        alert('Erro ao deletar o gateway');
                    }
                })
                .catch(e => console.log(e));
        }
    }

    function handleAddNewGateway() {
        navigate('/gateway/new');
    }

    return (
        <>
            <h2>Gateways</h2>
            <button className="btn btn-success" onClick={handleAddNewGateway}>Adicionar novo gateway</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Endereço</th>
                        <th>Dispositivos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gateways.map(gateway => (
                        <tr key={gateway.idGateway}>
                            <td>{gateway.nome}</td>
                            <td>{gateway.descricao}</td>
                            <td>{gateway.endereco}</td>
                            <td>
                                {gateway.dispositivos?.map(dispositivo => (
                                    <div key={dispositivo.idDispositivo}>{dispositivo.nome}</div>
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleEdit(gateway.idGateway)}>Editar</button>
                                <button className="btn btn-danger ms-1" onClick={() => handleDelete(gateway.idGateway)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default GatewayList;