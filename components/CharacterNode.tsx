import React from "react";
import { StyleSheet, View } from "react-native";

interface CharacterNodeProps {
  offsetX: number;
}

export default function CharacterNode({ offsetX }: CharacterNodeProps) {
  return (
    <View style={styles.anchorContainer}>
      <View
        style={[styles.placeholder, { transform: [{ translateX: offsetX }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  anchorContainer: {
    height: 0,
    width: "100%",
    zIndex: 10,
    alignItems: "center",
  },
  placeholder: {
    position: "absolute",
    top: -160,
    width: 120,
    height: 160,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C1C1C2",
    borderRadius: 8,
  },
});
