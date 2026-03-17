import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type Href, usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppTheme, FontFamilies } from "@/constants/theme";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  mode?: "overlay" | "sticky";
};

const announcementsHref = "/announcements" as Href;

export function Header({
  title = "GWC",
  subtitle = "Grade Portal",
  mode = "sticky",
}: HeaderProps) {
  const bgAnim = useRef(new Animated.Value(mode === "overlay" ? 0 : 1)).current;
  const router = useRouter();
  const pathname = usePathname();
  const isOnAnnouncements =
    pathname === "/announcements" ||
    pathname === "/announcement" ||
    pathname?.startsWith("/announcements/");

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: mode === "overlay" ? 0 : 1,
      duration: 650,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [mode, bgAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: bgAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(255,255,255,0)", colors.surface],
          }),
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go to home"
        onPress={() => router.push("/")}
        style={styles.leftGroup}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/gwc-logo-new.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.textGroup}>
          <Text
            style={[styles.title, mode === "overlay" && styles.overlayText]}
          >
            {title}
          </Text>
          <Text
            style={[styles.subtitle, mode === "overlay" && styles.overlayText]}
          >
            {subtitle}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        {!isOnAnnouncements && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to announcements"
            onPress={() => router.push(announcementsHref)}
            style={styles.iconButton}
          >
            <FontAwesome5 name="bullhorn" size={26} color={colors.surface} />
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open search"
          onPress={() => router.push("/search")}
          style={styles.iconButton}
        >
          <FontAwesome5 name="search" size={26} color={colors.surface} />
        </Pressable>
        <FontAwesome5 name="bars" size={28} color={colors.surface} />
      </View>
    </Animated.View>
  );
}

const { colors, spacing, radius, typography } = AppTheme;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
    paddingVertical: spacing.md + spacing.xs,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 0,
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
  title: {
    fontSize: typography.title + 4,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.accent,
    color: colors.primary,
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
    textAlign: "center",
  },
  overlayText: {
    color: colors.surface,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md + spacing.sm,
    paddingVertical: 0,
    alignSelf: "stretch",
    borderRadius: 0,
  },
  iconButton: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
});
