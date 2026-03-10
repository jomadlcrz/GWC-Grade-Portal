import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { AppTheme } from "@/constants/theme";

const { colors } = AppTheme;

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stickyHeader}>
          <Header />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stickyHeader: {
    backgroundColor: colors.pageBackground,
  },
});
