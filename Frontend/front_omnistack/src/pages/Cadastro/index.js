import React, {useState} from 'react';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Cadastro() {

    const history = useHistory();

    const [NOME, setName] = useState('');
    const [EMAIL, setEmail] = useState('');
    const [WHATSAPP, setWhats] = useState('');
    const [CIDADE, setCidade] = useState('');
    const [UF, setUf] = useState('');

   async function CriarCadatro(e){
        e.preventDefault();

        const data = {
            NOME,
            EMAIL,
            WHATSAPP,
            CIDADE,
            UF
        };

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}` );
            history.push('/');
        }catch(err){
            alert('Erro no Cadastro. Tente novamente');
        }
    }

    return (
        <div className="cadastros-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadatro</h1>
                    <p>Faça seu cadatro, entre na plataforma e ajude pessoas e encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para tela de Logon.
                         </Link>
                </section>
                <form onSubmit={CriarCadatro}>
                    <input placeholder="Nome da ONG"
                    value={NOME}
                    onChange={e => setName(e.target.value)} 
                    />

                    <input type="email" 
                    placeholder="E-mail"
                    value={EMAIL}
                    onChange={e => setEmail(e.target.value)} 
                    />

                    <input placeholder="WhatsApp" 
                    value={WHATSAPP}
                    onChange={e => setWhats(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={CIDADE}
                        onChange={e => setCidade(e.target.value)}
                         />

                        <input placeholder="UF" 
                        style={{width: 80}}
                        value={UF}
                        onChange={e => setUf(e.target.value)}
                         />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}