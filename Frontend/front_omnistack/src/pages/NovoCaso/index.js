import React,{ useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NovoCaso() {

    const [TITULO, setTitulo] = useState('')
    const [DESCRICAO, setDescricao] = useState('')
    const [VALOR, setValor] = useState('')
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function CadastrarNovo(e){
        e.preventDefault();

        const data = {
            TITULO,
            DESCRICAO,
            VALOR
        }
        try{
            await api.post('casos', data, {
                headers:{
                    Authorization: ongId
                }
            });
            alert('Cadastro com sucesso')
            history.push('/perfil')
        }catch(err){
            alert('Erro ao cadastrar')
        }
        
    }

    return (
        <div className="novo-caso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadatrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/perfil">
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para Home.
                         </Link>
                </section>
                <form onSubmit={CadastrarNovo}>
                    <input placeholder="Titulo do Caso"
                    value={TITULO}
                    onChange={e => setTitulo(e.target.value)}
                     />
                    <textarea  placeholder="Descrição" 
                    value={DESCRICAO}
                    onChange={e => setDescricao(e.target.value)}
                    />
                    <input placeholder="Valor em Reais"
                    value={VALOR}
                    onChange={e => setValor(e.target.value)}
                     />
                    <button className="button" type="submit">Cadastrar</button>
                    <button className="button" type="submit">Cancelar</button>
                </form>
            </div>
        </div>
    )
}