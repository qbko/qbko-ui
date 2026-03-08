import { View, Text, StyleSheet, Pressable } from "react-native";

interface QuestButtonProps {
  onPress: () => void;
}

export default function QuestButton({ onPress }: QuestButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>Button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 108,
    height: 64,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2B70C9",
    borderRadius: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
