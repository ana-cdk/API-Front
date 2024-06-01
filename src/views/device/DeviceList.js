import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../Const";

function DeviceList() {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetch(`${URL_API}dispositivo`, {
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
                setDevices(res);
            })
            .catch(e => console.log(e));
    }, []);

    function handleDetails(id) {
        navigate(`/device/details/${id}`);
    }

    function handleEdit(id) {
        navigate(`/device/${id}`);
    }

    function handleDelete(id) {
        if (window.confirm('Você tem certeza que deseja deletar este gateway?')) {
            const token = localStorage.getItem('jwtToken');
            fetch(`${URL_API}dispositivo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        setDevices(prevDevices => prevDevices.filter(device => device.idDispositivo !== id));
                    } else {
                        alert('Erro ao deletar o dispositivo');
                    }
                })
                .catch(e => console.log(e));
        }
    }

    function handleAddNewDispositivo() {
        navigate('/device/new');
    }

    return (
        <>
            <h2>Dispositivos</h2>
            <button className="btn btn-success" onClick={handleAddNewDispositivo}>Adicionar novo dispositivo</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Localização</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={device.idDispositivo}>
                            <td>{device.nome}</td>
                            <td>{device.descricao}</td>
                            <td>{device.localizacao}</td>
                            <td>{device.endereco}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => handleDetails(device.idDispositivo)}>Detalhes</button>
                                <button className="btn btn-secondary ms-1" onClick={() => handleEdit(device.idDispositivo)}>Editar</button>
                                <button className="btn btn-danger ms-1" onClick={() => handleDelete(device.idDispositivo)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default DeviceList;