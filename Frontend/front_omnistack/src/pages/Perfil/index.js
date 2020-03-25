import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Perfil() {

  const [casos, setCasos] = useState([])
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongNome = localStorage.getItem('ongNome');

  useEffect(() => {
    api.get('perfil', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCasos(response.data);
    })
  }, [ongId]);

  async function DeletarCaso(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setCasos(casos.filter(caso => caso.id != id));
    } catch (err) {
      alert('Não foi possivel deletar')
    }

  }

  function Logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="perfil-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongNome}</span>
        <Link to="/casos/novo" className="button"> Cadastrar Novo Caso</Link>
        <button type="button" onClick={Logout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {
          casos.map(caso => (
            <li key={caso.id}>
              <strong>Caso:</strong>
              <p>{caso.TITULO}</p>

              <strong>Descrição:</strong>
              <p>{caso.DESCRICAO}</p>

              <strong>Valor:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.VALOR)}</p>

              <button type="button" onClick={() => DeletarCaso(caso.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>

          ))
        }
      </ul>

    </div>

  )
}