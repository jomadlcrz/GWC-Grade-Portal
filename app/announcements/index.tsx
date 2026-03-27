import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing, typography } = AppTheme;

export default function AnnouncementsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const announcementList = useMemo(() => Object.values(announcements), []);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      {/* Keep the global header branding; do not rename */}
      <Header
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
          <Text style={styles.heroTitle}>ANNOUNCEMENTS</Text>
          <FontAwesome5
            name="bullhorn"
            size={typography.title + 6}
            color={colors.primary}
            style={styles.heroIcon}
          />
        </View>

        <View style={styles.noRecent}>
          <Text style={styles.noRecentText}>No Recent</Text>
          <Text style={styles.noRecentText}>Announcement Found</Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>Other Announcements:</Text>
        </View>

        <View style={styles.list}>
          {announcementList.map((item) => (
            <View key={item.slug} style={styles.card}>
              <View style={styles.cardImageWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />
              </View>

              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.metaRow}>
                <FontAwesome5
                  name="clock"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={styles.date}>Posted: {item.date}</Text>
              </View>

              <Text style={styles.body}>{item.summary}</Text>

              <View style={styles.cardFooter}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push(`/post/${item.slug}`)}
                  // @ts-ignore hovered is web-only; pressed covers mobile
                  style={styles.readMoreRow}
                >
                  {({ hovered, pressed }) => (
                    <>
                      <Text
                        style={[
                          styles.readMoreText,
                          (hovered || pressed) && styles.readMoreTextActive,
                        ]}
                      >
                        Read More
                      </Text>
                      <AnimatedIconShift
                        active={hovered || pressed}
                        style={styles.readMoreIcon}
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
    gap: spacing.md,
    backgroundColor: colors.surface,
  },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    marginTop: 48,
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.primary,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  heroIcon: {
    paddingLeft: spacing.sm,
  },
  noRecent: {
    backgroundColor: colors.primary,
    paddingVertical: 40,
    paddingHorizontal: 40,
    gap: spacing.xs,
  },
  noRecentText: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  sectionHeading: {
    paddingHorizontal: 40,
    paddingTop: spacing.md,
  },
  sectionHeadingText: {
    fontSize: 32,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.textPrimary,
  },
  list: {
    gap: spacing.md,
    paddingHorizontal: 40,
    paddingBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.md + spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  cardImageWrapper: {
    height: 140,
    marginHorizontal: -spacing.md,
    marginTop: 0,
    marginBottom: spacing.md,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: "hidden",
    backgroundColor: colors.mutedSurface,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: FontFamilies.accent,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.body + 1,
    fontFamily: FontFamilies.body,
    color: colors.textSecondary,
    lineHeight: typography.body + 6,
  },
  cardFooter: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    alignItems: "flex-end",
  },
  readMoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    alignSelf: "flex-end",
  },
  readMoreText: {
    fontSize: 16,
    fontFamily: FontFamilies.headingBold,
    color: colors.primary,
  },
  readMoreTextActive: {
    color: colors.textPrimary,
  },
  readMoreIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
