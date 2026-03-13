import { View, StyleSheet, Pressable, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { ListViewIcon } from "../assets/icons/ListViewIcon";
import { BtnIcon } from "../assets/icons/BtnIcon";

export default function BottomNav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const TAB_BAR_WIDTH = 268;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  //Mapping the icons onto my route
  const ICON_MAP: Record<string, React.FC<{ isFocused: boolean }>> = {
    index: BtnIcon,
    detail: ListViewIcon,
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNavContainer}>
        {/* The animated indicator will be here*/}

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const IconComponent = ICON_MAP[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {IconComponent ? (
                <IconComponent isFocused={isFocused} />
              ) : (
                <Text style={{ color: isFocused ? "#0080FF" : "#A1A3A5" }}>
                  {route.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
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
    borderRadius: 42,
    backgroundColor: "#DFDFE0",
  },
});
