




import React, { useContext } from 'react';
import { View, StyleSheet, Text,  } from 'react-native';
import { GeralContext } from '../contexts/GeralContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Container } from './styles';

const AgendamentoCard = ({ item, onPress}) => {
    const { formatHours } = useContext(GeralContext);

    
  return(
    <TouchableOpacity  style={styles.agendamentoCard}>

        <Text style={StyleSheet.agendamentoCardText}>
           Hora: {formatHours(item.data)}
            
        </Text>
        <Text style={StyleSheet.agendamentoCardText}>
            Barbeiro:  {(item.barbeiro)}
            
        </Text>
        <Text style={StyleSheet.agendamentoCardText}>
            Serviço:  {(item.servico)}

            
        </Text>


        <Text style={StyleSheet.agendamentoCardText2}>
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

  ) ;
}

const styles = StyleSheet.create({


    container: {
        padding: 20,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        marginVertical: 10,
    },

    agendamentoCard: {
        padding: 20,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        marginVertical: 10,
    },
   

})

export default AgendamentoCard;