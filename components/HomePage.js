import React from "react";
import { useFonts } from "expo-font";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../assets/fonts/Lobster-Regular.ttf"),
  });

  const scale = useSharedValue(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 1.15, { duration: 2500 }),
      -1,
      true
    );
  }, []);

  if (!fontsLoaded) {
    // Afficher un écran de chargement tant que la police n'est pas chargée
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/accueil.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tiTle}>
            Bienvenue dans l’app Cocktail Jungle !
          </Text>
        </View>
        <AnimatedTouchable
          style={[styles.btn, scaleStyles]} // appliquer l'animation au bouton (container)
          onPress={() => navigation.navigate("Cocktails")}
        >
          <Text style={styles.textBTN}>C'est Parti !</Text>
        </AnimatedTouchable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 200,
    width: "100%",
    alignItems: "center",
    zIndex: 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tiTle: {
    fontFamily: "Lobster-Regular",
    fontSize: 40,
    color: "#ffe082",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  btn: {
    width: 180,
    height: 56,
    backgroundColor: "#ffe082",
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#43a047",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  textBTN: {
    fontFamily: "Lobster-Regular",
    fontSize: 24,
  },
});
