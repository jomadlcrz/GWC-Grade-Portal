import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
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
import { AppTheme, FontFamilies } from "@/constants/theme";

type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string;
  image: string;
  link?: string;
};

const { colors, spacing, typography } = AppTheme;

export default function AnnouncementsScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const announcements = useMemo<Announcement[]>(
    () => [
      {
        id: "summer-2026-enrollment",
        title: "Summer Term Enrollment Opens",
        body: "Enrollment for Summer 2026 starts on March 25. Please settle outstanding balances before proceeding.",
        date: "March 16, 2026",
        image:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
        link: "#",
      },
      {
        id: "library-maintenance",
        title: "Library System Maintenance",
        body: "Online library access will be unavailable on March 20 from 1:00 AM to 4:00 AM for scheduled upgrades.",
        date: "March 16, 2026",
        image:
          "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
        link: "#",
      },
      {
        id: "graduation-rehearsal",
        title: "Graduation Rehearsal Schedule",
        body: "Rehearsals for graduating students will be held on April 5 at the main auditorium. Attendance is mandatory.",
        date: "March 15, 2026",
        image:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
        link: "#",
      },
    ],
    [],
  );

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
          {announcements.map((item) => (
            <View key={item.id} style={styles.card}>
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

              <Text style={styles.body}>{item.body}</Text>

              <View style={styles.cardFooter}>
                <Pressable
                  accessibilityRole="button"
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
                      <FontAwesome5
                        name="arrow-right"
                        size={14}
                        color={hovered || pressed ? colors.textPrimary : colors.primary}
                        style={[
                          styles.readMoreIcon,
                          (hovered || pressed) && styles.readMoreIconActive,
                        ]}
                      />
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
    fontSize: 24,
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
    paddingHorizontal: spacing.lg,
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
    borderRadius: spacing.md,
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
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
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
    transform: [{ translateX: 0 }],
  },
  readMoreIconActive: {
    transform: [{ translateX: 4 }],
  },
});
