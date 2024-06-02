import React from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header(){

    const handleCadastroClick = () => {
        window.location.href = '/user/new';
    };
    const handleLoginClick = () => {
        window.location.href = '/auth';
    };


    return(
        <>
            <header>
                <nav className="navbar">
                    <a className="logo" href="/">Connect IO</a>
                    <div className="navbar-buttons">
                        <button type="button" className="btn btn-secondary me-1" onClick={handleLoginClick}> <FontAwesomeIcon icon={faUser} className="icon-login" />Login</button>
                        <button type="button" className="btn btn-secondary me-1" onClick={handleCadastroClick}>Cadastrar</button>

                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header