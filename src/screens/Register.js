import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firebase } from '../contexts/config';


const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [codigoPostal, setcodigoPostal] = useState('');
  const [barberShopName, setbarberShopName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const navigation = useNavigation();



  async function tryCreate() {

    await createUserWithEmailAndPassword(firebase.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        //Coleção barbearias Firebase
        return await addDoc(collection(firebase.db, "barbearias"), {
          email: email,
          codigoPostal: codigoPostal,
          barberShopName: barberShopName,
          phoneNumber: phoneNumber,
          
        }).then(async (doc) => {
          //Coleção users Firebase
          await setDoc(doc(firebase.db, "users", user.uid), {
            barbeariaId: doc.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
          }).then(() => {
            return navigation.navigate('Tabs', { screen: 'Home' })
          })
        })
      })
  }

  return (



    <ScrollView style={styles.container}>

      <View style={styles.form}>

        <TextInput
          mode='outlined'
          placeholder='Nome da Barbearia'
          keyboardType='default'
          value={barberShopName}
          onChangeText={(text) => setbarberShopName(text)}

        />


        <TextInput
          mode='outlined'
          placeholder='Primeiro Nome'
          keyboardType='default'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}

        />


        <TextInput
          mode='outlined'
          placeholder='Apelido'
          keyboardType='default'
          value={lastName}
          onChangeText={(text) => setlastName(text)}

        />



        <TextInput
          mode='outlined'
          placeholder='Email'
          keyboardType='email-address'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          mode='outlined'
          placeholder='Palavra Passe'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          mode='outlined'
          placeholder='Número de telemóvel'
          keyboardType='number-pad'
          value={phoneNumber}
          onChangeText={(number) => setphoneNumber(number)}

        />

        <TextInput
          mode='outlined'
          placeholder='Código Postal'
          value={codigoPostal}
          onChangeText={(text) => setcodigoPostal(text)}
        />


      </View>



      <Button
        mode='contained'
        style={styles.button}
        onPress={async () => await tryCreate()}
      >
        Registar
      </Button>
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff'
  },
  logo: {
    aspectRatio: 1,
    height: 250,
    width: 250,
    alignSelf: 'center'
  },
  form: {
    padding: 20,
    gap: 15,

  },
  button: {
    backgroundColor: '#000',
    marginTop: 44,
    margin: 12,
  }
})

export default Register;