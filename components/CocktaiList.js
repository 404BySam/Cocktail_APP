import { View, Text, Button, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

export default function CocktaiList({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      const results = [];
      for (let i = 0; i < 5; i++) {
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
    <View>
      <Text>CocktaiList</Text>
      {cocktails.map((cocktail, index) => (
        <View key={index} style={{ marginVertical: 8 }}>
          <Text>Nom : {cocktail.strDrink}</Text>
          <Text>Description : {cocktail.strCategory}</Text>
          <Button
            title="Voir La recette"
            onPress={() => navigation.navigate("Detail")}
          />
        </View>
      ))}
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}
