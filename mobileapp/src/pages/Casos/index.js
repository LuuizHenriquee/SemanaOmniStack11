import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Casos() {

  const navigation = useNavigation();
  const [incidents, setCasos] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  async function carregarCasos() {

    if (load) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    setLoad(true);

    const response = await api.get('casos',{
      params: {page}
    });

    setCasos([ ...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1)
    setLoad(false);

  };



  useEffect(() => {
    carregarCasos();
  }, []);

  function detalhes(caso) {
    navigation.navigate('Detalhes', { caso });

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia!</Text>

      <FlatList data={incidents}
        style={styles.listaCasos}
        keyExtractor={incident => String(incident.id)}
        onEndReached={carregarCasos}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.caso}>
            <Text style={styles.casoPropriedade}>ONG:</Text>
            <Text style={styles.casoValor}>{incident.NOME}</Text>

            <Text style={styles.casoPropriedade}>CASO:</Text>
            <Text style={styles.casoValor}>{incident.DESCRICAO}</Text>

            <Text style={styles.casoPropriedade}>VALOR:</Text>
            <Text style={styles.casoValor}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.VALOR)}</Text>

            <TouchableOpacity style={styles.detalheBotao}
              onPress={() => detalhes(incident)}>
              <Text style={styles.detalheBotaoText}>Ver mais detalhes.</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>

          </View>

        )} />
    </View>
  );
}