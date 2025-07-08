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
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
        );
        if (!response.ok) throw new Error("Erreur réseau !");
        const json = await response.json();
        if (isMounted) setCocktails(json.drinks || []);
      } catch (err) {
        if (isMounted) setError(err.message || "Erreur inconnue");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#43a047" />;
  if (error) return <Text style={{ color: "red" }}>Erreur : {error}</Text>;
  if (!cocktails.length)
    return <Text style={{ color: "white" }}>Aucun cocktail trouvé.</Text>;

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
