import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker }  from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';

export default function AddMarkerScreen() {
  const [latitude=0, setLatitude] = useState();
  const [longitude=0, setLongitude] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF';

  function enviarMarcador(){
    const json = {
      latitude,
      longitude,
      title,
      description,
    }

    fetch('https://mobile.ect.ufrn.br:3003/markers',{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),       
    })
    Alert.alert(
      'Marcador Adicionado com Sucesso'
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <MapView style={styles.map}
          onPress={(event) => {
            setLatitude(event.nativeEvent.coordinate.latitude)
            setLongitude(event.nativeEvent.coordinate.longitude)
          }}>
          <Marker
            coordinate={{latitude: latitude, longitude: longitude}}
            title={title}
            description={description}/>
        </MapView>
        <View style={styles.addmarkercontainer}>
          <Text style={styles.titletext}>Título</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
          <Text style={styles.descriptiontext}>Descrição</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription}/>
          <TouchableOpacity style={styles.sendButtom} onPress={enviarMarcador}>
            <Text style={styles.sendButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    minHeight: '40%',
    width: Dimensions.get('window').width,
    height: '72%',
  },
  addmarkercontainer: {
    height: 200,
    backgroundColor: '#fff',
  },
  titletext: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
    paddingLeft: 10,
  },
  descriptiontext: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sendButtom: {
    marginTop: 10,
    padding: 10,
    width: 380,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  sendButtomText:{
    color: '#fff'
  },
});