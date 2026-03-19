import { FontAwesome5 } from "@expo/vector-icons";
import { Image, type ImageSource } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppTheme, FontFamilies } from "@/constants/theme";

type OverlayHeaderProps = {
  logoSource: ImageSource;
  title?: string;
  subtitle?: string;
  onHomePress?: () => void;
  onClose?: () => void;
  accentColor?: string;
  showAccent?: boolean;
  closeLabel?: string;
  textColor?: string;
};

const { colors, spacing, typography } = AppTheme;

export function OverlayHeader({
  logoSource,
  title = "GWC",
  subtitle = "Grade Portal",
  onHomePress,
  onClose,
  accentColor = colors.primary,
  showAccent = true,
  closeLabel = "Close",
  textColor = "#f5f5f5",
}: OverlayHeaderProps) {
  return (
    <View>
      <View style={styles.headerBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go to home"
          onPress={onHomePress}
          style={styles.logoRow}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={logoSource}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          <View style={styles.textGroup}>
            <Text style={[styles.headerTitle, { color: textColor }]}>
              {title}
            </Text>
            {!!subtitle && (
              <Text style={[styles.headerSubtitle, { color: textColor }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </Pressable>

        {onClose && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
            onPress={onClose}
            style={styles.closeButton}
          >
            <FontAwesome5 name="times-circle" size={28} color="#e6e6e6" />
          </Pressable>
        )}
      </View>

      {showAccent && (
        <View style={[styles.headerAccent, { backgroundColor: accentColor }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  logoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
    paddingVertical: spacing.md,
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
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
    textAlign: "center",
  },
  headerSubtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.accent,
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
    textAlign: "center",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  headerAccent: {
    height: 3,
  },
});
