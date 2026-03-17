import {
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import {
  Canvas,
  Skia,
  Group,
  Path,
  Oval,
  Blur,
  Rect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

interface QuestButtonProps {
  onPress: () => void;
}

export default function QuestButton({ onPress }: QuestButtonProps) {
  const pressedOffset = useSharedValue(0);

  //Note: in order to accommodate the overshoot of the button on release, I increased
  // the height of the canvas by 10
  // This is the base of the button
  const animatedPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const yConstant = 44; // I added a 8px offset so that the button, when snaps back and bounce
    // it will not get cropped, and also, left 2px at the bottom to prevent unpredictable cropping
    // more over, I moved the button 1px to the right, just to give some breathing room on the sides.
    const topY = yConstant + pressedOffset.value;
    const magicConstantY = 19.8;

    path.moveTo(1, topY);
    path.cubicTo(1, topY - magicConstantY, 20.8, topY - 36, 45, topY - 36);
    path.cubicTo(69.2, topY - 36, 89, topY - magicConstantY, 89, topY);
    path.lineTo(89, topY + 8);

    path.cubicTo(89, 52 + magicConstantY, 69.2, 88, 45, 88);
    path.cubicTo(20.8, 88, 1, 52 + magicConstantY, 1, 52);
    //Don't forget about the +10px offset on the y-axis
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
      locationX >= 0 && locationX <= 88 && locationY >= 0 && locationY <= 72;

    if (isInside) {
      // Scenario A: Finger lift normally, no spring
      pressedOffset.value = withTiming(0, {
        duration: 100,
        easing: Easing.out(Easing.quad),
      });
    } else {
      // Scenario B: Finger slides off the surface, causing the button to snap back.
      // I am using pressRetentionOffset to prevent the default Pressable behavior.
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
        <Canvas style={{ width: 90, height: 90 }}>
          <Path path={animatedPath} color="#0064C7" />
          <Group clip={animatedPath}>
            <Rect x={44} y={36} width={50} height={100} color="red">
              <LinearGradient
                start={vec(44, 50)}
                end={vec(100, 50)}
                colors={["#0064C7", "#023C71", "#0064C7"]}
                positions={[0, 0.4, 1]}
              />
            </Rect>
            <Group transform={groupTransform}>
              <Oval x={0} y={10} width={88} height={72} color="#0080FF">
                <Blur blur={2} />
              </Oval>
            </Group>
          </Group>
        </Canvas>
        {/* <Animated.View style={[styles.riveContainer, riveSurfaceTransform]}>
          <Canvas style={styles.riveCanvas}>
            <Oval x={28} y={31} width={32} height={26} color="#FFFFFF" />
          </Canvas>
        </Animated.View> */}
        <Pressable
          onPressIn={() => {
            pressedOffset.value = withTiming(6, {
              duration: 100,
              easing: Easing.out(Easing.quad),
            });
          }}
          onPressOut={releaseHandling}
          pressRetentionOffset={{ top: 0, left: 0, right: 0, bottom: 0 }}
          style={styles.hitTarget}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 90,
    height: 90,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: 90,
    height: 90,
    paddingBlock: 2,
    position: "relative",
    justifyContent: "flex-end",
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
  hitTarget: {
    position: "absolute",
    top: 10,
    left: 0,
    width: 88,
    height: 78,
  },
});
