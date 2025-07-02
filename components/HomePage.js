import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Voici la Page principal</Text>
      <Button
        title="Voir tous les cocktails"
        onPress={() => navigation.navigate("Cocktails")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
