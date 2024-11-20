import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
// import { Container } from './styles';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { GeralContext } from '../contexts/GeralContext';

import { getAuth, signOut } from "firebase/auth";

const formObj = {
  barberShopName: "",
  configText: "",
  morada: "",
  codigoPostal: "",
  image64: '',
  funcionamento: {
    seg: {
      abertura: '09:00',
      horaDeFechar: '18:00'

    },

    ter: {
      abertura: '09:00',
      horaDeFechar: '18:00'
    },

    qua: {

      abertura: '09:00',
      horaDeFechar: '18:00'
    },
    qui: {
      abertura: '09:00',
      horaDeFechar: '18:00'
    },
    sex: {

      abertura: '09:00',
      horaDeFechar: '18:00'
    },

    sab: {

      abertura: '09:00',
      horaDeFechar: '18:00'
    },

    dom: {

      abertura: '09:00',
      horaDeFechar: '18:00'
    },


  }
}

const Settings = () => {

const LogOut=()=> {
  signOut(auth)
  .then(() => {
    Alert.alert("Terminaste sessão com sucesso")
    navigation.replace("Login")
  }).catch((error) => {
    Alert.alert("Algo de errado não está certo")
  });


}
  

  const navigation = useNavigation();
  const { formatHours, saveSettings, barbearia } = useContext(GeralContext)

  const [form, setForm] = useState(barbearia ? barbearia : formObj);


  const [pickerVisible, setPickerVisible] = useState('');


  function handleForm(field, value) {
    setForm({
      ...form,
      [field]: value
    })
  }


  function handlePicker(dia, tipo, date) {
    const dateTime = new Date(date).getTime();
    setPickerVisible('')

    setForm({
      ...form,
      funcionamento: {
        ...form.funcionamento,
        [dia]: {
          ...form.funcionamento[dia],
          [tipo]: formatHours(dateTime)
        }
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      handleForm('image64', result.assets[0].base64)
    }
  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.imageView}>

        <View style={styles.logOutButton} onPress={() => LogOut()}>
          <Ionicons name="md-exit-outline" size={36} color="#f44336" />
        </View>
        <TouchableOpacity onPress={() => pickImage()}>
          {form.image64
            ? <Image
              source={{ uri: 'data:image/jpeg;base64,' + form.image64 }}
              style={{
                width: 180,
                height: 180,
                marginVertical: 10,
                borderRadius: 100
              }}
            />
            : <MaterialCommunityIcons
              name="account-circle-outline"
              size={150} color="black"
            />
          }
        </TouchableOpacity>
        <Text style={styles.title}>
          Settings
        </Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.sectionText}>
          Nome da barbearia
        </Text>
        <TextInput
          mode='outlined'
          placeholder='Nome da Barbearia'
          value={form.barberShopName}
          onChangeText={(text) => handleForm("barberShopName", text)}
        />

        <Text style={styles.sectionText}>
          Configuração de link
        </Text>
        <Text style={styles.sectionDescription}>
          Isto serve para tu configurares o url
          que aparece para os teus clientes!
        </Text>

        <View style={styles.rowView}>
          <Text style={styles.linkText}>
            smartb.pt/
          </Text>
          <TextInput
            mode='outlined'
            placeholder=''
            value={form.configText}
            style={{ flex: 1 }}
            onChangeText={(text) => handleForm("configText", text)}
          />
        </View>


        <Text style={styles.sectionText}>
          Morada da barbearia
        </Text>
        <TextInput
          mode='outlined'
          placeholder='Morada'
          value={form.morada}
          onChangeText={(text) => handleForm("morada", text)}
        />

        <Text style={styles.sectionText}>
          Código postal da barbearia
        </Text>
        <TextInput
          mode='outlined'
          placeholder='Código Postal'
          value={form.codigoPostal}
          onChangeText={(text) => handleForm("codigoPostal", text)}
        />


        <Text style={styles.sectionText}>
          Funcionamento
        </Text>

        {pickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode='time'
            display='spinner'
            is24Hour={true}
            onChange={(event, date) => handlePicker(pickerVisible.dia, pickerVisible.tipo, date)}
          />
        )}

        <Text style={styles.sectionDescription}>
          Segunda-feira
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'seg',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.seg.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'seg',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.seg.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Terça-feira
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'ter',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.ter.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'ter',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.ter.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Quarta-feira
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'qua',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.qua.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'qua',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.qua.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Quinta-feira
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'qui',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.qui.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'qui',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.qui.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Sexta-feira
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'sex',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.sex.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'sex',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.sex.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Sabado
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'sab',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.sab.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'sab',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.sab.horaDeFechar}
          </Button>

     
        </View>

        <Text style={styles.sectionDescription}>
          Domingo
        </Text>
        <View style={styles.rowView}>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'dom',
              tipo: 'abertura'
            })}
          >
            {form.funcionamento.dom.abertura}
          </Button>
          <Button
            mode='contained-tonal'
            style={{ flex: 1 }}
            onPress={() => setPickerVisible({
              dia: 'dom',
              tipo: 'horaDeFechar'
            })}
          >
            {form.funcionamento.dom.horaDeFechar}
          </Button>

     
        </View>
        
        
        
     
        

        <Button
          mode='contained'
          style={styles.button}
          onPress={async () => {

            const result = await saveSettings(form);

            if (result) {


              Alert.alert("Configurações guardadas com sucesso")

              navigation.goBack();
            } else {


              Alert.alert("Erro ao guardar")
            }

          }



          }
        >
          Guardar
        </Button>
      </View>
      
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    paddingHorizontal: 40,
    paddingVertical: 5,
    //Maiúsculo
    textTransform: 'uppercase'
  },
  formulario: {
    paddingHorizontal: 20,
    gap: 5,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  linkText: {
    color: 'grey', //Procurar uma cor melhor
    fontSize: 16,
    fontWeight: 'bold',
  },

  logOutButton:{
   alignSelf: 'flex-end',
    
  },
  button: {
    marginVertical: 40,
    backgroundColor: '#000',
  }
})

export default Settings;