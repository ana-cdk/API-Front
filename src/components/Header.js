import React from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Header(){

    const handleCadastroClick = () => {
        window.location.href = '/user/new';
    };
    const handleLoginClick = () => {
        window.location.href = '/auth';
    };

    const navigate = useNavigate();

    function handleGateway() {
        navigate('/gateway');
    }

    function handleDispositivo(){
        navigate('/device');
    }

    return(
        <>
            <header>
                <nav className="navbar">
                    <a className="logo" href="/">Connect IO</a>
                    <ul className="navLink">
                        <li className="nav-item">
                            <a className="nav-link" onClick={handleGateway}>Gateway</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={handleDispositivo}>Dispositivo</a>
                        </li>
                    </ul>
                    <div className="navbar-buttons">
                        <button type="button" className="btn btn-secondary me-1 btnHeader" onClick={handleLoginClick}>
                            <FontAwesomeIcon icon={faUser} className="icon-login" />Login
                        </button>
                        <button type="button" className="btn btn-secondary me-1 btnHeader" onClick={handleCadastroClick}>
                            Cadastrar
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header