import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GeralContext } from '../contexts/GeralContext';

const BarberList = () => {
  
  const { userData, getBarbeiros, barbeiros, barbearia, deleteBarbeiros} = useContext(GeralContext);
  const [showAddBarber, setShowAddBarber] = useState(false);
  const [newBarberEmail, setNewBarberEmail] = useState('');

  useEffect(() => {
    if (barbearia) {
      getBarbeiros();
    }
  }, [barbearia]);

  const handleAddBarber = () => {
    // Lógica para adicionar o novo barbeiro com o email fornecido
    // ...

    // Limpa o campo de email e oculta a visualização de adicionar barbeiro
    setNewBarberEmail('');
    setShowAddBarber(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={()  => deleteBarbeiros(item.id)}>
      <View style={styles.imageContainer}>
        {item.image64 ? (
          <Image
            source={{ uri: 'data:image/jpeg;base64,' + item.image64 }}
            style={styles.image}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={40}
            color="black"
            style={styles.icon}
          />
        )}
      </View>
      <Text style={styles.name}>{item.nome}</Text>

  
<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
  <View style={styles.deleteIcon}>
    <MaterialCommunityIcons
      name="delete"
      size={32}
      color="black"
    />
  </View>
</View>

      
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Barbeiros</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddBarber(!showAddBarber)}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>

      {showAddBarber && (
        <View style={styles.addBarberContainer}>
          <Text style={styles.addBarberText}>Adicionar Barbeiro</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Nome do barbeiro"
            value={newBarberEmail}
            onChangeText={setNewBarberEmail}
          />
          <TouchableOpacity   
            mode="contained"
            buttonColor="#ff0000"
            title="Cancelar"
            
          style={styles.addButton} 
          onPress={handleAddBarber}>
            <Text style={styles.addButtonLabel}>Adicionar</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={[styles.addButton, styles.cancelButton]}
            onPress={() => setShowAddBarber(false)}
          >
            <Text style={styles.addButtonLabel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showAddBarber && (
        <FlatList
          data={barbeiros}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon:{
 

  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  barContainer: {
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
  addButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 24,
    color: 'white',
  },
  addBarberContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  addBarberText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emailInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  contentContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
});

export default BarberList;
