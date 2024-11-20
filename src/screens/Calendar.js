import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Modal } from 'react-native';
import Constants from 'expo-constants';

import { Calendar as CalendarComponent, LocaleConfig } from 'react-native-calendars';
import { Button } from 'react-native-paper';
import { GeralContext } from '../contexts/GeralContext';
import { FlatList } from 'react-native-gesture-handler';
import AgendamentoCard from '../components/AgendamentoCard';

const dateNow = new Date();


const Calendar = () => {

  const { barbearia, agendamentos, getAgendamentosMarcados, formatDate } = useContext(GeralContext);

  const dataHoje = dateNow.getTime();

  const [selected, setSelected] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [ agendamentosData, setAgendamentosData ] = useState('');
  const [ filter, setFilter ] = useState({ type: 'dia', value: formatDate(dateNow.getTime()) })

  useEffect(() => {
    if (barbearia) {
      getAgendamentosMarcados()
    }
  }, [barbearia])

  function filterAgendamentos(value){
    const result = agendamentos.filter(x => formatDate(x.data) == value);

    setAgendamentosData(result);
  }


  useEffect(() => {
    if(agendamentos){
      filterAgendamentos(filter.value)
    }
  }, [agendamentos, filter])

  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={filter.type == 'dia' ? styles.buttonActive :  styles.button}
          onPress={() => setFilter({ type: 'dia', value: formatDate(dataHoje)})} 
        >
          <Text style={filter.type == 'dia' ? styles.textosActive : styles.textos}>
            Dia
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={filter.type == 'amanha' ? styles.buttonActive :  styles.button}
          onPress={() => setFilter({ type: 'amanha', value: formatDate(dataHoje+(86400*1000))})}   
        >
          <Text style={filter.type == 'amanha' ? styles.textosActive : styles.textos}>
            Amanhã
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={filter.type == 'calendar' ? styles.buttonActive :  styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={filter.type == 'calendar' ? styles.textosActive : styles.textos}>
            Mês
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistView}>
        <Text style={styles.textDate}>
          {filter.value}
        </Text>
        {agendamentosData && (
          <FlatList
            data={agendamentosData}
            keyExtractor={(item) => String(item.data, item.barbearia)}
            renderItem={({ item }) => (
              <AgendamentoCard 
                item={item}
                onPress={() => {}}
              />
            )}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { //Função acionada quando clica-se fora do modal para fechá-lo
          setModalVisible(false);
        }}
      >
        <View style={styles.modal}>
          <CalendarComponent
            // date={dateNow}
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
            }}
          />
          <Button
            mode='contained'
            buttonColor='#000'
            textColor='#FFF'
            style={{ marginTop: 30 }}
            onPress={() => {
              setFilter({ type: 'calendar', value: selected })
              setModalVisible(false)
            }}
          >
            Selecionar
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mudarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    //Maiúsculo
    textTransform: 'uppercase'
  },
  textos: { 
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    //Maiúsculo
    textTransform: 'uppercase'
  },
  textosActive: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    //Maiúsculo
    textTransform: 'uppercase'
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: "#fff",
    width: '25%',
    padding: 10,
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: "#000",
    width: '25%',
    padding: 10,
    borderRadius: 5,
  },
  textDate: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  flatlistView: {
    flex: 1,
    padding: 20,
  },

  textDate: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: '#c5c5c5',
    justifyContent: 'center',
    alignItems: 'center'
  }
})




export default Calendar;