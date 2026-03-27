import { Image } from "expo-image";
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
import { announcements } from "@/constants/announcements";
import { posts } from "@/constants/posts";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors } = AppTheme;

type PostSlug = keyof typeof posts;
type AnnouncementSlug = keyof typeof announcements;

export default function PostDetailScreen() {
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug;
  const post =
    resolvedSlug && resolvedSlug in posts ? posts[resolvedSlug as PostSlug] : null;
  const announcement =
    !post && resolvedSlug && resolvedSlug in announcements
      ? announcements[resolvedSlug as AnnouncementSlug]
      : null;
  const entry = post ?? announcement;

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
        <View style={styles.body}>
          {entry ? (
            <>
              <Image
                source={{ uri: entry.image }}
                style={styles.banner}
                contentFit="cover"
              />
              <Text style={styles.postTitle}>{entry.title}</Text>
              {"date" in entry ? (
                <Text style={styles.metaText}>Posted: {entry.date}</Text>
              ) : null}
              {entry.body.map((paragraph) => (
                <Text key={paragraph} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}
            </>
          ) : (
            <Text style={styles.paragraph}>
              The requested post could not be found.
            </Text>
          )}
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
  body: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 20,
    backgroundColor: "#eef1f6",
  },
  banner: {
    width: "100%",
    height: 220,
    backgroundColor: colors.border,
  },
  postTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: FontFamilies.headingBold,
    textTransform: "uppercase",
  },
  metaText: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamilies.accent,
  },
  paragraph: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: FontFamilies.body,
    textAlign: "justify",
  },
});
