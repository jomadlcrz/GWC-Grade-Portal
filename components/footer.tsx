import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Linking, StyleSheet, Text, View } from "react-native";

import { AppTheme, palette } from "@/constants/theme";

type FooterProps = Record<string, never>;

type BulletItemProps = {
  label: string;
};

function BulletItem({ label }: BulletItemProps) {
  return (
    <View style={styles.bulletItem}>
      <FontAwesome5
        name="chevron-right"
        size={13}
        color={colors.textOnPrimary}
      />
      <Text style={styles.bulletText}>{label}</Text>
    </View>
  );
}

export function Footer(_: FooterProps) {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/gwc-logo-new-white.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security &amp; Brand</Text>
          <View style={styles.list}>
            <BulletItem label="Data Privacy Notice" />
            <BulletItem label="Security Issue" />
            <BulletItem label="Copyright Infringement" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactGroup}>
            <Text
              style={styles.linkText}
              onPress={() => openLink("mailto:goldenwest.colleges@yahoo.com.ph")}
            >
              goldenwest.colleges@yahoo.com.ph
            </Text>
            <Text
              style={styles.linkText}
              onPress={() => openLink("tel:09165969881")}
            >
              0916 596 9881
            </Text>
          </View>

          <View style={styles.socialRow}>
            <Text
              onPress={() =>
                openLink("https://www.facebook.com/gwcalaminosofficial")
              }
            >
              <FontAwesome5
                name="facebook-f"
                size={18}
                color={colors.textOnPrimary}
              />
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locate Us</Text>
          <View style={styles.addressGroup}>
            <View style={styles.addressLine}>
              <FontAwesome5
                name="map-marker-alt"
                size={14}
                color={colors.textOnPrimary}
                style={styles.addressIcon}
              />
              <Text
                style={styles.addressText}
                onPress={() =>
                  openLink(
                    "https://www.google.com/maps/search/?api=1&query=San+Jose+Drive,+Alaminos,+Pangasinan,+2404"
                  )
                }
              >
                San Jose Drive, Alaminos, Philippines, 2404
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.copyText}>
          © Copyright{" "}
          <Text style={styles.copyBrand}>Golden West Colleges, Inc.</Text>
        </Text>
        <Text style={styles.devText}>
          <Text style={styles.devLabel}>Designed and Developed by: </Text>
          <Text style={styles.devName}>GWC - Information Technology</Text>
        </Text>
      </View>
    </View>
  );
}

const { colors: themeColors, spacing, typography } = AppTheme;

const colors = {
  background: themeColors.primary,
  panel: palette.slate900,
  textOnPrimary: themeColors.surface,
  textMuted: palette.slate200,
  accent: themeColors.primarySoft,
  primary: themeColors.surface,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: spacing.xl + spacing.sm,
    paddingBottom: 0,
    gap: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xl + spacing.sm,
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
  section: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.subtitle + 2,
    fontWeight: "800",
    textTransform: "uppercase",
    color: colors.textOnPrimary,
    letterSpacing: 0.6,
  },
  list: {
    gap: spacing.sm,
    paddingLeft: spacing.sm,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  bulletText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
  },
  contactGroup: {
    gap: spacing.sm,
  },
  linkText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  addressGroup: {
    gap: spacing.sm,
  },
  addressLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  addressIcon: {
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
  },
  bottomBar: {
    marginTop: spacing.xl,
    backgroundColor: "#1C1D21",
    alignSelf: "stretch",
    width: "100%",
    marginHorizontal: 0,
    borderRadius: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  copyText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: "400",
  },
  copyBrand: {
    fontWeight: "800",
  },
  devText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 4,
    textAlign: "center",
  },
  devLabel: {
    fontWeight: "800",
  },
  devName: {
    fontWeight: "400",
  },
  yearText: {
    color: colors.textOnPrimary,
    fontSize: typography.caption,
    letterSpacing: 0.2,
  },
});
