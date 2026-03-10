import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { AppTheme } from "@/constants/theme";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export function Header({
  title = "GWC",
  subtitle = "Grade Portal",
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/gwc-logo-new.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <FontAwesome5 name="bullhorn" size={26} color={colors.surface} />
        <FontAwesome5 name="search" size={26} color={colors.surface} />
        <FontAwesome5 name="bars" size={28} color={colors.surface} />
      </View>
    </View>
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
    color: colors.primary,
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    color: colors.primary,
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
    textAlign: "center",
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
});
