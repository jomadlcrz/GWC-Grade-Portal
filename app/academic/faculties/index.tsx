import { Image } from "expo-image";
import { useState } from "react";
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

const { colors, spacing } = AppTheme;

const departmentTabs = ["IAS", "IBCE", "IHTM", "ITE"] as const;
type DepartmentTab = (typeof departmentTabs)[number];

const departmentContent: Record<
  DepartmentTab,
  {
    title: string;
    logo: string;
    facultyMembers: { name: string; role: string; photo: string }[];
  }
> = {
  IAS: {
    title: "INSTITUTE OF ARTS,\nSCIENCES ACADEMIC\nSTAFF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Atom_icon.svg/512px-Atom_icon.svg.png",
    facultyMembers: [
      {
        name: "Gracia T. Canlas LPT, MAEd",
        role: "FULL-TIME FACULTY",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Michael R. Dela Cruz, MSc",
        role: "PROGRAM COORDINATOR",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  IBCE: {
    title: "INSTITUTE OF BUSINESS\nAND COMMUNITY EDUCATION\nSTAFF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/OOjs_UI_icon_userGroup-ltr-progressive.svg/512px-OOjs_UI_icon_userGroup-ltr-progressive.svg.png",
    facultyMembers: [
      {
        name: "Angela P. Navarro, MBA",
        role: "FULL-TIME FACULTY",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Rosemarie L. Santos, MAEd",
        role: "DEPARTMENT CHAIR",
        photo:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  IHTM: {
    title: "INSTITUTE OF HOSPITALITY,\nTOURISM AND MANAGEMENT\nSTAFF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Globe_icon-icons.com_52837.png/512px-Globe_icon-icons.com_52837.png",
    facultyMembers: [
      {
        name: "Patricia M. Flores, MHM",
        role: "FULL-TIME FACULTY",
        photo:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Leonard G. Ramos, MBA",
        role: "PRACTICUM COORDINATOR",
        photo:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  ITE: {
    title: "INSTITUTE OF TECHNOLOGY\nEDUCATION ACADEMIC\nSTAFF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Icon_gear.svg/512px-Icon_gear.svg.png",
    facultyMembers: [
      {
        name: "John R. Dela Cruz, MIT",
        role: "FULL-TIME FACULTY",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Andrea P. Navarro, MA Science",
        role: "LABORATORY INSTRUCTOR",
        photo:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
};

export default function FacultiesScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<DepartmentTab>("IAS");
  const activeContent = departmentContent[activeDepartment];

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
            <Pressable
              key={department}
              accessibilityRole="button"
              accessibilityLabel={`Show ${department} faculty`}
              onPress={() => setActiveDepartment(department)}
              style={({ pressed }) => [
                styles.departmentNavItem,
                pressed && styles.departmentNavItemPressed,
              ]}
            >
              <Text
                style={[
                  styles.departmentNavText,
                  activeDepartment === department &&
                    styles.departmentNavTextActive,
                ]}
              >
                {department}
              </Text>
              {activeDepartment === department ? (
                <View style={styles.departmentNavUnderline} />
              ) : null}
            </Pressable>
          ))}
        </View>

        <View style={styles.instituteHero}>
          <View style={styles.logoShell}>
            <Image
              source={{ uri: activeContent.logo }}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
          <Text style={styles.instituteTitle}>{activeContent.title}</Text>
        </View>

        <View style={styles.grid}>
          {activeContent.facultyMembers.map((faculty) => (
            <View key={faculty.name} style={styles.card}>
              <Image
                source={{ uri: faculty.photo }}
                style={styles.facultyPhoto}
                contentFit="cover"
              />
              <Text style={styles.name}>{faculty.name}</Text>
              <Text style={styles.role}>{faculty.role}</Text>
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
  departmentNavItemPressed: {
    opacity: 0.8,
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
  instituteHero: {
    alignItems: "center",
    paddingTop: 34,
    paddingHorizontal: 24,
    paddingBottom: 46,
    backgroundColor: "#eef1f6",
  },
  logoShell: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.surface,
    borderWidth: 6,
    borderColor: "#6a4a4a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    overflow: "hidden",
  },
  logoImage: {
    width: 110,
    height: 110,
  },
  instituteTitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 34,
    fontFamily: FontFamilies.headingBold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  grid: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 18,
    backgroundColor: "#eef1f6",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: "center",
    gap: 8,
  },
  facultyPhoto: {
    width: 126,
    height: 126,
    borderRadius: 63,
    marginBottom: 10,
    backgroundColor: "#cdd5df",
  },
  name: {
    color: "#c21f2f",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamilies.accent,
    textAlign: "center",
  },
  role: {
    color: "#555555",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FontFamilies.bodySemi,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
