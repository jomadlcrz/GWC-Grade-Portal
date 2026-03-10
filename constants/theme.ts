/**
 * Below are the colors used in the app.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";

export const palette = {
  white: "#FFFFFF",
  black: "#000000",
  slate900: "#0F1B2A",
  slate700: "#4E5968",
  slate500: "#6E7A88",
  slate400: "#94A3B8",
  slate300: "#C2CBD6",
  slate200: "#D6DEE8",
  slate100: "#E7EDF3",
  page: "#F6F9FF",
  primary900: "#003E78",
  primary700: "#1a5a9e",
  primary100: "#E7F0FA",
  info900: "#1F6FEB",
  success900: "#0F766E",
  warning900: "#915600",
  danger900: "#B00020",
  danger100: "#FCE8EC",
  softCard: "#E6ECF3",
  footer: "#1C1D21",
};

export const AppTheme = {
  colors: {
    pageBackground: palette.page,
    surface: palette.white,
    textPrimary: palette.slate900,
    textSecondary: palette.slate700,
    textMuted: palette.slate500,
    border: palette.slate200,
    borderStrong: palette.slate300,
    black: palette.black,
    primary: palette.primary900,
    primaryBorder: palette.primary700,
    primarySoft: palette.primary100,
    info: palette.info900,
    success: palette.success900,
    warning: palette.warning900,
    danger: palette.danger900,
    dangerSoft: palette.danger100,
    placeholder: palette.slate400,
    mutedSurface: palette.slate100,
    softCard: palette.softCard,
    footer: palette.footer,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  radius: {
    sm: 10,
    md: 12,
    lg: 14,
    pill: 999,
  },
  typography: {
    title: 24,
    subtitle: 14,
    body: 15,
    caption: 13,
  },
} as const;

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
};

export const FontFamilies = {
  body: "OpenSans_400Regular",
  bodySemi: "OpenSans_600SemiBold",
  bodyBold: "OpenSans_700Bold",
  bodyExtraBold: "OpenSans_800ExtraBold",
  heading: "Montserrat_800ExtraBold",
  headingBold: "Montserrat_700Bold",
  accent: "MerriweatherSans_600SemiBold",
  accentBold: "MerriweatherSans_700Bold",
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
