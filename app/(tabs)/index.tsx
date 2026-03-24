import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

// Logic & Types
import { transformUnitsToLayout } from "../../src/logic/homeTransformer";
import { RAW_UNITS } from "../../src/data/rawLessons";
import { HomeListItem } from "../../src/types/home";

// Components
import QuestButton from "../../components/QuestButton";
import UnitDivider from "../../components/UnitDivider";
import CharacterNode from "../../components/CharacterNode";

export default function HomeScreen() {
  // Memoize the layout
  const flatListData = useMemo(
    () => transformUnitsToLayout(RAW_UNITS),
    [], // Empty dependency means it runs once on mount
  );

  //temporary function
  const handlePress = useCallback(() => {
    console.log("button pressed");
  }, []);

  const renderListItem = ({ item }: { item: HomeListItem }) => {
    switch (item.type) {
      case "divider":
        return <UnitDivider title={item.title} />;

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
            <QuestButton
              state={item.state}
              unitIndex={item.unitIndex}
              onPress={handlePress}
            />
          </View>
        );

      case "character":
        return <CharacterNode offsetX={item.offsetX} />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={flatListData}
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
