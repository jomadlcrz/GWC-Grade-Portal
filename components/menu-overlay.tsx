import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppTheme, FontFamilies } from "@/constants/theme";
import { OverlayHeader } from "./overlay-header";
import { OverlayShell } from "./overlay-shell";

type MenuOverlayProps = {
  visible: boolean;
  onClose: () => void;
};

const { colors, spacing, typography } = AppTheme;
const DARK_BG = "#0d1424";
const ACCENT = colors.primary;

const academicGroups = [
  {
    key: "programs",
    label: "PROGRAMS",
    items: [
      "Bachelor of Science in Criminology (BSCrim)",
      "Bachelor of Science in Information Technology (BSIT)",
      "Bachelor of Science in Computer Science (BSCS)",
      "Associate in Computer Science (ACS) - 2-Year Program",
      "Bachelor of Science in Business Administration (BSBA)",
      "Major in Marketing Management",
      "Bachelor of Elementary Education (BEEd)",
      "Bachelor of Secondary Education (BSEd)",
    ],
  },
  {
    key: "strands",
    label: "STRANDS",
    items: [
      "Accountancy, Business and Management (ABM)",
      "Humanities and Social Sciences (HUMSS)",
      "Science, Technology, Engineering and Mathematics (STEM)",
      "Technical-Vocational-Livelihood (TVL)",
    ],
  },
  {
    key: "faculty",
    label: "FACULTY",
    route: "/academic/faculties",
    items: [
      "Prof. Maria L. Santos, MAEd",
      "Prof. John R. Dela Cruz, MIT",
      "Prof. Angela P. Navarro, MBA",
      "Prof. Carlo M. Reyes, MSc Criminology",
    ],
  },
  {
    key: "special-programs",
    label: "SPECIAL PROGRAMS",
    items: ["Professional Education Unit Earner (PEUE)"],
  },
] as const;

export function MenuOverlay({ visible, onClose }: MenuOverlayProps) {
  const router = useRouter();
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [openAcademicGroup, setOpenAcademicGroup] = useState<string | null>(
    null,
  );

  const menuItems = useMemo(
    () => [
      { key: "academics", label: "ACADEMICS" },
      { key: "campus", label: "IN CAMPUS" },
      { key: "admission", label: "ADMISSION AND AID" },
      { key: "community", label: "GWC AND THE COMMUNITY" },
      { key: "sustainability", label: "SUSTAINABILITY" },
      { key: "about", label: "ABOUT GWC" },
      { key: "downloads", label: "DOWNLOADS" },
    ],
    [],
  );

  const handleHome = () => {
    onClose();
    router.push("/");
  };

  return (
    <OverlayShell
      visible={visible}
      onClose={onClose}
      backgroundColor={DARK_BG}
      safeAreaStyle={styles.safeArea}
    >
      <OverlayHeader
        logoSource={require("@/assets/images/gwc-logo-new-white-mobile.png")}
        title="GWC"
        subtitle="Grade Portal"
        onHomePress={handleHome}
        onClose={onClose}
        closeLabel="Close menu"
        accentColor={ACCENT}
      />

      <ScrollView
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => {
          if (item.key === "academics") {
            return (
              <View key={item.key} style={styles.academicsBlock}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  onPress={() =>
                    setIsAcademicsOpen((current) => {
                      const next = !current;

                      if (!next) {
                        setOpenAcademicGroup(null);
                      }

                      return next;
                    })
                  }
                  style={({ pressed }) => [
                    styles.menuItem,
                    isAcademicsOpen && styles.menuItemActive,
                    pressed && styles.menuItemPressed,
                  ]}
                >
                  <Text
                    style={[styles.menuText, isAcademicsOpen && styles.menuTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>

                {isAcademicsOpen ? (
                  <View style={styles.submenu}>
                    {academicGroups.map((group) => (
                      <View key={group.key} style={styles.group}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={group.label}
                          onPress={() => {
                            if ("route" in group && group.route) {
                              onClose();
                              router.push(group.route);
                              return;
                            }

                            setOpenAcademicGroup((current) =>
                              current === group.key ? null : group.key,
                            );
                          }}
                          style={({ pressed }) => [
                            styles.groupTrigger,
                            pressed && styles.groupTriggerPressed,
                          ]}
                        >
                          <Text style={styles.groupTitle}>{group.label}</Text>
                          {"route" in group && group.route ? null : (
                            <Text style={styles.groupIndicator}>
                              {openAcademicGroup === group.key ? "-" : "+"}
                            </Text>
                          )}
                        </Pressable>

                        {!("route" in group && group.route) &&
                        openAcademicGroup === group.key
                          ? group.items.map((entry) => (
                              <Text key={entry} style={styles.groupItem}>
                                - {entry}
                              </Text>
                            ))
                          : null}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            );
          }

          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={onClose}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </OverlayShell>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: spacing.lg + 8,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  menuItem: {
    paddingVertical: spacing.md + 6,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
  },
  menuItemPressed: {
    backgroundColor: "#131a2b",
  },
  menuItemActive: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT,
    borderRadius: 0,
  },
  menuText: {
    color: "#f7f7fa",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    lineHeight: typography.title + 6,
  },
  menuTextActive: {
    color: colors.textPrimary,
  },
  academicsBlock: {
    gap: spacing.sm,
  },
  submenu: {
    paddingLeft: spacing.md,
    gap: spacing.md,
  },
  group: {
    gap: spacing.xs,
  },
  groupTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  groupTriggerPressed: {
    opacity: 0.75,
  },
  groupTitle: {
    color: "#f7f7fa",
    fontSize: 18,
    fontFamily: FontFamilies.headingBold,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  groupIndicator: {
    color: "#f7f7fa",
    fontSize: 22,
    lineHeight: 22,
    fontFamily: FontFamilies.headingBold,
    fontWeight: "800",
  },
  groupItem: {
    color: "#d8dce5",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: FontFamilies.bodySemi,
    paddingLeft: spacing.xs,
  },
});
