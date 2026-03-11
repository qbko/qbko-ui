import { StyleSheet, View, Pressable, Text } from "react-native";

const BUTTON_SIZE = {
  sm: {
    width: 66,
    height: 48,
  },
  md: {
    width: 88,
    height: 64,
  },
  lg: {
    width: 121,
    height: 88,
  },
};

type ButtonState = "inactive" | "current" | "completed";
type ButtonIcon = "start" | "check" | "mic";
type ButtonSize = keyof typeof BUTTON_SIZE;
type StepCount = 1 | 2 | 3 | 4 | 5 | 6;

interface QuestButtonColors {
  surface?: string; // surface right below the icon
  side?: string; // side of the icon
  icon?: string; // icon color
  hightlight?: string; // highlight color, also used for the 'polish' on the button surface
  track?: string; // track color, used to housed the button
  trackSide?: string; // track side color
}

interface QuestButtonProps {
  state: ButtonState; // state of the button
  icon: ButtonIcon; // icon on the button
  size?: ButtonSize; // size of the button
  totalSteps?: StepCount; // number of steps in a given quest
  currentStep?: StepCount; // current step of the quest
  colors?: {
    inactive?: QuestButtonColors;
    current?: QuestButtonColors;
    completed?: QuestButtonColors;
  };
  // controls the entrance animation on mount. If true, it will enter the button to the 'current' state.
  // If false, it will enter the button to the inactive state.
  animateEntrance?: boolean;

  onPress: () => void;
}

export default function QuestButton({
  state,
  icon,
  size = "md",
  totalSteps,
  currentStep,
  colors,
  animateEntrance,
  onPress,
}: QuestButtonProps) {
  return (
    <View style={styles.container}>
      <Text> QuestButton</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
