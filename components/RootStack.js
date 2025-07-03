import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "./HomePage";
import DetailCocktail from "./DetailCocktail";
import CocktailTabs from "./CocktailTabs";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cocktails"
        component={CocktailTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailCocktail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
