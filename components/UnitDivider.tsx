import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface UnitDividerProps {
  title: string;
}

export default function UnitDivider({ title }: UnitDividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 32,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#C1C1C2",
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#8D8F91",
  },
});
