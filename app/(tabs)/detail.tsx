import { StyleSheet, View } from "react-native";
import QuestButton from "../../components/QuestButton";

export default function DetailScreen() {
  const handlePress = () => {
    console.log("hii, pressed!");
  };

  return (
    <View style={styles.container}>
      <QuestButton onPress={handlePress} />
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
