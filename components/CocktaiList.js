import { View, Text, Button } from "react-native";
import React from "react";

export default function CocktaiList({ navigation }) {
  return (
    <View>
      <Text>CocktaiList</Text>
      <Button
        title="Voir La recette"
        onPress={() => navigation.navigate("Detail")}
      />
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}
