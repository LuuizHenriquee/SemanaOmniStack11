import React from 'react';
import { View, Image, Text, TouchableOpacity, Link, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'


import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Detalhes() {
  
  const route = useRoute();
  const caso = route.params.caso;
  const nav = useNavigation();
  const message = `Olá, ${caso.NOME}, estou entrando em contato pois gostaria de ajudar no caso ${caso.TITULO} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.VALOR)} `
  
  

  function casos() {
    nav.goBack();
  }

  function Email() {
    MailComposer.composeAsync({
      subject: `Herói do caso:${caso.NOME}` ,
      recipients: [caso.EMAIL],
      body: message
    })

  }

  function Whats() {
    Linking.openURL(`whatsapp://send?phone=${caso.WHATSAPP}&text=${message}`);

  }

  return (

    <View style={styles.container} >
      <View style={styles.header} >
        <Image source={logoImg} />
        <TouchableOpacity onPress={casos}>
          <Feather name="arrow-left" size={28} color='#e02041' />
        </TouchableOpacity>
      </View>


      <View style={styles.caso}>
        <Text style={styles.casoPropriedade}>ONG:</Text>
        <Text style={styles.casoValor}>{caso.NOME}</Text>

        <Text style={styles.casoPropriedade}>CASO:</Text>
        <Text style={styles.casoValor}> {caso.DESCRICAO}</Text>

        <Text style={styles.casoPropriedade}>VALOR:</Text>
        <Text style={styles.casoValor}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.VALOR)} </Text>
      </View>

      <View style={styles.contato}>
        <Text style={styles.casoPropriedade}>Salve o dia!</Text>
        <Text style={styles.casoPropriedade}>Seja o herói desse caso.</Text>

        <Text style={styles.casoValor}>Entre em contato:</Text>

        <View style={styles.acoes}>
          <TouchableOpacity style={styles.acao} onPress={Whats}>
            <Text style={styles.acaoTexto}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acao} onPress={Email}>
            <Text style={styles.acaoTexto}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}