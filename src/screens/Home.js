import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GeralContext } from '../contexts/GeralContext';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

import  Constants  from 'expo-constants';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const Home = () => {
  const { userData, barbearia, agendamentos, getAgendamentosMarcados, formatHours, formatDate } = useContext(GeralContext);

  useEffect(() => {
    if (barbearia) {
      getAgendamentosMarcados()
    }
  }, [barbearia])

  return (
    <View style={styles.container}>

      <View style={styles.analyticksIcon}>
    <MaterialIcons name="analytics" size={189} color="black" />

    </View>
      <View style={styles.topBar}>

        
       
      </View>


      {/* <Ionicons name="speedometer-outline" size={200} color="black" /> */}

      {agendamentos && (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => String(item.data)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Alert.alert('Clicou')} style={styles.agendamentoCard}>
           
              <Text style={styles.agendamentoCardText}>
              Dia: {formatDate(item.data)  }
              </Text>
              <Text style={styles.agendamentoCardText}>
              Barbeiro: {(item.barbeiro)}  
              </Text>
              <Text style={styles.agendamentoCardText}>
              Servico: {(item.servico)}
              </Text>
              <Text style={styles.agendamentoCardText}>
              Hora Marcada:{formatHours(item.data)}
              </Text>

              <Text style={StyleSheet.agendamentoCardText}>
          -- Informações Do Cliente --
            
        </Text>

        <Text style={StyleSheet.agendamentoCardText}>
            Nome: {(item.nome)}

            
        </Text>
        <Text style={StyleSheet.agendamentoCardText}>
            Numero: {(item.numeroTelefone)}

            
        </Text>
        <Text style={StyleSheet.agendamentoCardText}>
            Email: {(item.email)}

            
        </Text>
            </TouchableOpacity>

          )}

        />

        
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  analyticksIcon:{
    alignItems: 'center',

  },
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  topBar: {
    
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#ccc',

    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    color: '#000'
  },
  agendamentoCard: {
    padding: 20,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
  },
  agendamentoCardText: {
    fontSize: 16,
    color: '#000'
  }
})

export default Home;
