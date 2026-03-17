import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SearchOverlay } from "@/components/search-overlay";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing, typography } = AppTheme;

type SearchRecord = {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  keywords: string[];
};

const SEARCH_RECORDS: SearchRecord[] = [
  {
    id: "global-arena",
    title: "DAAD Hosts Info Session at GWC for International Academic Exchange",
    summary:
      "International academic exchange opportunities for students, faculty, and staff through partner institutions.",
    date: "March 18, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["daad", "exchange", "international", "academic", "global"],
  },
  {
    id: "community",
    title: "Student Council Launches Campus-Wide Service Drive",
    summary:
      "Student life, organizations, and collaboration spaces that keep the GWC family connected.",
    date: "March 18, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: [
      "student council",
      "service drive",
      "community",
      "organizations",
    ],
  },
  {
    id: "story-asean",
    title: "Student Delegates Join ASEAN Youth Forum",
    summary:
      "A featured student story about delegates representing GWC in a regional youth forum.",
    date: "March 17, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["asean", "youth forum", "delegates", "students"],
  },
  {
    id: "story-research-hub",
    title: "New Research Hub Opens for Engineering Cohort",
    summary:
      "A new research space opens to support engineering students and academic collaboration.",
    date: "March 17, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["research hub", "engineering", "cohort", "laboratory"],
  },
  {
    id: "events",
    title: "Events",
    summary:
      "Schedules, registration, and on-campus happenings collected in the events section.",
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    keywords: ["events", "schedule", "registration", "campus happenings"],
  },
  {
    id: "perspective",
    title: "Plastic Free Advocacy",
    summary:
      "A perspective piece on zero-waste plastic management and campus sustainability advocacy.",
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=1200&q=80",
    keywords: ["plastic free", "zero waste", "advocacy", "sustainability"],
  },
  {
    id: "careers",
    title: "Available Faculty Positions",
    summary:
      "Faculty openings including Instructor I, Instructor II, and Instructor III positions.",
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    keywords: ["careers", "faculty", "instructor", "vacant", "salary grade"],
  },
  {
    id: "announcement-summer-2026-enrollment",
    title: "Summer Term Enrollment Opens",
    summary:
      "Enrollment for Summer 2026 starts on March 25. Outstanding balances must be settled before proceeding.",
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["summer", "enrollment", "march 25", "balances"],
  },
  {
    id: "announcement-library-maintenance",
    title: "Library System Maintenance",
    summary:
      "Online library access will be unavailable on March 20 from 1:00 AM to 4:00 AM for scheduled upgrades.",
    date: "March 16, 2026",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
    keywords: ["library", "maintenance", "system", "march 20", "upgrades"],
  },
  {
    id: "announcement-graduation-rehearsal",
    title: "Graduation Rehearsal Schedule",
    summary:
      "Graduating students will rehearse on April 5 at the main auditorium, with attendance marked mandatory.",
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    keywords: ["graduation", "rehearsal", "april 5", "auditorium"],
  },
];

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search",
  autoFocus = false,
}: SearchBarProps) {
  const handleSubmit = () => {
    onSubmit?.();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.searchRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Submit search"
        style={({ pressed }) => [
          styles.searchButton,
          pressed && styles.searchButtonPressed,
        ]}
        onPress={handleSubmit}
      >
        <FontAwesome5 name="search" size={28} color={colors.surface} />
      </Pressable>
    </View>
  );
}

type TablePanelProps = {
  hasSearched: boolean;
  searchedQuery: string;
  results: SearchRecord[];
};

function TablePanel({ hasSearched, searchedQuery, results }: TablePanelProps) {
  return (
    <View style={styles.tablePanel}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Search Results</Text>
      </View>

      <View style={styles.tableContent}>
        {!hasSearched ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Enter a keyword, then press search to view matching content.
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              No results found for &quot;{searchedQuery}&quot;.
            </Text>
          </View>
        ) : (
          <View style={styles.resultsList}>
            <Text style={styles.resultsCount}>
              {results.length} result{results.length === 1 ? "" : "s"} for{" "}
              &quot;{searchedQuery}&quot;
            </Text>

            {results.map((result) => (
              <View key={result.id} style={styles.resultCard}>
                <View style={styles.resultImageWrapper}>
                  <Image
                    source={{ uri: result.image }}
                    style={StyleSheet.absoluteFillObject}
                    contentFit="cover"
                  />
                </View>

                <Text style={styles.resultTitle}>{result.title}</Text>
                <View style={styles.resultMetaRow}>
                  <FontAwesome5
                    name="clock"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.resultDate}>Posted: {result.date}</Text>
                </View>
                <Text style={styles.resultSummary}>{result.summary}</Text>

                <View style={styles.resultFooter}>
                  <Text style={styles.resultReadMore}>Read More</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ query?: string | string[] }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");

  useEffect(() => {
    const routeQuery = Array.isArray(params.query)
      ? (params.query[0] ?? "")
      : (params.query ?? "");

    const trimmedRouteQuery = routeQuery.trim();

    if (!trimmedRouteQuery) {
      return;
    }

    setQuery(trimmedRouteQuery);
    setSearchedQuery(trimmedRouteQuery);
  }, [params.query]);

  const horizontalPadding = width < 400 ? 20 : 40;

  const results = useMemo(() => {
    if (!searchedQuery) {
      return [];
    }

    const normalizedTerms = searchedQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return SEARCH_RECORDS.filter((record) => {
      const haystack = [
        record.title,
        record.summary,
        record.date,
        ...record.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return normalizedTerms.every((term) => haystack.includes(term));
    });
  }, [searchedQuery]);

  const handleSearch = () => {
    setSearchedQuery(query.trim());
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Header
        hideAnnouncementsIcon
        onSearchPress={() => setIsSearchOpen(true)}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.landingSection,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSearch}
            placeholder="Search"
          />
        </View>

        <View style={{ paddingHorizontal: horizontalPadding }}>
          <TablePanel
            hasSearched={searchedQuery.length > 0}
            searchedQuery={searchedQuery}
            results={results}
          />
        </View>

        <Footer bottomInset={insets.bottom} />
      </ScrollView>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  content: {
    backgroundColor: colors.pageBackground,
    paddingBottom: 0,
  },
  landingSection: {
    paddingVertical: 40,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 80,
    width: "100%",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    paddingHorizontal: spacing.lg,
    fontSize: 20,
    fontFamily: FontFamilies.body,
    color: colors.textPrimary,
  },
  searchButton: {
    width: 80,
    flexShrink: 0,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  tablePanel: {
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tableHeader: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.pageBackground,
  },
  tableHeaderText: {
    fontSize: 24,
    fontFamily: FontFamilies.bodyBold,
    color: colors.textPrimary,
  },
  tableContent: {
    padding: spacing.xl,
    minHeight: 200,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
  },
  messageText: {
    fontSize: 20,
    fontFamily: FontFamilies.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 28,
  },
  resultsList: {
    gap: spacing.md,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: FontFamilies.accent,
    color: colors.textSecondary,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.md + spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  resultImageWrapper: {
    height: 140,
    marginHorizontal: -spacing.md,
    marginBottom: spacing.md,
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
    overflow: "hidden",
    backgroundColor: colors.mutedSurface,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: FontFamilies.headingBold,
    color: colors.textPrimary,
  },
  resultDate: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: FontFamilies.accent,
  },
  resultMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  resultSummary: {
    fontSize: typography.body + 1,
    fontFamily: FontFamilies.body,
    color: colors.textSecondary,
    lineHeight: typography.body + 6,
  },
  resultFooter: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    alignItems: "flex-end",
  },
  resultReadMore: {
    fontSize: 16,
    fontFamily: FontFamilies.headingBold,
    color: colors.primary,
  },
});
