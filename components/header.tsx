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

// Destructured at the top so it's available for the render cycle
const { colors, spacing, radius, typography } = AppTheme;

type HeaderProps = {
  title?: string;
  subtitle?: string;
  mode?: "overlay" | "sticky";
  onSearchPress?: () => void;
  hideAnnouncementsIcon?: boolean;
  onMenuPress?: () => void;
};

const announcementsHref = "/announcements" as Href;

export function Header({
  title = "GWC",
  subtitle = "Grade Portal",
  mode = "sticky",
  onSearchPress,
  hideAnnouncementsIcon = false,
  onMenuPress,
}: HeaderProps) {
  const bgAnim = useRef(new Animated.Value(mode === "overlay" ? 0 : 1)).current;
  const router = useRouter();
  const pathname = usePathname();

  const isOnAnnouncements =
    pathname === "/announcements" ||
    pathname === "/announcement" ||
    pathname?.startsWith("/announcements/");

  const showAnnouncements = !hideAnnouncementsIcon && !isOnAnnouncements;

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
      {/* Left side takes remaining space to push actions to the right */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go to home"
        onPress={() => router.push("/")}
        style={[styles.leftGroup, { flex: 1 }]}
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
          {!!subtitle && (
            <Text
              style={[
                styles.subtitle,
                mode === "overlay" && styles.overlayText,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </Pressable>

      {/* Right side actions */}
      <View style={styles.actions}>
        {showAnnouncements && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to announcements"
            onPress={() => router.push(announcementsHref)}
            // @ts-ignore - hovered is supported in Expo Web natively
            style={({ pressed, hovered }) => [
              styles.iconButton,
              (pressed || hovered) && styles.iconHover,
            ]}
          >
            <FontAwesome5 name="bullhorn" size={24} color={colors.surface} />
          </Pressable>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open search"
          onPress={() => {
            if (onSearchPress) {
              onSearchPress();
              return;
            }
            router.push("/search");
          }}
          // @ts-ignore
          style={({ pressed, hovered }) => [
            styles.iconButton,
            showAnnouncements && styles.separator, // Only add left border if Bullhorn is present
            (pressed || hovered) && styles.iconHover,
          ]}
        >
          <FontAwesome5 name="search" size={24} color={colors.surface} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          onPress={onMenuPress}
          // @ts-ignore
          style={({ pressed, hovered }) => [
            styles.iconButton,
            styles.separator, // Always add separator since Search is guaranteed to be before it
            (pressed || hovered) && styles.iconHover,
          ]}
        >
          <FontAwesome5 name="bars" size={26} color={colors.surface} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch", // Ensures children match header height
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.surface,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
    paddingVertical: spacing.md,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "stretch", // Forces inner Pressables to be 100% height
    backgroundColor: colors.primary,
    paddingVertical: 0,
    paddingHorizontal: 0, // Removed horizontal padding from container
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22, // Acts as the click-target width
  },
  iconHover: {
    backgroundColor: "#000",
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.3)", // The thin white line from your screenshot
  },
});
