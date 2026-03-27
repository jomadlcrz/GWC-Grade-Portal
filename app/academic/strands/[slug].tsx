import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuOverlay } from "@/components/menu-overlay";
import { SearchOverlay } from "@/components/search-overlay";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing } = AppTheme;

const strandContent = {
  "accountancy-business-and-management": {
    title: "ACCOUNTANCY, BUSINESS AND MANAGEMENT",
  },
  "humanities-and-social-sciences": {
    title: "HUMANITIES AND SOCIAL SCIENCES",
  },
  "science-technology-engineering-and-mathematics": {
    title: "SCIENCE, TECHNOLOGY, ENGINEERING AND MATHEMATICS",
  },
  "technical-vocational-livelihood": {
    title: "TECHNICAL-VOCATIONAL-LIVELIHOOD",
  },
} as const;

type StrandSlug = keyof typeof strandContent;

export default function StrandDetailScreen() {
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug;
  const strand =
    resolvedSlug && resolvedSlug in strandContent
      ? strandContent[resolvedSlug as StrandSlug]
      : null;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Header
        hideAnnouncementsIcon
        onSearchPress={() => setIsSearchOpen(true)}
        onMenuPress={() => setIsMenuOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ACADEMICS | STRANDS</Text>
          <Text style={styles.heroTitle}>{strand?.title ?? "STRAND NOT FOUND"}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.paragraph}>
            {strand
              ? "Details for this academic strand will be added soon."
              : "The requested strand page is not available yet."}
          </Text>
        </View>

        <Footer bottomInset={insets.bottom} />
      </ScrollView>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MenuOverlay visible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    backgroundColor: colors.surface,
  },
  hero: {
    backgroundColor: "#494646",
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 34,
    gap: spacing.sm,
  },
  eyebrow: {
    color: "#d8d8dd",
    fontSize: 13,
    fontFamily: FontFamilies.accentBold,
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: FontFamilies.headingBold,
    textTransform: "uppercase",
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#eef1f6",
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamilies.body,
    textAlign: "justify",
  },
});
