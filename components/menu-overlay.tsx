import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

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

export function MenuOverlay({ visible, onClose }: MenuOverlayProps) {
  const router = useRouter();

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
        logoSource={require("@/assets/images/gwc-logo-new-white.png")}
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
        {menuItems.map((item) => (
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
        ))}
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
  menuText: {
    color: "#f7f7fa",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    lineHeight: typography.title + 6,
  },
});
