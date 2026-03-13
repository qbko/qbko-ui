import { Tabs } from "expo-router";

import BottomNav from "../../components/BottomNav";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="detail" options={{ title: "Detail" }} />
    </Tabs>
  );
}
