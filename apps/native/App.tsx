import "@vaariance/ui/styles.css";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text } from "@vaariance/ui";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
