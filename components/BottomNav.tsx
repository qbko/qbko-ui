import { View, StyleSheet } from "react-native";

export default function BottomNav() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 34,
    width: "100%",
    alignItems: "center",
  },
  bottomNavContainer: {
    flexDirection: "row",
    width: 268,
    height: 84,
    backgroundColor: "#DFDFE0",
  },
});
