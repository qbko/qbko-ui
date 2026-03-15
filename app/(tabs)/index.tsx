import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import QuestButton from "../../components/QuestButton";
import { lessonData, ButtonNode } from "../../src/data/mockData";

import { getButtonOffset } from "../../src/utils/pathMath";

// Union type for the list
export type ListItemType = ButtonNode;

// Mock Data
const MOCK_DATA: ListItemType[] = lessonData;

export default function HomeScreen() {
  //Render Function
  // Evaluates the type property to determine Which UI to return
  const renderListItem = ({ item }: { item: ListItemType }) => {
    switch (item.type) {
      case "button":
        const translateX = getButtonOffset(
          item.lessonNumber,
          item.totalLesson,
          100,
        );

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
