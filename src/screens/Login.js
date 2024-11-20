import React, { useContext, useEffect, useState } from 'react';
import { 
    Alert,
    Image, 
    ScrollView, 
    StyleSheet, 
    View 
} from 'react-native';

//Firebase and context
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { GeralContext } from '../contexts/GeralContext';
import { firebase } from '../contexts/config'; //import firebase

//Components and utils
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../components/LoadingScreen';

const Login = () => {

    //hooks
    const navigation = useNavigation();
    const {setUser} = useContext(GeralContext)
    //state
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        //firebase auth to login persistence
        onAuthStateChanged(firebase.auth, (user) => {
            if (user) {
              setUser(user)
              navigation.navigate('Tabs', { screen: 'Home' })
            } 
        })
        setLoading(false)
    }, [])

    async function tryLogin(){
        await signInWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser(user)
          navigation.navigate('Tabs', { screen: 'Home' })
            
        })
        .catch((error) => {
           if( error.code == 'auth/invalid-credential'){
            Alert.alert('Ocorreu um error!', 'Verifique o email ou a password')
           

        }else{

            Alert.alert('Erro desconhecido')
        }
        });   
    }

    //Loading
    if(loading){
        return <LoadingScreen />
    }

    return (
     


        <ScrollView style={styles.container}>
            <Image 
                style={styles.logo}
                source={{ uri: 'https://i.ibb.co/wS3qY4v/logodinis-removebg-preview.png' }} 
            />

            <View style={styles.form}>
                <TextInput 
                    mode='outlined'
                    placeholder='Email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput 
                    mode='outlined'
                    placeholder='Pass'
                    secureTextEntry={false}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button 
                    mode='contained'
                    style={styles.button}
                    onPress={async() => tryLogin()}
                >
                    Entrar
                </Button>
                <Button 
                    mode='contained'
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    Registar
                </Button>
            </View>
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
        gap: 15
    },
    button: {
        marginTop: 40,
        backgroundColor: '#000',
    }
})

export default Login;