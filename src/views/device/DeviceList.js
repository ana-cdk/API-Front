import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../Const";
import styles from '../../styles/Lists.module.css'

function DeviceList() {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário autenticado do armazenamento local

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetch(`${URL_API}dispositivo/user/${userId}`, {
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
    }, [navigate, userId]);

    function handleDetails(id) {
        navigate(`/device/details/${id}`);
    }

    function handleEdit(id) {
        navigate(`/device/${id}`);
    }

    function handleDelete(id) {
        if (window.confirm('Você tem certeza que deseja deletar este dispositivo?')) {
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

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            <div className={`row ${styles.marginBottom}`}>
                <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <div class="card">
                            <div class="card-body">
                                <div className={styles.headerRow}>
                                    <h3>Dispositivos</h3>
                                    <i type="button" className="fa-solid fa-plus" onClick={handleAddNewDispositivo}></i>
                                </div>

                                <table class="table table-striped">
                                    <thead class="table-dark">
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
                                                <td className={styles.btnGap}>
                                                    {/* COMENTÁRIO JSX 
                                                    <button className="btn btn-info" onClick={() => handleDetails(device.idDispositivo)}>Detalhes</button>
                                                    <button className="btn btn-secondary ms-1" onClick={() => handleEdit(device.idDispositivo)}>Editar</button>
                                                    <button className="btn btn-danger ms-1" onClick={() => handleDelete(device.idDispositivo)}>Deletar</button>
                                                    */}
                                                    <i type="button" class="fa-solid fa-circle-info" onClick={() => handleDetails(device.idDispositivo)}></i>
                                                    <i type="button" className={`fa-solid fa-pen-to-square ${styles.editIcon}`} onClick={() => handleEdit(device.idDispositivo)}></i>
                                                    <i type="button" className={`fa fa-trash ${styles.deleteIcon}`} onClick={() => handleDelete(device.idDispositivo)}></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
            </div>
                
        </>
    );
}

export default DeviceList;
