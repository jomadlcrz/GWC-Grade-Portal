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
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing } = AppTheme;

const facultyContent = {
  ias: {
    "gracia-t-canlas": {
      name: "Gracia T. Canlas LPT, MAEd",
      role: "FULL-TIME FACULTY",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    "michael-r-dela-cruz": {
      name: "Michael R. Dela Cruz, MSc",
      role: "PROGRAM COORDINATOR",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
  },
  ibce: {
    "angela-p-navarro": {
      name: "Angela P. Navarro, MBA",
      role: "FULL-TIME FACULTY",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    },
    "rosemarie-l-santos": {
      name: "Rosemarie L. Santos, MAEd",
      role: "DEPARTMENT CHAIR",
      photo:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
    },
  },
  ihtm: {
    "patricia-m-flores": {
      name: "Patricia M. Flores, MHM",
      role: "FULL-TIME FACULTY",
      photo:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    },
    "leonard-g-ramos": {
      name: "Leonard G. Ramos, MBA",
      role: "PRACTICUM COORDINATOR",
      photo:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=600&q=80",
    },
  },
  ite: {
    "john-r-dela-cruz": {
      name: "John R. Dela Cruz, MIT",
      role: "FULL-TIME FACULTY",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
    "andrea-p-navarro": {
      name: "Andrea P. Navarro, MA Science",
      role: "LABORATORY INSTRUCTOR",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    },
  },
} as const;

type DepartmentKey = keyof typeof facultyContent;

export default function FacultyDetailScreen() {
  const insets = useSafeAreaInsets();
  const { department, faculty } = useLocalSearchParams<{
    department?: string | string[];
    faculty?: string | string[];
  }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resolvedDepartment = Array.isArray(department)
    ? department[0]
    : department;
  const resolvedFaculty = Array.isArray(faculty) ? faculty[0] : faculty;

  const facultyProfile =
    resolvedDepartment &&
    resolvedDepartment in facultyContent &&
    resolvedFaculty &&
    resolvedFaculty in facultyContent[resolvedDepartment as DepartmentKey]
      ? facultyContent[resolvedDepartment as DepartmentKey][
          resolvedFaculty as keyof (typeof facultyContent)[DepartmentKey]
        ]
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
          <Text style={styles.heroTitle}>ACADEMICS | FACULTY</Text>
        </View>

        <View style={styles.body}>
          {facultyProfile ? (
            <View style={styles.profileCard}>
              <Image
                source={{ uri: facultyProfile.photo }}
                style={styles.profilePhoto}
                contentFit="cover"
              />
              <Text style={styles.name}>{facultyProfile.name}</Text>
              <Text style={styles.role}>{facultyProfile.role}</Text>
            </View>
          ) : (
            <Text style={styles.fallbackText}>
              The requested faculty profile is not available yet.
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
  body: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#eef1f6",
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 10,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#cdd5df",
  },
  name: {
    color: "#c21f2f",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FontFamilies.accent,
    textAlign: "center",
  },
  role: {
    color: "#555555",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FontFamilies.bodySemi,
    textAlign: "center",
    textTransform: "uppercase",
  },
  fallbackText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamilies.body,
    textAlign: "center",
  },
});
