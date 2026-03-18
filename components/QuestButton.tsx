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
  Blend,
  RadialGradient,
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

// For the highlight, top surface light and shadow
// Declaring the clipping mask for the top surface here
const ovalMask = { x: 4, y: 10, width: 82, height: 82 };
const surfaceClip = Skia.Path.Make().addOval(ovalMask);

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

  // I will make the highlight shapes as paths here

  const xOffsetA = 20;
  const yOffsetA = 88;
  //Bigger hightlight
  const highlightPathA = Skia.Path.MakeFromSVGString(
    `M ${0 + xOffsetA} ${0 + yOffsetA} C ${0 + xOffsetA} ${0 + yOffsetA} ${11.92 + xOffsetA} ${7 + yOffsetA} ${25.3 + xOffsetA} ${7 + yOffsetA} S ${50.6 + xOffsetA} ${0 + yOffsetA} ${50.6 + xOffsetA} ${0 + yOffsetA} C ${43.45 + xOffsetA} ${5.04 + yOffsetA} ${34.72 + xOffsetA} ${9 + yOffsetA} ${25.3 + xOffsetA} ${9 + yOffsetA} S ${7.15 + xOffsetA} ${5.04 + yOffsetA} ${0 + xOffsetA} ${0 + yOffsetA} Z`,
  );
  const xOffsetB = 28;
  const yOffsetB = 92;
  // Smaller highlight
  const highlightPathB = Skia.Path.MakeFromSVGString(
    `M ${0 + xOffsetB} ${0 + yOffsetB} C ${0 + xOffsetB} ${0 + yOffsetB} ${7.42 + xOffsetB} ${2.82 + yOffsetB} ${17.95 + xOffsetB} ${2.82 + yOffsetB} S ${35.9 + xOffsetB} ${0 + yOffsetB} ${35.9 + xOffsetB} ${0 + yOffsetB} C ${30.42 + xOffsetB} ${2.46 + yOffsetB} ${24.34 + xOffsetB} ${4.73 + yOffsetB} ${17.95 + xOffsetB} ${4.73 + yOffsetB} S ${5.48 + xOffsetB} ${2.46 + yOffsetB} ${0 + xOffsetB} ${0 + yOffsetB} Z`,
  );

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
          <Path path={animatedPath} color={"#0064C7"} />
          <Group clip={animatedPath}>
            {/* Here is the top of the button */}
            <Rect x={44} y={36} width={50} height={100} color="red">
              <LinearGradient
                start={vec(44, 50)}
                end={vec(100, 50)}
                colors={["#0064C7", "#023C71", "#0064C7"]}
                positions={[0, 0.4, 1]}
              />
            </Rect>
            <Group transform={groupTransform}>
              <Oval x={1} y={8} width={88} height={72} color="#0080FF">
                <Blur blur={1} />
              </Oval>
              {/* Don't forget about the scaleY { scaleY: 0.804 } */}
              <Group transform={[{ translateY: 2 }, { scaleY: 0.804 }]}>
                <Group transform={[{ rotate: 0 }]} origin={vec(45, 51)}>
                  {/* For the rotation, I will use the Math.PI * multiplier(starts from 0) */}
                  {/* The group here is where the rotation will happen. */}

                  {/* Here are the light and the shadow of the top surface, I will have two ovals clipped
                  by another oval. The cilp mask is defined outside of the component function*/}
                  <Group clip={surfaceClip}>
                    <Oval x={25} y={-10} width={80} height={80}>
                      <RadialGradient
                        c={vec(72, 23)}
                        r={40}
                        colors={["rgba(141,215,251,1)", "rgba(141,215,251,0)"]}
                      />
                    </Oval>
                  </Group>
                  {/* Lower Left */}
                  {highlightPathA && (
                    <Path
                      path={highlightPathA}
                      transform={[{ rotate: Math.PI * (1 / 5) }]}
                      origin={vec(45, 51)}
                      color="#FFF"
                    />
                  )}
                  {/* Lower Right */}
                  {highlightPathB && (
                    <Path
                      path={highlightPathB}
                      transform={[{ rotate: Math.PI * -(1 / 4) }]}
                      origin={vec(45, 51)}
                      color="#FFF"
                    />
                  )}
                  {/* Top Right */}
                  {highlightPathB && (
                    <Path
                      path={highlightPathB}
                      transform={[{ rotate: Math.PI * -(3 / 4) }]}
                      origin={vec(45, 51)}
                      color="#FFF"
                    />
                  )}
                  <Blur blur={1} />
                </Group>
              </Group>
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
    backgroundColor: "#FF00004D",
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
