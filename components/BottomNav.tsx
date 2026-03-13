import { View, StyleSheet, Pressable, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import { useEffect } from "react";

import { ListViewIcon } from "../assets/icons/ListViewIcon";
import { BtnIcon } from "../assets/icons/BtnIcon";

export default function BottomNav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const TAB_CONTAINER_WIDTH = 262; //because I have a 3dp border which will affect the internal space the component
  const TAB_WIDTH = TAB_CONTAINER_WIDTH / state.routes.length;

  //Mapping the icons onto my route
  const ICON_MAP: Record<string, React.FC<{ isFocused: boolean }>> = {
    index: ListViewIcon,
    detail: BtnIcon,
  };

  //Animation
  const translateX = useSharedValue(0);
  const offsetValue = TAB_WIDTH * state.index;

  // SO, basically, when the index changes, we need to animate the indicator to the new position
  useEffect(() => {
    translateX.value = withTiming(offsetValue, {
      duration: 250,
      easing: Easing.bezier(0.45, 0.04, 0, 0.96),
      reduceMotion: ReduceMotion.System,
    });
  }, [state.index]);

  const indicatorTransition = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.bottomNavContainer}>
        <Animated.View
          style={[
            indicatorTransition,
            {
              position: "absolute",
              left: 10,
              top: 10,
              height: "100%",
              width: TAB_WIDTH,
              backgroundColor: "#FFF",
              borderRadius: 42,
            },
          ]}
        ></Animated.View>

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
                borderRadius: 42,
              }}
            >
              {IconComponent && (
                <View
                  style={{
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent isFocused={isFocused} />
                </View>
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
    padding: 10,
    width: 288,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: "#C1C1C2",
    backgroundColor: "#DFDFE0",
  },
});
