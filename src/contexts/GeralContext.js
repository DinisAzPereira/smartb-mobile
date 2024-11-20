import React, { createContext, useEffect, useState } from "react";

import { firebase } from './config';
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import {  deleteDoc } from "firebase/firestore";

export const GeralContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    const [ user, setUser ] = useState(null);
    const [ userData, setUserData ] = useState('');
    const [ barbearia, setBarbearia ] = useState('');
    const [barbeiros, setBarbeiros] = useState('');
    const [ agendamentos, setAgendamentos ] = useState('');
    const [servicos, setServicos] = useState("");

    useEffect(() => {
        if(user){
            getUserData();
        }
    }, [user])

    async function getUserData(){
        await onSnapshot(doc(firebase.db, "users", user.uid), (doc) => {
            setUserData({ ...doc.data(), docId: doc.id })
        });
    }

    useEffect(() => {
        if(userData){
            getBarbearia()
        }
    }, [userData])

    async function getBarbearia() {
        await onSnapshot(doc(firebase.db, "barbearias", userData.barbeariaId), (doc) => {
            setBarbearia({ ...doc.data(), docId: doc.id })
        });
    }
    async function deleteAgendamentos(){

        await deleteDoc(doc(firebase.db, "agendamentos", ));

    }

    async function deleteBarbeiros(docID){

        await deleteDoc(doc(firebase.db, "barbeiros", docID ))

    }
    async function getBarbeiros(){        
        //Consulta barbeiros existentes
        const barbeirosRef = collection(firebase.db, "barbeiros");
        const consulta = query(barbeirosRef, where('barbeariaId', '==', barbearia.docId));
        
        //onSnapshot faz o get em tempo real dos agendamentos
        onSnapshot(consulta, (querySnapshot) => {
            const array = [];

            querySnapshot.forEach((doc) => {
                array.push({...doc.data(), id: doc.id})
            });

            setBarbeiros(array)
        });
    }

    async function getServicos(){
        const array = [];
        
        //Consulta barbeiros existentes
        const servicosRef = collection(firebase.db, `barbearias/${barbearia.docId}/servicos`);
        const consulta = query(servicosRef);
        
        //get docs
        const querySnapshot = await getDocs(consulta);
        
        //Se não tiver agendamentos marcados retorna um array vazio
        if(querySnapshot.docs.length == 0){
            return setServicos([])
        }

        querySnapshot.forEach((doc) => {
            //Se existir agendamentos marcados coloca dentro do array
            array.push({...doc.data(), id: doc.id})
        })

        setServicos(array)
    }

    async function getAgendamentosMarcados(){
        const array = [];       
        
        //Consulta agendamentos existentes
        const agendamentosRef = collection(firebase.db, "agendamentos");
        const consulta = query(agendamentosRef, where('barbeariaId', '==', barbearia.docId));

        //onSnapshot faz o get em tempo real dos agendamentos
        onSnapshot(consulta, (querySnapshot) => {
            const array = [];

            querySnapshot.forEach((doc) => {
                array.push({...doc.data(), id: doc.id})
            });

            setAgendamentos(array)
        });
    }


   

    async function saveSettings(settings){
        const docRef = doc(firebase.db, "barbearias", barbearia.docId)

        return await updateDoc(docRef, settings)
        .then(() => {       
            // retorna true caso tenha sucesso
            return true
        })

        .catch(() => {
           // retorna falso caso não tenha sucesso
            return false
        })
    }

    async function saveServicos(servico){
        const docRef = collection(firebase.db, `barbearias/${barbearia.docId}/servicos`)

        return await addDoc(docRef, servico)
        .then(() => {       
            // retorna true caso tenha sucesso
            return true
        })

        .catch(() => {
           // retorna falso caso não tenha sucesso
            return false
        })
    }
     
    const formatHours = (time) => {//Formata a hora em hora:minuto:segundo

        const dateNow = new Date(time);
        const hours = dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours();
        const minutes = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes();
    
        const fullHour = `${hours}:${minutes}`;
    
        return fullHour
    }

    const formatDate = (time) => {//Formata a data em ano-mes-dia

        if(!time){
            return null;
        }

        const date = new Date(time);

        const dateString = `${date.getFullYear()}-${
            formatNumber(date.getMonth()+1)}-${
                formatNumber(date.getDate())}`;

        return dateString
    }    

    function formatNumber(number){//Insere o 0 caso o numero seja menor que 10. ex: 07
        if(number < 10){
            return `0${number}`
        }else{
            return number
        }
    }

    return (
        <GeralContext.Provider
            value={{
                //Aqui dentro passamos as funções/variáveis globais
                user: user, 
                userData: userData,
                barbearia: barbearia,
                setUser,
                saveSettings,
                //agendamentos
                agendamentos: agendamentos,
                getAgendamentosMarcados,
                getBarbeiros,
                deleteAgendamentos,
                deleteBarbeiros,
                getServicos,

                barbeiros,
                servicos,
                saveServicos,

                //Util
                formatHours,
                formatNumber,
                formatDate,
            }}
        >
            {children}
        </GeralContext.Provider>
    )
}