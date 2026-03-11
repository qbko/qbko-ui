import {
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { Canvas, Skia, Group, Path, Oval } from "@shopify/react-native-skia";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

interface SkiaButtonProps {
  onPress: () => void;
}

export default function SkiaButton({ onPress }: SkiaButtonProps) {
  const pressedOffset = useSharedValue(0);

  //Note: in order to accommodate the overshoot of the button on release, I increased
  // the height of the canvas by 10
  // This is the base of the button
  const animatedPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const topY = 46 + pressedOffset.value;

    path.moveTo(0, topY);
    path.lineTo(88, topY);

    path.lineTo(88, 54);
    path.cubicTo(88, 74, 68, 90, 44, 90);
    path.cubicTo(20, 90, 0, 74, 0, 54);

    path.close();

    return path;
  });

  //This is for the Group, the top surface of the button
  const groupTransform = useDerivedValue(() => [
    { translateY: pressedOffset.value },
  ]);
  //This is for the Rive container, that is inside the top surface of the button
  const riveSurfaceTransform = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: pressedOffset.value }],
    };
  });

  //Below is for the animation fine tuning
  const releaseHandling = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    //Check whether the release point is within the button or not
    const isInside =
      locationX >= 0 && locationX <= 88 && locationY >= 0 && locationY <= 80;

    if (isInside) {
      // Scenario A: Finger lift normally, no spring
      pressedOffset.value = withTiming(0, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
    } else {
      // Scenario B: Finger slides off the surface, causing the button to snap back.
      pressedOffset.value = withSpring(0, {
        stiffness: 900,
        damping: 20,
        mass: 1,
        energyThreshold: 0.001,
        reduceMotion: ReduceMotion.System,
      });
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Canvas style={styles.canvas}>
          <Path path={animatedPath} color="#0064C7" />
          <Group transform={groupTransform}>
            <Oval x={0} y={10} width={88} height={72} color="#0080FF" />
            <Oval
              x={3}
              y={12}
              width={82}
              height={66}
              color="#0080FF"
              blendMode="screen"
              opacity={0.33}
            />
          </Group>
        </Canvas>
        <Animated.View style={[styles.riveContainer, riveSurfaceTransform]}>
          <Canvas style={styles.riveCanvas}>
            <Oval x={28} y={31} width={32} height={26} color="#FFFFFF" />
          </Canvas>
        </Animated.View>
        <Pressable
          onPressIn={() => {
            pressedOffset.value = withTiming(6, {
              duration: 100,
              easing: Easing.out(Easing.quad),
            });
          }}
          onPressOut={releaseHandling}
          style={styles.hitTarget}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 90,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: 88,
    height: 90,
    position: "relative",
  },
  riveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 88,
    height: 72,
  },
  riveCanvas: {
    width: "100%",
    height: "100%",
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
  hitTarget: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 88,
    height: 80,
  },
});
