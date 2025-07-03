import React from "react";
import { useFonts } from "expo-font";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

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
      withTiming(scale.value * 2, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  if (!fontsLoaded) {
    // Afficher un écran de chargement tant que la police n'est pas chargée
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tiTle}>Cocktails APP</Text>
      <AnimatedTouchable
        style={[styles.btn, scaleStyles]} // appliquer l'animation au bouton (container)
        onPress={() => navigation.navigate("Cocktails")}
      >
        <Text style={styles.textBTN}>GO</Text>
      </AnimatedTouchable>
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
  tiTle: {
    fontFamily: "Lobster-Regular",
    fontSize: 50,
  },
  btn: {
    width: 50,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textBTN: {
    fontFamily: "Lobster-Regular",
    fontSize: 24,
  },
});
