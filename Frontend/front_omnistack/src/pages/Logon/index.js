import React, {useState} from 'react';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

    const [ID,setId] = useState('');   
    const history = useHistory(); 

    async function Login(e){
        e.preventDefault();

        try{
            const response = await api.post('sessao', {ID});
            localStorage.setItem('ongId', ID);
            localStorage.setItem('ongNome', response.data.NOME);
            history.push('/perfil');
        }catch(err){
            alert('Erro no Login. Tente novamente');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroe" />
                <form onSubmit={Login} >
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID"
                    value={ID}
                    onChange={e => setId(e.target.value)}
                     />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/cadastro">
                        <FiLogIn  size={16} color="#E02041" />
                         Não tenho cadastro.
                         </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}