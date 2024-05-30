function Header(){

    const handleCadastroClick = () => {
        window.location.href = '/user/new';
    };
    const handleLoginClick = () => {
        window.location.href = '/auth';
    };


    return(
        <>
            Minha App
            <button type="button" className="btn btn-secondary me-1" onClick={handleLoginClick}>Login</button>
            <button type="button" className="btn btn-secondary me-1" onClick={handleCadastroClick}>Cadastrar</button>
        </>
    )
}

export default Header