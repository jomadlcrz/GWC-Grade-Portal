import { FontAwesome5 } from "@expo/vector-icons";
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

const { colors, spacing, typography } = AppTheme;

const facultyMembers = [
  {
    name: "Prof. Maria L. Santos, MAEd",
    department: "Teacher Education",
    expertise: "Curriculum Development and Classroom Assessment",
    icon: "chalkboard-teacher" as const,
  },
  {
    name: "Prof. John R. Dela Cruz, MIT",
    department: "Information Technology",
    expertise: "Web Systems and Database Management",
    icon: "laptop-code" as const,
  },
  {
    name: "Prof. Angela P. Navarro, MBA",
    department: "Business Administration",
    expertise: "Marketing Strategy and Entrepreneurship",
    icon: "briefcase" as const,
  },
  {
    name: "Prof. Carlo M. Reyes, MSc Criminology",
    department: "Criminology",
    expertise: "Criminal Investigation and Community Safety",
    icon: "balance-scale" as const,
  },
];

const departmentTabs = ["IAS", "IBCE", "IHTM", "ITE"] as const;

export default function FacultiesScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Text style={styles.heroTitle}>ACADEMICS | FACULTY</Text>
        </View>

        <View style={styles.departmentNav}>
          <View style={styles.departmentNavLine} />
          {departmentTabs.map((department, index) => (
            <View key={department} style={styles.departmentNavItem}>
              <Text
                style={[
                  styles.departmentNavText,
                  index === 0 && styles.departmentNavTextActive,
                ]}
              >
                {department}
              </Text>
              {index === 0 ? <View style={styles.departmentNavUnderline} /> : null}
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Faculty Directory</Text>
          <Text style={styles.sectionText}>
            This page uses placeholder faculty entries for the menu link.
          </Text>
        </View>

        <View style={styles.grid}>
          {facultyMembers.map((faculty) => (
            <View key={faculty.name} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.iconWrap}>
                  <FontAwesome5
                    name={faculty.icon}
                    size={18}
                    color={colors.surface}
                  />
                </View>
                <Text style={styles.department}>{faculty.department}</Text>
              </View>

              <Text style={styles.name}>{faculty.name}</Text>
              <Text style={styles.expertise}>{faculty.expertise}</Text>
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
    backgroundColor: colors.surface,
  },
  hero: {
    backgroundColor: "#494646",
    paddingHorizontal: 28,
    paddingTop: 44,
    paddingBottom: 36,
    gap: spacing.sm,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 38,
    fontFamily: FontFamilies.heading,
    textTransform: "uppercase",
    lineHeight: 42,
    textAlign: "center",
  },
  departmentNav: {
    backgroundColor: "#eef1f6",
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 26,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "relative",
  },
  departmentNavLine: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 26,
    height: 1,
    backgroundColor: "#cfd6df",
  },
  departmentNavItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  departmentNavText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: FontFamilies.accentBold,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 18,
  },
  departmentNavTextActive: {
    color: colors.textPrimary,
  },
  departmentNavUnderline: {
    width: "100%",
    height: 4,
    backgroundColor: "#3e3e3e",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
    gap: 6,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontFamily: FontFamilies.headingBold,
  },
  sectionText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    fontFamily: FontFamilies.body,
  },
  grid: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 14,
  },
  card: {
    backgroundColor: "#f7f9fc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 10,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  department: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: FontFamilies.accentBold,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: FontFamilies.headingBold,
  },
  expertise: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FontFamilies.body,
  },
});
