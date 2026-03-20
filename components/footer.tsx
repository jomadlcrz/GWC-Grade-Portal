import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppTheme, FontFamilies, palette } from "@/constants/theme";

type FooterProps = {
  bottomInset?: number;
};

type BulletItemProps = {
  label: string;
  onPress?: () => void;
};

function BulletItem({ label, onPress }: BulletItemProps) {
  return (
    <View style={styles.bulletItem}>
      <FontAwesome5
        name="chevron-right"
        size={13}
        color={colors.textOnPrimary}
      />
      <Pressable
        onPress={onPress}
        // @ts-ignore hovered is web-only; pressed covers mobile
        style={({ hovered, pressed }) =>
          (hovered || pressed) && styles.activeState
        }
      >
        {({ hovered, pressed }) => (
          <Text style={[styles.bulletText, (hovered || pressed) && styles.hoverText]}>
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export function Footer({ bottomInset = 0 }: FooterProps) {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/gwc-logo-new-white-mobile.png")}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
            allowDownscaling
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
            <Pressable
              onPress={() => openLink("mailto:goldenwest.colleges@yahoo.com.ph")}
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) =>
                (hovered || pressed) && styles.activeState
              }
            >
              {({ hovered, pressed }) => (
                <Text style={[styles.linkText, (hovered || pressed) && styles.hoverText]}>
                  goldenwest.colleges@yahoo.com.ph
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => openLink("tel:09165969881")}
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) =>
                (hovered || pressed) && styles.activeState
              }
            >
              {({ hovered, pressed }) => (
                <Text style={[styles.linkText, (hovered || pressed) && styles.hoverText]}>
                  0916 596 9881
                </Text>
              )}
            </Pressable>
          </View>

          <View style={styles.socialRow}>
            <Pressable
              onPress={() =>
                openLink("https://www.facebook.com/gwcalaminosofficial")
              }
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) => [
                styles.iconBackground,
                (hovered || pressed) && styles.iconBackgroundActive,
              ]}
            >
              {({ hovered, pressed }) => (
                <FontAwesome5
                  name="facebook-f"
                  size={18}
                  color={hovered || pressed ? colors.hoverGold : colors.textOnPrimary}
                />
              )}
            </Pressable>
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
              <Pressable
                onPress={() =>
                  openLink(
                    "https://www.google.com/maps/search/?api=1&query=San+Jose+Drive,+Alaminos,+Pangasinan,+2404",
                  )
                }
                // @ts-ignore hovered is web-only; pressed covers mobile
                style={({ hovered, pressed }) =>
                  (hovered || pressed) && styles.activeState
                }
              >
                {({ hovered, pressed }) => (
                  <Text style={[styles.addressText, (hovered || pressed) && styles.hoverText]}>
                    San Jose Drive, Alaminos, Philippines, 2404
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View style={getBottomBarStyle(bottomInset)}>
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
  footer: themeColors.footer,
  hoverGold: "#f5c542",
};

const FOOTER_PADDING = 30;
const CONTENT_PADDING = 30;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: "100%",
    paddingTop: 0,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: CONTENT_PADDING,
    paddingTop: CONTENT_PADDING,
    gap: spacing.xl + spacing.sm,
    width: "100%",
    maxWidth: 1080,
    alignSelf: "center",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  logo: {
    width: 300,
    height: 300,
  },
  section: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: typography.subtitle + 2,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    textTransform: "uppercase",
    color: colors.textOnPrimary,
    letterSpacing: 0.6,
    textAlign: "center",
  },
  list: {
    gap: spacing.sm,
    paddingLeft: 0,
    alignItems: "center",
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
    textAlign: "center",
  },
  contactGroup: {
    gap: spacing.sm,
    alignItems: "center",
    maxWidth: 360,
  },
  linkText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    textAlign: "center",
    alignSelf: "center",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  iconBackgroundActive: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderColor: "rgba(255, 255, 255, 0.32)",
  },
  addressGroup: {
    gap: spacing.sm,
    alignItems: "center",
    maxWidth: 360,
  },
  addressLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  addressIcon: {
    marginTop: 2,
  },
  addressText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    textAlign: "center",
    flexShrink: 1,
    alignSelf: "center",
  },
  bottomBar: {
    backgroundColor: colors.footer,
    width: "100%",
    alignSelf: "stretch",
    padding: FOOTER_PADDING,
    alignItems: "center",
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  copyText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: "400",
    textAlign: "center",
  },
  copyBrand: {
    fontFamily: FontFamilies.headingBold,
    fontWeight: "800",
  },
  devText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    lineHeight: typography.body + 4,
    textAlign: "center",
  },
  devLabel: {
    fontFamily: FontFamilies.headingBold,
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
  hoverText: {
    color: colors.hoverGold,
  },
  activeState: {
    opacity: 0.85,
  },
});

const getBottomBarStyle = (bottomInset: number) => {
  // Android soft nav bars can report large insets after resume; only apply extra padding on iOS.
  const safeInset = Platform.OS === "ios" ? bottomInset : 0;
  return {
    ...styles.bottomBar,
    paddingBottom: FOOTER_PADDING + safeInset,
  };
};
