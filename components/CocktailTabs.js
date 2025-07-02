import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import CocktaiList from "./CocktaiList";

function Favoris() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Autre onglet</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function CocktailTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Listes" component={CocktaiList} />
      <Tab.Screen name="Favoris" component={Favoris} />
    </Tab.Navigator>
  );
}
