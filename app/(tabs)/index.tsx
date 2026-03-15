import React from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import QuestButton from "../../components/QuestButton";
import { lessonData, ButtonNode } from "../../src/data/mockData";

export type ListItemType = ButtonNode;

const MOCK_DATA: ListItemType[] = lessonData;

export default function HomeScreen() {
  const renderListItem = ({ item }: { item: ListItemType }) => {
    switch (item.type) {
      case "button":
        return (
          <View
            style={[
              styles.row,
              {
                height: item.rowHeight,
                transform: [{ translateX: item.offsetX }],
              },
            ]}
          >
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
        estimatedItemSize={105}
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
    alignItems: "center",
  },
  listContent: {
    paddingTop: 50,
    paddingBottom: 150,
  },
});
