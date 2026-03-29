import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AnimatedIconShift } from "@/components/animated-icon-shift";
import { FadeScroll } from "@/components/fade-scroll";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuOverlay } from "@/components/menu-overlay";
import { SearchOverlay } from "@/components/search-overlay";
import { landingSections, posts } from "@/constants/posts";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors } = AppTheme;
const HERO_HEIGHT = 220;
const HEADER_HEIGHT = 98;
const FADE_SCROLL_DELAY = 400;

type LandingVariant =
  | "landing-white"
  | "landing-gray"
  | "landing-red"
  | "landing-blue";

type LandingSection = {
  key: string;
  title: string;
  subtitle: string;
  headline?: string;
  variant: LandingVariant;
  image: string;
  sectionKey?: string;
  postSlug?: string;
  relatedSlugs?: readonly string[];
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { height: viewportHeight } = useWindowDimensions();
  const heroHeight = HERO_HEIGHT;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [revealedSections, setRevealedSections] = useState<
    Record<string, boolean>
  >({});
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>(
    {},
  );
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSectionLayout = (key: string, event: LayoutChangeEvent) => {
    const nextY = event.nativeEvent.layout.y;

    setSectionOffsets((current) => {
      const next =
        current[key] === nextY ? current : { ...current, [key]: nextY };

      const revealLine = viewportHeight - 140;

      if (nextY <= revealLine) {
        setRevealedSections((revealedCurrent) =>
          revealedCurrent[key]
            ? revealedCurrent
            : { ...revealedCurrent, [key]: true },
        );
      }

      return next;
    });
  };

  const handleScroll = (offsetY: number) => {
    const shouldUseStickyStyle =
      offsetY >= heroHeight - HEADER_HEIGHT - insets.top;
    const revealLine = offsetY + viewportHeight - 140;

    if (shouldUseStickyStyle !== isScrolled) {
      setIsScrolled(shouldUseStickyStyle);
    }

    setRevealedSections((current) => {
      let changed = false;
      const next = { ...current };

      for (const { key } of landingSections) {
        const top = sectionOffsets[key];

        if (top !== undefined && top <= revealLine && !next[key]) {
          next[key] = true;
          changed = true;
        }
      }

      return changed ? next : current;
    });
  };

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={styles.container}
    >
      <Animated.ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 0 }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              const scrollEvent =
                event as NativeSyntheticEvent<NativeScrollEvent>;
              handleScroll(scrollEvent.nativeEvent.contentOffset.y);
            },
          },
        )}
      >
        <View style={[styles.heroSection, { height: heroHeight }]}>
          <Image
            source={require("@/assets/images/cover-mobile.jpg")}
            style={styles.heroImage}
            contentFit="cover"
            allowDownscaling
          />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.content}>
          {landingSections.map(({ key, ...sectionProps }) => (
            <View
              key={key}
              onLayout={(event) => handleSectionLayout(key, event)}
            >
              <SectionCard
                revealed={Boolean(revealedSections[key])}
                sectionKey={key}
                {...sectionProps}
              />
            </View>
          ))}
        </View>
        <Footer bottomInset={insets.bottom} />
      </Animated.ScrollView>

      <View style={[styles.fixedHeader, { paddingTop: insets.top }]}>
        <Header
          mode={isScrolled ? "sticky" : "overlay"}
          onSearchPress={() => setIsSearchOpen(true)}
          onMenuPress={() => setIsMenuOpen(true)}
        />
      </View>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MenuOverlay visible={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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

type SectionCardProps = Omit<LandingSection, "key"> & {
  revealed: boolean;
  sectionKey: string;
};

function SectionCard({
  title,
  subtitle,
  headline,
  variant,
  image,
  postSlug,
  relatedSlugs,
  revealed,
  sectionKey,
}: SectionCardProps) {
  const router = useRouter();
  const textColor =
    variant === "landing-red"
      ? colors.danger
      : variant === "landing-blue"
        ? colors.surface
        : colors.textPrimary;

  const subtitleColor =
    variant === "landing-blue" ? colors.surface : colors.textSecondary;

  const isFeature = sectionKey === "global-arena" || sectionKey === "community";
  const isEvents = sectionKey === "events";
  const isPerspective = sectionKey === "perspective";
  const isCareers = sectionKey === "careers";

  const backgroundColor = isCareers
    ? colors.pageBackground
    : variant === "landing-gray"
      ? colors.mutedSurface
      : variant === "landing-red"
        ? colors.dangerSoft
        : variant === "landing-blue"
          ? colors.primary
          : colors.surface;

  if (isEvents) {
    return (
      <FadeScroll delay={FADE_SCROLL_DELAY} revealed={revealed}>
        <View style={[stylesSection.eventsBlock, { backgroundColor }]}>
          <Text style={stylesSection.eventsTitle}>EVENTS</Text>
        </View>
      </FadeScroll>
    );
  }

  if (isFeature) {
    const relatedPosts =
      relatedSlugs?.map((slug) => posts[slug]).filter(Boolean) ?? [];

    return (
      <View style={[stylesSection.card, { backgroundColor }]}>
        <FadeScroll delay={FADE_SCROLL_DELAY} revealed={revealed}>
          <Text style={stylesFeature.h1}>{title}</Text>
        </FadeScroll>
        <FadeScroll delay={FADE_SCROLL_DELAY + 90} revealed={revealed}>
          <Image
            source={{ uri: image }}
            style={stylesFeature.bannerFull}
            contentFit="cover"
          />
        </FadeScroll>
        <FadeScroll delay={FADE_SCROLL_DELAY + 180} revealed={revealed}>
          <View style={stylesFeature.featureBody}>
            <Text style={stylesFeature.h2}>{headline ?? title}</Text>
            <Text style={stylesFeature.paragraph}>{subtitle}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => postSlug && router.push(`/post/${postSlug}`)}
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) => [
                stylesFeature.readMore,
                (hovered || pressed) && stylesFeature.readMoreActive,
              ]}
            >
              {({ hovered, pressed }) => (
                <>
                  <Text
                    style={[
                      stylesFeature.readMoreText,
                      (hovered || pressed) && stylesFeature.readMoreTextActive,
                    ]}
                  >
                    Read More
                  </Text>
                  <AnimatedIconShift
                    active={hovered || pressed}
                    style={stylesFeature.readMoreIcon}
                  >
                    <FontAwesome5
                      name="arrow-right"
                      size={14}
                      color={colors.surface}
                    />
                  </AnimatedIconShift>
                </>
              )}
            </Pressable>

            <View style={stylesFeature.moreStories}>
              <Text style={stylesFeature.h4}>More Stories:</Text>
              {relatedPosts.map((story) => (
                <Pressable
                  key={story.slug}
                  accessibilityRole="button"
                  onPress={() => router.push(`/post/${story.slug}`)}
                  // @ts-ignore hovered is web-only; pressed covers mobile
                  style={({ hovered, pressed }) => [
                    stylesFeature.storyRow,
                    (hovered || pressed) && stylesFeature.storyRowActive,
                  ]}
                >
                  {({ hovered, pressed }) => (
                    <>
                      <View style={stylesFeature.storyCard}>
                        <Image
                          source={{ uri: story.image }}
                          style={stylesFeature.storyThumb}
                          contentFit="cover"
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          stylesFeature.storyTitle,
                          (hovered || pressed) &&
                            stylesFeature.storyTitleActive,
                        ]}
                      >
                        {story.title}
                      </Text>
                    </>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </FadeScroll>
      </View>
    );
  }

  if (isPerspective) {
    return (
      <View style={[stylesSection.card, { backgroundColor }]}>
        <FadeScroll delay={FADE_SCROLL_DELAY} revealed={revealed}>
          <Text style={stylesPerspective.h1}>PERSPECTIVES + OPINIONS</Text>
        </FadeScroll>
        <FadeScroll delay={FADE_SCROLL_DELAY + 90} revealed={revealed}>
          <Image
            source={{ uri: image }}
            style={stylesPerspective.bannerFull}
            contentFit="cover"
          />
        </FadeScroll>
        <FadeScroll delay={FADE_SCROLL_DELAY + 180} revealed={revealed}>
          <View style={stylesPerspective.body}>
            <Text style={stylesPerspective.h2}>PLASTIC FREE ADVOCACY</Text>
            <Text style={stylesPerspective.paragraph}>
              As the Field of Study Head for Professional Education, my advocacy
              in life is all about the â€œZERO WASTE PLASTIC MANAGEMENTâ€ in
              general. And as the former Pioneering Adviser of the Science
              Educators Guild (SEG), under the Institute of Teacher Education,
              since then, together with the student organization, we are
              dreaming and planning to meet the zero-waste plastic management
              under the â€œPLASTIC FREE ADVOCACYâ€ to be specific in the
              College.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => postSlug && router.push(`/post/${postSlug}`)}
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) => [
                stylesPerspective.readMore,
                (hovered || pressed) && stylesPerspective.readMoreActive,
              ]}
            >
              {({ hovered, pressed }) => (
                <>
                  <Text
                    style={[
                      stylesPerspective.readMoreText,
                      (hovered || pressed) &&
                        stylesPerspective.readMoreTextActive,
                    ]}
                  >
                    Read More
                  </Text>
                  <AnimatedIconShift
                    active={hovered || pressed}
                    style={stylesPerspective.readMoreIcon}
                  >
                    <FontAwesome5
                      name="arrow-right"
                      size={14}
                      color={
                        hovered || pressed ? colors.textPrimary : colors.surface
                      }
                    />
                  </AnimatedIconShift>
                </>
              )}
            </Pressable>
          </View>
        </FadeScroll>
      </View>
    );
  }

  if (isCareers) {
    const facultyPositions = [
      { id: "Instructor I", count: 2, grade: "SG 12", salary: "â‚± 29,165.00" },
      {
        id: "Instructor II",
        count: 1,
        grade: "SG 13",
        salary: "â‚± 31,320.00",
      },
      {
        id: "Instructor III",
        count: 1,
        grade: "SG 14",
        salary: "â‚± 33,843.00",
      },
    ];

    return (
      <View style={[stylesSection.card, { backgroundColor }]}>
        <FadeScroll delay={FADE_SCROLL_DELAY} revealed={revealed}>
          <Text style={stylesCareers.h1}>BE PART OF OUR TEAM</Text>
        </FadeScroll>
        <Text style={stylesCareers.h2}>
          CURRENTLY NO VACANT POSITION AVAILABLE
        </Text>
        <Text style={stylesCareers.h3}>Available Faculty Positions:</Text>
        <View style={stylesCareers.list}>
          {facultyPositions.map(({ id, count, grade, salary }) => (
            <View key={id} style={stylesCareers.card}>
              <View style={stylesCareers.bar} />
              <View style={stylesCareers.cardBody}>
                <View style={stylesCareers.countBubble}>
                  <Text style={stylesCareers.countText}>{count}</Text>
                </View>
                <Text style={stylesCareers.title}>{id}</Text>
                <Text style={stylesCareers.meta}>
                  {grade} â€“ {salary}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[stylesSection.card, { backgroundColor }]}>
      <FadeScroll delay={FADE_SCROLL_DELAY} revealed={revealed}>
        <Image
          source={{ uri: image }}
          style={stylesSection.banner}
          contentFit="cover"
        />
      </FadeScroll>
      <FadeScroll delay={FADE_SCROLL_DELAY + 110} revealed={revealed}>
        <View style={stylesSection.inner}>
          <View style={stylesSection.badgeRow}>
            <View
              style={[
                stylesSection.badge,
                variant === "landing-red" && stylesSection.badgeRed,
                variant === "landing-gray" && stylesSection.badgeGray,
                variant === "landing-blue" && stylesSection.badgeBlue,
              ]}
            >
              <Text
                style={[
                  stylesSection.badgeText,
                  variant === "landing-blue" && stylesSection.badgeTextBlue,
                ]}
              >
                {variant}
              </Text>
            </View>
          </View>
          <Text style={[stylesSection.title, { color: textColor }]}>
            {title}
          </Text>
          <Text style={[stylesSection.subtitle, { color: subtitleColor }]}>
            {subtitle}
          </Text>
        </View>
      </FadeScroll>
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
    backgroundColor: colors.primary,
  },
  badgeRed: {
    backgroundColor: colors.dangerSoft,
  },
  badgeGray: {
    backgroundColor: colors.mutedSurface,
  },
  badgeBlue: {
    backgroundColor: colors.surface,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.surface,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  badgeTextBlue: {
    color: colors.primary,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  readMoreActive: {
    backgroundColor: colors.textPrimary,
    shadowOpacity: 0.28,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.surface,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  readMoreTextActive: {
    color: colors.surface,
  },
  readMoreIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  moreStories: {
    marginTop: 2,
    gap: 18,
  },
  h4: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  storyRow: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 2,
  },
  storyRowActive: {
    opacity: 0.92,
  },
  storyThumb: {
    width: "100%",
    height: 190,
    borderRadius: 0,
  },
  storyFrame: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surface,
    borderRadius: 8,
    overflow: "hidden",
  },
  storyCard: {
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 2,
  },
  storyTitle: {
    alignSelf: "stretch",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FontFamilies.accent,
    color: "#9c4f00",
    textAlign: "left",
  },
  storyTitleActive: {
    color: colors.textPrimary,
  },
});

const stylesCareers = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    textAlign: "center",
    color: colors.textPrimary,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: FontFamilies.accent,
    textAlign: "center",
    color: colors.textPrimary,
    fontStyle: "italic",
    marginBottom: 30,
    letterSpacing: 0.2,
  },
  h3: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    textAlign: "center",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "stretch",
  },
  bar: {
    width: 6,
    height: "100%",
    alignSelf: "stretch",
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "#111111",
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 16,
  },
  countBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  countText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 14,
    fontFamily: FontFamilies.body,
    color: colors.textPrimary,
  },
});

const stylesPerspective = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "800",
    fontFamily: FontFamilies.heading,
    textAlign: "center",
    color: colors.surface,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 20,
    letterSpacing: 0.2,
    marginBottom: 48,
  },
  bannerFull: {
    width: "100%",
    alignSelf: "stretch",
    height: 190,
    marginBottom: 18,
  },
  body: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 10,
  },
  h2: {
    fontSize: 32,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.2,
    textAlign: "center",
    color: colors.surface,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FontFamilies.body,
    color: colors.surface,
    textAlign: "justify",
    marginBottom: 10,
  },
  readMore: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#000",
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  readMoreActive: {
    backgroundColor: colors.surface,
    shadowOpacity: 0.25,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    color: colors.surface,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  readMoreTextActive: {
    color: colors.textPrimary,
  },
  readMoreIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
