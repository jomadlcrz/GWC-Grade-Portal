import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AppTheme } from "@/constants/theme";

const { colors } = AppTheme;
const HERO_HEIGHT = 220;
const HEADER_HEIGHT = 98;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const heroHeight = Platform.OS === "web" ? windowHeight : HERO_HEIGHT;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (offsetY: number) => {
    const shouldUseStickyStyle =
      offsetY >= heroHeight - HEADER_HEIGHT - insets.top;
    if (shouldUseStickyStyle !== isScrolled) {
      setIsScrolled(shouldUseStickyStyle);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
      >
        <View style={[styles.heroSection, { height: heroHeight }]}>
          <Image
            source={require("@/storage/cover_image/cover_sample.jpg")}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.content}>{/* Main content goes here */}</View>
        <Footer />
      </ScrollView>

      <View style={styles.fixedHeader}>
        <Header mode={isScrolled ? "sticky" : "overlay"} />
      </View>
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
  heroSection: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  fixedHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
