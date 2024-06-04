import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../Const";
import styles from '../../styles/Lists.module.css'

function GatewayList() {
    const [gateways, setGateways] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');
        
        fetch(`${URL_API}gateway/user/${userId}`, {
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
    }, [navigate]);

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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

            <div className={`row ${styles.marginBottom}`}>
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-body">
                            <div className={styles.headerRow}>
                                <h3>Gateways</h3>
                                <i type="button" className="fa-solid fa-plus" onClick={handleAddNewGateway}></i>
                            </div>

                            <table className="table table-striped">
                                <thead className="table-dark">
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
                                            <td className={styles.btnGap}>
                                                <i type="button" className={`fa-solid fa-pen-to-square ${styles.editIcon}`} onClick={() => handleEdit(gateway.idGateway)}></i>
                                                <i type="button" className={`fa fa-trash ${styles.deleteIcon}`} onClick={() => handleDelete(gateway.idGateway)}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GatewayList;
