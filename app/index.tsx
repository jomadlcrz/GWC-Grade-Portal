import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors } = AppTheme;
const HERO_HEIGHT = 220;
const HEADER_HEIGHT = 98;

type LandingVariant = "landing-white" | "landing-gray" | "landing-red";

type LandingSection = {
  key: string;
  title: string;
  subtitle: string;
  headline?: string;
  variant: LandingVariant;
  image: string;
  sectionKey?: string;
};

const landingSections: LandingSection[] = [
  {
    key: "global-arena",
    title: "GWC IN THE GLOBAL ARENA",
    subtitle:
      "Providing students, faculty, and staff with insights and opportunities from partners across the globe.",
    headline:
      "DAAD Hosts Info Session at GWC for International Academic Exchange",
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "community",
    title: "GWC IN THE COMMUNITY",
    subtitle:
      "Student life, organizations, and collaboration spaces that keep the GWC family connected.",
    headline: "Student Council Launches Campus-Wide Service Drive",
    variant: "landing-gray",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "events",
    title: "EVENTS",
    subtitle: "Schedules, registration, and on-campus happenings.",
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "perspective",
    title: "Perspective",
    subtitle: "Voices, opinions, and stories from the GWC family.",
    variant: "landing-red",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    key: "careers",
    title: "Careers",
    subtitle: "Opportunities, internships, and pathways after GWC.",
    variant: "landing-white",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const heroHeight = HERO_HEIGHT;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (offsetY: number) => {
    const shouldUseStickyStyle =
      offsetY >= heroHeight - HEADER_HEIGHT - insets.top;

    if (shouldUseStickyStyle !== isScrolled) {
      setIsScrolled(shouldUseStickyStyle);
    }
  };

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 0 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
      >
        <View style={[styles.heroSection, { height: heroHeight }]}>
          <Image
            source={require("@/storage/cover_image/cover_sample.jpg")}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.content}>
          {landingSections.map(({ key, ...sectionProps }) => (
            <SectionCard key={key} sectionKey={key} {...sectionProps} />
          ))}
        </View>
        <Footer bottomInset={insets.bottom} />
      </ScrollView>

      <View style={[styles.fixedHeader, { paddingTop: insets.top }]}>
        <Header mode={isScrolled ? "sticky" : "overlay"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  content: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 0,
  },
});

type SectionCardProps = LandingSection;

function SectionCard({
  title,
  subtitle,
  headline,
  variant,
  image,
  key: _deprecatedKey,
  sectionKey,
}: SectionCardProps & { sectionKey: string; key?: string }) {
  const backgroundColor =
    variant === "landing-gray"
      ? colors.mutedSurface
      : variant === "landing-red"
        ? colors.dangerSoft
        : colors.surface;

  const textColor =
    variant === "landing-red" ? colors.danger : colors.textPrimary;

  const isFeature = sectionKey === "global-arena" || sectionKey === "community";
  const isEvents = sectionKey === "events";

  if (isEvents) {
    return (
      <View style={[stylesSection.eventsBlock, { backgroundColor }]}>
        <Text style={stylesSection.eventsTitle}>EVENTS</Text>
      </View>
    );
  }

  if (isFeature) {
    return (
      <View style={[stylesSection.card, { backgroundColor }]}>
        <Text style={stylesFeature.h1}>{title}</Text>
        <Image
          source={{ uri: image }}
          style={stylesFeature.bannerFull}
          contentFit="cover"
        />
        <View style={stylesFeature.featureBody}>
          <Text style={stylesFeature.h2}>{headline ?? title}</Text>
          <Text style={stylesFeature.paragraph}>{subtitle}</Text>
          <Text style={stylesFeature.readMore}>Read More →</Text>

          <View style={stylesFeature.moreStories}>
            <Text style={stylesFeature.h4}>More Stories:</Text>
            <View style={stylesFeature.storyRow}>
              <Image
                source={{ uri: image }}
                style={stylesFeature.storyThumb}
                contentFit="cover"
              />
              <Text style={stylesFeature.storyTitle}>
                Student Delegates Join ASEAN Youth Forum
              </Text>
            </View>
            <View style={stylesFeature.storyRow}>
              <Image
                source={{ uri: image }}
                style={stylesFeature.storyThumb}
                contentFit="cover"
              />
              <Text style={stylesFeature.storyTitle}>
                New Research Hub Opens for Engineering Cohort
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[stylesSection.card, { backgroundColor }]}>
      <Image
        source={{ uri: image }}
        style={stylesSection.banner}
        contentFit="cover"
      />
      <View style={stylesSection.inner}>
        <View style={stylesSection.badgeRow}>
          <View
            style={[
              stylesSection.badge,
              variant === "landing-red" && stylesSection.badgeRed,
              variant === "landing-gray" && stylesSection.badgeGray,
            ]}
          >
            <Text style={stylesSection.badgeText}>{variant}</Text>
          </View>
        </View>
        <Text style={[stylesSection.title, { color: textColor }]}>{title}</Text>
        <Text style={stylesSection.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const stylesSection = StyleSheet.create({
  card: {
    width: "100%",
    paddingHorizontal: 55,
    paddingVertical: 55,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: colors.surface,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    overflow: "hidden",
  },
  banner: {
    width: "100%",
    alignSelf: "stretch",
    height: 180,
    marginBottom: 15,
  },
  inner: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  badgeRow: {
    flexDirection: "row",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  badgeRed: {
    backgroundColor: colors.dangerSoft,
  },
  badgeGray: {
    backgroundColor: colors.mutedSurface,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  eventsBlock: {
    width: "100%",
    paddingVertical: 70,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  eventsTitle: {
    fontSize: 44,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.2,
    paddingHorizontal: 0,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FontFamilies.accent,
    color: colors.textSecondary,
    lineHeight: 19,
    paddingHorizontal: 0,
  },
});

const stylesFeature = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 24,
    paddingBottom: 16,
    marginBottom: 48,
    letterSpacing: 0.2,
  },
  bannerFull: {
    width: "100%",
    alignSelf: "stretch",
    height: 190,
    marginBottom: 15,
  },
  featureBody: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 6,
  },
  h2: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: FontFamilies.body,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: "justify",
  },
  readMore: {
    alignSelf: "flex-end",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.surface,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  moreStories: {
    marginTop: 2,
    gap: 8,
  },
  h4: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  storyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  storyThumb: {
    width: 64,
    height: 64,
  },
  storyTitle: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    fontFamily: FontFamilies.accent,
    color: colors.textPrimary,
  },
});
