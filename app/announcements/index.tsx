import { FontAwesome5 } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AppTheme, FontFamilies } from "@/constants/theme";

type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string;
};

const { colors, spacing, typography } = AppTheme;

export default function AnnouncementsScreen() {
  const insets = useSafeAreaInsets();

  const announcements = useMemo<Announcement[]>(
    () => [
      {
        id: "summer-2026-enrollment",
        title: "Summer Term Enrollment Opens",
        body: "Enrollment for Summer 2026 starts on March 25. Please settle outstanding balances before proceeding.",
        date: "March 16, 2026",
      },
      {
        id: "library-maintenance",
        title: "Library System Maintenance",
        body: "Online library access will be unavailable on March 20 from 1:00 AM to 4:00 AM for scheduled upgrades.",
        date: "March 16, 2026",
      },
      {
        id: "graduation-rehearsal",
        title: "Graduation Rehearsal Schedule",
        body: "Rehearsals for graduating students will be held on April 5 at the main auditorium. Attendance is mandatory.",
        date: "March 15, 2026",
      },
    ],
    [],
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.container}
    >
      {/* Keep the global header branding; do not rename */}
      <Header />

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
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          ))}
        </View>

        <Footer bottomInset={insets.bottom} />
      </ScrollView>
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
    fontSize: typography.title + 10,
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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  noRecentText: {
    color: colors.surface,
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  sectionHeading: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  sectionHeadingText: {
    fontSize: typography.title - 2,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.textPrimary,
  },
  list: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  date: {
    fontSize: typography.caption + 1,
    color: colors.textSecondary,
    letterSpacing: 0.2,
    fontFamily: FontFamilies.accent,
  },
  title: {
    fontSize: typography.subtitle + 2,
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
});
