import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppTheme, FontFamilies } from "@/constants/theme";

type SearchItem = {
  id: string;
  title: string;
  snippet: string;
  category: string;
  date: string;
};

const { colors, spacing, typography } = AppTheme;

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const data = useMemo<SearchItem[]>(
    () => [
      {
        id: "summer-2026-enrollment",
        title: "Summer Term Enrollment Opens",
        snippet:
          "Enrollment for Summer 2026 starts on March 25. Please settle outstanding balances before proceeding.",
        category: "Announcements",
        date: "March 16, 2026",
      },
      {
        id: "library-maintenance",
        title: "Library System Maintenance",
        snippet:
          "Online library access will be unavailable on March 20 from 1:00 AM to 4:00 AM for scheduled upgrades.",
        category: "Announcements",
        date: "March 16, 2026",
      },
      {
        id: "graduation-rehearsal",
        title: "Graduation Rehearsal Schedule",
        snippet:
          "Rehearsals for graduating students will be held on April 5 at the main auditorium. Attendance is mandatory.",
        category: "Announcements",
        date: "March 15, 2026",
      },
      {
        id: "global-arena",
        title: "DAAD Hosts Info Session at GWC",
        snippet:
          "Insights on international academic exchange with partners across the globe.",
        category: "News",
        date: "March 10, 2026",
      },
      {
        id: "community-drive",
        title: "Student Council Service Drive",
        snippet:
          "Campus-wide initiative from the Student Council to support local communities.",
        category: "Community",
        date: "March 08, 2026",
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const keyword = query.trim().toLowerCase();
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.snippet.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword),
    );
  }, [data, query]);

  const handleSearch = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <View style={styles.logoRow}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/images/gwc-logo-new-white.png")}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.headerTitle}>GWC</Text>
              <Text style={styles.headerSubtitle}>Grade Portal</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close search"
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <FontAwesome5 name="times-circle" size={28} color="#e6e6e6" />
          </Pressable>
        </View>

        <View style={styles.headerAccent} />

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchBox}>
            <TextInput
              placeholder="type keyword(s) here"
              placeholderTextColor="#8b8b93"
              value={query}
              onChangeText={setQuery}
              style={styles.input}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Search"
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Search</Text>
              <FontAwesome5 name="search" size={18} color="#fff" />
            </Pressable>
          </View>

          {!query.trim() && (
            <Text style={styles.helperText}>
              Start typing to search announcements, news, and updates.
            </Text>
          )}

          {query.trim() && filtered.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="search" size={26} color="#777a80" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyBody}>
                Try different keywords or check spelling.
              </Text>
            </View>
          )}

          {filtered.length > 0 && (
            <View style={styles.results}>
              {filtered.map((item) => (
                <View key={item.id} style={styles.resultCard}>
                  <View style={styles.resultBadge}>
                    <Text style={styles.resultBadgeText}>{item.category}</Text>
                  </View>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultSnippet}>{item.snippet}</Text>
                  <View style={styles.resultMeta}>
                    <FontAwesome5 name="clock" size={12} color="#c7c7cf" />
                    <Text style={styles.resultDate}>{item.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const DARK_BG = "#0d1424";
const ACCENT = colors.primary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: spacing.md + spacing.xs,
    minHeight: 98,
    paddingRight: spacing.md + spacing.sm,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 66,
    height: 66,
  },
  textGroup: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: typography.title + 4,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    color: "#f5f5f5",
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
  },
  headerSubtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.accent,
    color: "#e0e6f4",
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
  },
  closeButton: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  headerAccent: {
    height: 3,
    backgroundColor: ACCENT,
  },
  content: {
    paddingHorizontal: spacing.lg + 8,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xl * 2,
    gap: spacing.xl,
  },
  searchBox: {
    alignItems: "center",
    gap: spacing.md + 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c2f36",
    backgroundColor: "#1a1c22",
    color: "#f8f8fa",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: typography.subtitle + 4,
    fontFamily: FontFamilies.body,
    textAlign: "center",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: ACCENT,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: typography.subtitle + 2,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
  },
  helperText: {
    color: "#b4b6be",
    textAlign: "center",
    fontSize: typography.subtitle + 2,
    fontFamily: FontFamilies.body,
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 12,
  },
  emptyTitle: {
    color: "#e1e1e6",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  emptyBody: {
    color: "#a9abb3",
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.body,
    textAlign: "center",
  },
  results: {
    gap: spacing.md,
  },
  resultCard: {
    backgroundColor: "#1a1c22",
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "#22252d",
    gap: spacing.sm,
  },
  resultBadge: {
    alignSelf: "flex-start",
    backgroundColor: ACCENT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  resultBadgeText: {
    color: "#fff",
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontFamily: FontFamilies.accentBold,
  },
  resultTitle: {
    color: "#f7f7fa",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.2,
  },
  resultSnippet: {
    color: "#cfd1d8",
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    fontFamily: FontFamilies.body,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  resultDate: {
    color: "#c7c7cf",
    fontSize: typography.caption + 1,
    fontFamily: FontFamilies.accent,
  },
});
