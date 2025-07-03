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
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffe082",
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          fontFamily: "Lobster-Regular",
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen
        name="Listes"
        component={CocktaiList}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Favoris" component={Favoris} />
    </Tab.Navigator>
  );
}
