import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "./screens/MapScreen";
import AddMarkerScreen from "./screens/AddMarkerScreen";

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "MapScreen" component={MapScreen} options={{ headerShown: false }}/>
        <Stack.Screen name = "AddMarkerScreen" component={AddMarkerScreen} options={{ title: 'Adicionar Marcador' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}