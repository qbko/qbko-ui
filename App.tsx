import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SkiaButton from "./components/SkiaButton";

export default function App() {
  const handlePress = () => {
    console.log("button pressed, yo!");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SkiaButton onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
