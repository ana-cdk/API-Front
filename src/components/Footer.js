import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Footer(){

    return(
        <footer id="footer">
        <div id="footer_content">
            <div id='footer_contacts'>
            <h1>Connect IO</h1>
            <p>Plataforma de Gerenciamento de IoT para monitoramento e controle de dispositivos conectados.</p>

            <div id='footer_social_media'>
                <FontAwesomeIcon icon={faGithub} />
                <a href="https://github.com/ana-cdk/Projeto-IOT" className='footer-link' target="_blank" rel="noreferrer" id="github">
                 Repositorio
                </a>
            </div>
            </div>

            <ul className='footer-list'>
                <li>
                    <h4>Marco A. Schneiders</h4>
                </li>
                
                <li>
                    <FontAwesomeIcon icon={faLinkedin}  />
                    <a href="https://www.linkedin.com/in/marco-schneiders-71720627a/" className='footer-link' target="_blank" rel="noreferrer">Linkedin</a>
                </li>
                <li>
                    <FontAwesomeIcon icon={faGithub}  />
                    <a href="https://github.com/Dyest" className='footer-link' target="_blank" rel="noreferrer">GitHub</a>
                </li>
                <li>
                    <h6>marcoschneiders@alunos.utfpr.edu.br</h6>
                </li>
                
            </ul>

            <ul className='footer-list'>
                <li>
                    <h4>Ana C. Diel Kotz</h4>
                </li>

                <li>
                    <FontAwesomeIcon icon={faLinkedin}/>
                    <a href="https://www.linkedin.com/in/ana-carolina-diel-kotz-663a1b279/" className='footer-link' target="_blank" rel="noreferrer">Linkedin</a>
                </li>
                <li>
                    <FontAwesomeIcon icon={faGithub}/>
                    <a href="https://github.com/ana-cdk" className='footer-link' target="_blank" rel="noreferrer">GitHub</a>
                </li>
                <li>
                    <h6>akotz@alunos.utfpr.edu.br</h6>
                </li>
            </ul>
        </div>
        
        <div id="footer_copyrigth">© 2024 Todos os direitos reservados.</div>
        </footer>
    );
}

export default Footer;