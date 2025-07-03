module.exports = {
  presets: ["babel-preset-expo"], // ou autres presets
  plugins: [
    // tes autres plugins...
    "react-native-reanimated/plugin", // obligatoire, en dernier
  ],
};
