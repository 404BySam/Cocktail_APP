import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function CocktaiList({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      const results = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await res.json();
        if (data.drinks && data.drinks[0]) {
          results.push(data.drinks[0]);
        }
      }
      setCocktails(results);
      setLoading(false);
    };

    fetchCocktails();
  }, []);

  if (!cocktails) return <ActivityIndicator />;

  return (
    <ImageBackground source={require("../assets/cocktails.png")}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#43a047" />
          <Text style={{ color: "white", marginTop: 10 }}>Chargement...</Text>
        </View>
      ) : (
        <ScrollView>
          <Text>CocktaiList</Text>
          {cocktails.map((cocktails, index) => (
            <View key={index} style={{ marginVertical: 8 }}>
              <Text style={styles.titleTxt}>Nom : {cocktails.strDrink}</Text>
              <Text>Description : {cocktails.strCategory}</Text>
              <Image
                source={{ uri: cocktails.strDrinkThumb }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 16,
                  marginVertical: 8,
                }}
              />
              <Button
                title="Voir La recette"
                onPress={() => navigation.navigate("Detail")}
              />
            </View>
          ))}
          <Button title="Retour" onPress={() => navigation.goBack()} />
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: "Lobster-Regular",
    fontSize: 20,
    color: "white",
  },
});
