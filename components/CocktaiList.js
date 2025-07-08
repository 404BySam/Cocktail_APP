import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
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
    <ImageBackground
      source={require("../assets/cocktails.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.listTitle}>Cocktails – Lettre A</Text>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
        <View style={styles.grid}>
          {cocktails.map((cocktail, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{ uri: cocktail.strDrinkThumb }}
                style={styles.image}
              />
              <Text style={styles.title}>{cocktail.strDrink}</Text>
              <Text style={styles.category}>{cocktail.strCategory}</Text>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Voir recette"
                  color="#43a047"
                  onPress={() => navigation.navigate("Detail", { cocktail })}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  noDataText: {
    color: "#fff",
    fontSize: 18,
  },
  listTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  title: {
    fontFamily: "Lobster-Regular",
    fontSize: 18,
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 8,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffe082",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Lobster",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
