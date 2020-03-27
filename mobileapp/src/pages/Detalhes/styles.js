import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  caso: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginTop: 48
  },

  contato: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },

  casoPropriedade: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  casoValor: {
    fontSize: 15,
    marginBottom: 24,
    marginTop: 8,
    color: '#737380',
  },

  acoes: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  acao: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  acaoTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  }

})
