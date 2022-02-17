import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker }  from 'react-native-maps';
import  { FAB } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';


export default function MapScreen({ navigation }) {
    const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'
    const [marker, setMarker] = useState([]);

    useFocusEffect(
        React.useCallback(function(){
            async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3003/markers',{
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            const marker = await response.json();
            setMarker(marker);
            }
            getData();
        }, []));

    return (
    <View style={styles.container}>
        <StatusBar style="auto"/>
        <MapView style={styles.map}>
            {
                marker.map((marker, id) => <Marker
                    key={id}
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.title}
                    description={marker.description} />)
            }
        </MapView>  
        <FAB
            size="large"
            placement="right"
            icon={{ name: 'add', color: 'white' }}
            color="black"
            onPress={() => navigation.navigate('AddMarkerScreen')}
        />     
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45, //A constante do statusBarHeight não estava funcionando corretamente, então fiz manualmente apenas para organização.
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});