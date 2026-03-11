import { View, Text, StyleSheet, Pressable } from "react-native";

interface QuestButtonProps {
  onPress: () => void;
}

// This component needs a file prop. It is needed so we can reference to the file
// from the context Provider we are going to create.

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
    width: 88,
    height: 80,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    scaleY: 0.6,
    backgroundColor: "#0080FF",
    borderRadius: 50,
    width: "100%",
    height: 80,
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
