import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import QuestButton from "../../components/QuestButton";

// defining the interfaces for the nodes
export interface ButtonNode {
  type: "button";
  id: string;
  unit: string;
  totalLesson: number;
  lessonNumber: number; // 1-based, resets per unit
}

// Union type for the list
export type ListItemType = ButtonNode;

// Mock Data: Unit-1 has 15 lessons, Unit-2 has 12 lessons. lessonNumber resets per unit.
const MOCK_DATA: ListItemType[] = [
  // Unit-1: 15 nodes (lesson 1–15)
  ...Array.from({ length: 15 }, (_, i) => ({
    type: "button" as const,
    id: `unit-1-lesson-${i + 1}`,
    unit: "Unit-1",
    totalLesson: 15,
    lessonNumber: i + 1,
  })),
  // Unit-2: 12 nodes (lesson 1–12)
  ...Array.from({ length: 12 }, (_, i) => ({
    type: "button" as const,
    id: `unit-2-lesson-${i + 1}`,
    unit: "Unit-2",
    totalLesson: 12,
    lessonNumber: i + 1,
  })),
];

export default function HomeScreen() {
  //Render Function
  // Evaluates the type property to determine Which UI to return
  const renderListItem = ({ item }: { item: ListItemType }) => {
    switch (item.type) {
      case "button":
        //1. normalizing progress
        const progress = (item.lessonNumber - 1) / (item.totalLesson - 1);

        //2. full sine wave
        const offsetMultiplier = Math.sin(progress * Math.PI * 2);

        //3. Multiply by maximum amount of offset in dp
        const maxAmplitude = 60;
        const translateX = offsetMultiplier * maxAmplitude;

        return (
          //4. apply this dynamic transform to the list item
          <View style={[styles.row, { transform: [{ translateX }] }]}>
            <QuestButton onPress={() => console.log(`${item.id}`)} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={MOCK_DATA}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        // @ts-expect-error - React 19 typing conflict
        estimatedItemSize={90}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    width: "100%",
    alignItems: "center", //Centers the button initially
  },
  listContent: {
    paddingTop: 50,
    paddingBottom: 150, // This is here so the last list item will not be blocked by the bottom nav
  },
});
