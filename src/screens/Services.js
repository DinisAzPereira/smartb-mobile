import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { GeralContext } from '../contexts/GeralContext';

const Services = () => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { getServicos, servicos, barbearia, saveServicos } = useContext(GeralContext);

  useEffect(() => {
    if (barbearia) {
      getServicos();
    }
  }, [barbearia, showForm]);

  const handleAddService = () => {
    if (serviceName === '' || servicePrice === '' || serviceDuration === '') {
      return;
    }

    const newService = {
      nome: serviceName,
      preco: servicePrice,
      Duracao: serviceDuration
    };

    const result = saveServicos(newService);

    if (result) {
      Alert.alert('Serviço guardado com sucesso!');
      setShowForm(false);
    } else {
      Alert.alert('Erro ao guardar serviço');
    }
  };

  const handleCancelAddService = () => {
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const renderItem = ({ item }) => (
    <View style={styles.serviceContainer}>
      <Text style={styles.serviceName}>{item.nome}: </Text>
      <Text style={styles.serviceDetails}>
        Preço:{item.preco} | Duração: {item.Duracao} mins
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {showForm ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Adicionar Serviço</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do serviço"
            value={serviceName}
            onChangeText={setServiceName}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço do serviço"
            value={servicePrice}
            onChangeText={setServicePrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Duração estimada"
            value={serviceDuration}
            onChangeText={setServiceDuration}
          />
          <Button
            style={styles.adicionarServicoButton}
            mode="outlined"
            textColor="white"
            buttonColor="green"
            onPress={handleAddService}
          >

            Adicionar serviço
          </Button>
          <Button
            style={styles.cancelarServicoButton}
            mode="contained"
            buttonColor="#ff0000"
            title="Cancelar"
            onPress={handleCancelAddService}
          >
            Cancelar adição de serviço
          </Button>
        </View>
      ) : (
        <View style={styles.barContainer}>
          <Text style={styles.barText}>Serviços</Text>
          <TouchableOpacity style={styles.addButton} onPress={toggleForm}>
            <Text style={styles.addButtonLabel}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {showForm ? null : (
        <FlatList
          data={servicos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  adicionarServicoButton: {},
  cancelarServicoButton: {
    marginTop: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },

  addServiceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  addButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'black',
    height: 48,
  },
  barText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  addButtonLabel: {
    fontSize: 24,
    color: 'white',
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  serviceDetails: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Services;