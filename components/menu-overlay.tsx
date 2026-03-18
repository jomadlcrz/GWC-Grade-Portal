import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppTheme, FontFamilies } from "@/constants/theme";

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
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      transparent={false}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to home"
            onPress={handleHome}
            style={styles.logoRow}
          >
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/images/gwc-logo-new-white.png")}
                style={styles.logo}
                cachePolicy="memory-disk"
                contentFit="contain"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.headerTitle}>GWC</Text>
              <Text style={styles.headerSubtitle}>Grade Portal</Text>
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            onPress={onClose}
            style={styles.closeButton}
          >
            <FontAwesome5 name="times-circle" size={28} color="#e6e6e6" />
          </Pressable>
        </View>

        <View style={styles.headerAccent} />

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
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: spacing.md + spacing.xs,
    minHeight: 98,
    paddingRight: spacing.md + spacing.sm,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 66,
    height: 66,
  },
  textGroup: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: typography.title + 4,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    color: "#f5f5f5",
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
  },
  headerSubtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.accent,
    color: "#e0e6f4",
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
  },
  closeButton: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  headerAccent: {
    height: 3,
    backgroundColor: ACCENT,
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
