import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { MenuOverlay } from "@/components/menu-overlay";
import { SearchOverlay } from "@/components/search-overlay";
import { AnimatedIconShift } from "@/components/animated-icon-shift";
import { announcements } from "@/constants/announcements";
import { posts } from "@/constants/posts";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing, typography } = AppTheme;

type SearchRecord = {
  id: string;
  title: string;
  summary: string;
  date?: string;
  image: string;
  keywords: string[];
  route: string;
};

const STATIC_SEARCH_RECORDS: SearchRecord[] = [
  {
    id: "events",
    title: "Events",
    summary:
      "Schedules, registration, and on-campus happenings collected in the events section.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    keywords: ["events", "schedule", "registration", "campus happenings"],
    route: "/",
  },
  {
    id: "careers",
    title: "Available Faculty Positions",
    summary:
      "Faculty openings including Instructor I, Instructor II, and Instructor III positions.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    keywords: ["careers", "faculty", "instructor", "vacant", "salary grade"],
    route: "/",
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
  onResultPress: (route: string) => void;
};

function TablePanel({
  hasSearched,
  searchedQuery,
  results,
  onResultPress,
}: TablePanelProps) {
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
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => onResultPress(result.route)}
                    // @ts-ignore hovered is web-only; pressed covers mobile
                    style={styles.resultReadMoreRow}
                  >
                    {({ hovered, pressed }) => (
                      <>
                        <Text
                          style={[
                            styles.resultReadMoreText,
                            (hovered || pressed) && styles.resultReadMoreTextActive,
                          ]}
                        >
                          Read More
                        </Text>
                        <AnimatedIconShift
                          active={hovered || pressed}
                          style={styles.resultReadMoreIcon}
                        >
                          <FontAwesome5
                            name="arrow-right"
                            size={14}
                            color={
                              hovered || pressed
                                ? colors.textPrimary
                                : colors.primary
                            }
                          />
                        </AnimatedIconShift>
                      </>
                    )}
                  </Pressable>
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
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string | string[] }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  const searchRecords = useMemo<SearchRecord[]>(() => {
    const postRecords = Object.values(posts).map((post) => ({
      id: post.slug,
      title: post.title,
      summary: post.summary,
      image: post.image,
      keywords: [
        post.category.toLowerCase(),
        ...post.title.toLowerCase().split(/\s+/),
        ...post.summary.toLowerCase().split(/\s+/),
      ],
      route: `/post/${post.slug}`,
    }));

    const announcementRecords = Object.values(announcements).map(
      (announcement) => ({
        id: announcement.slug,
        title: announcement.title,
        summary: announcement.summary,
        date: announcement.date,
        image: announcement.image,
        keywords: [
          "announcement",
          ...announcement.title.toLowerCase().split(/\s+/),
          ...announcement.summary.toLowerCase().split(/\s+/),
        ],
        route: `/post/${announcement.slug}`,
      }),
    );

    return [...postRecords, ...announcementRecords, ...STATIC_SEARCH_RECORDS];
  }, []);

  const results = useMemo(() => {
    if (!searchedQuery) {
      return [];
    }

    const normalizedTerms = searchedQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return searchRecords.filter((record) => {
      const haystack = [
        record.title,
        record.summary,
        record.date ?? "",
        ...record.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return normalizedTerms.every((term) => haystack.includes(term));
    });
  }, [searchRecords, searchedQuery]);

  const handleSearch = () => {
    setSearchedQuery(query.trim());
  };

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={styles.container}
    >
      <Header
        hideAnnouncementsIcon
        onSearchPress={() => setIsSearchOpen(true)}
        onMenuPress={() => setIsMenuOpen(true)}
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
            onResultPress={(route) => router.push(route as never)}
          />
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
  resultReadMoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultReadMoreText: {
    fontSize: 16,
    fontFamily: FontFamilies.headingBold,
    color: colors.primary,
  },
  resultReadMoreTextActive: {
    color: colors.textPrimary,
  },
  resultReadMoreIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
