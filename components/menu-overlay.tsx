import { type Href, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppTheme, FontFamilies } from "@/constants/theme";
import { OverlayHeader } from "./overlay-header";
import { OverlayShell } from "./overlay-shell";

type MenuOverlayProps = {
  visible: boolean;
  onClose: () => void;
};

type AnimatedUnderlineProps = {
  active: boolean;
  bottom?: number;
};

const { colors, spacing } = AppTheme;
const DARK_BG = "#202125";
const ACCENT = colors.primary;

type AcademicEntry = {
  label: string;
  route: Href;
};

type AcademicAccordionGroup = {
  key: string;
  label: string;
  type: "accordion";
  items: AcademicEntry[];
};

type AcademicLinkGroup = {
  key: string;
  label: string;
  type: "link";
  route: Href;
};

type AcademicGroup = AcademicAccordionGroup | AcademicLinkGroup;

const academicGroups: AcademicGroup[] = [
  {
    key: "programs",
    label: "PROGRAMS",
    type: "accordion",
    items: [
      {
        label: "Bachelor of Science in Criminology (BSCrim)",
        route: "/academic/programs/bachelor-of-science-in-criminology",
      },
      {
        label: "Bachelor of Science in Information Technology (BSIT)",
        route:
          "/academic/programs/bachelor-of-science-in-information-technology",
      },
      {
        label: "Bachelor of Science in Computer Science (BSCS)",
        route: "/academic/programs/bachelor-of-science-in-computer-science",
      },
      {
        label: "Associate in Computer Science (ACS) - 2-Year Program",
        route: "/academic/programs/associate-in-computer-science",
      },
      {
        label: "Bachelor of Science in Business Administration (BSBA)",
        route:
          "/academic/programs/bachelor-of-science-in-business-administration",
      },
      {
        label: "Major in Marketing Management",
        route: "/academic/programs/major-in-marketing-management",
      },
      {
        label: "Bachelor of Elementary Education (BEEd)",
        route: "/academic/programs/bachelor-of-elementary-education",
      },
      {
        label: "Bachelor of Secondary Education (BSEd)",
        route: "/academic/programs/bachelor-of-secondary-education",
      },
    ],
  },
  {
    key: "strands",
    label: "STRANDS",
    type: "accordion",
    items: [
      {
        label: "Accountancy, Business and Management (ABM)",
        route: "/academic/strands/accountancy-business-and-management",
      },
      {
        label: "Humanities and Social Sciences (HUMSS)",
        route: "/academic/strands/humanities-and-social-sciences",
      },
      {
        label: "Science, Technology, Engineering and Mathematics (STEM)",
        route:
          "/academic/strands/science-technology-engineering-and-mathematics",
      },
      {
        label: "Technical-Vocational-Livelihood (TVL)",
        route: "/academic/strands/technical-vocational-livelihood",
      },
    ],
  },
  {
    key: "faculty",
    label: "FACULTY",
    type: "link",
    route: "/academic/faculties/ias",
  },
  {
    key: "special-programs",
    label: "SPECIAL PROGRAMS",
    type: "accordion",
    items: [
      {
        label: "Professional Education Unit Earner (PEUE)",
        route: "/academic/special-programs/professional-education-unit-earner",
      },
    ],
  },
];

function AnimatedUnderline({ active, bottom = 0 }: AnimatedUnderlineProps) {
  const [width, setWidth] = useState(0);
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;
  const direction = useRef(new Animated.Value(active ? -1 : 1)).current;

  useEffect(() => {
    direction.setValue(active ? -1 : 1);

    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [active, direction, progress]);

  const translateX =
    width > 0
      ? Animated.multiply(
          Animated.multiply(Animated.subtract(1, progress), width / 2),
          direction,
        )
      : 0;

  return (
    <View
      pointerEvents="none"
      style={styles.underlineTrack}
      onLayout={({ nativeEvent }) => {
        const nextWidth = Math.round(nativeEvent.layout.width);

        if (nextWidth !== width) {
          setWidth(nextWidth);
        }
      }}
    >
      {width > 0 ? (
        <Animated.View
          style={[
            styles.animatedUnderline,
            {
              bottom,
              width,
              transform: [{ translateX }, { scaleX: progress }],
            },
          ]}
        />
      ) : null}
    </View>
  );
}

export function MenuOverlay({ visible, onClose }: MenuOverlayProps) {
  const router = useRouter();
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [openAcademicGroup, setOpenAcademicGroup] = useState<string | null>(
    null,
  );

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
    <OverlayShell
      visible={visible}
      onClose={onClose}
      backgroundColor={DARK_BG}
      safeAreaStyle={styles.safeArea}
    >
      <OverlayHeader
        logoSource={require("@/assets/images/gwc-logo-new-white-mobile.png")}
        title="GWC"
        subtitle="Grade Portal"
        onHomePress={handleHome}
        onClose={onClose}
        closeLabel="Close menu"
        accentColor={ACCENT}
      />

      <ScrollView
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => {
          if (item.key === "academics") {
            return (
              <View key={item.key} style={styles.academicsBlock}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  onPress={() =>
                    setIsAcademicsOpen((current) => {
                      const next = !current;

                      if (!next) {
                        setOpenAcademicGroup(null);
                      }

                      return next;
                    })
                  }
                  // @ts-ignore hovered is web-only; pressed covers mobile
                  style={({ hovered, pressed }) => [
                    styles.menuItem,
                    isAcademicsOpen && styles.menuItemOpen,
                    isAcademicsOpen &&
                      !openAcademicGroup &&
                      styles.menuItemActive,
                  ]}
                >
                  {({ hovered, pressed }) => (
                    <>
                      <Text
                        style={[
                          styles.menuText,
                          isAcademicsOpen && styles.menuTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                      <AnimatedUnderline
                        active={
                          (isAcademicsOpen && openAcademicGroup !== "programs") ||
                          (!isAcademicsOpen && (hovered || pressed))
                        }
                      />
                    </>
                  )}
                </Pressable>

                {isAcademicsOpen ? (
                  <View style={styles.submenu}>
                    {academicGroups.map((group) => (
                      <View key={group.key} style={styles.group}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={group.label}
                          onPress={() => {
                            if (group.type === "link") {
                              onClose();
                              router.push(group.route);
                              return;
                            }

                            setOpenAcademicGroup((current) =>
                              current === group.key ? null : group.key,
                            );
                          }}
                          // @ts-ignore hovered is web-only; pressed covers mobile
                          style={({ hovered, pressed }) => [
                            styles.groupTrigger,
                            group.type === "accordion" &&
                              openAcademicGroup === group.key &&
                              styles.groupTriggerActive,
                          ]}
                        >
                          {({ hovered, pressed }) => (
                            <>
                              <Text
                                style={[
                                  styles.groupTitle,
                                  group.type === "accordion" &&
                                    openAcademicGroup === group.key &&
                                    styles.groupTitleActive,
                                ]}
                              >
                                {group.label}
                              </Text>
                              {group.type === "link" ? null : (
                                <Text
                                  style={[
                                    styles.groupIndicator,
                                    openAcademicGroup === group.key &&
                                      styles.groupIndicatorActive,
                                  ]}
                                >
                                  {openAcademicGroup === group.key ? "-" : "+"}
                                </Text>
                              )}
                              <AnimatedUnderline
                                active={
                                  (group.key === "programs" &&
                                    openAcademicGroup === "programs") ||
                                  (group.type === "accordion" &&
                                    openAcademicGroup === group.key &&
                                    group.key !== "programs") ||
                                  hovered ||
                                  pressed
                                }
                              />
                            </>
                          )}
                        </Pressable>

                        {group.type === "accordion" &&
                        openAcademicGroup === group.key
                          ? group.items.map((entry: AcademicEntry) => (
                              <Pressable
                                key={entry.label}
                                accessibilityRole="button"
                                accessibilityLabel={entry.label}
                                onPress={() => {
                                  onClose();
                                  router.push(entry.route);
                                }}
                                // @ts-ignore hovered is web-only; pressed covers mobile
                                style={({ hovered, pressed }) => [
                                  styles.groupItemRow,
                                ]}
                              >
                                {({ hovered, pressed }) => (
                                  <>
                                    <Text
                                      style={[
                                        styles.groupItem,
                                        styles.groupItemLink,
                                      ]}
                                    >
                                      {entry.label}
                                    </Text>
                                    <AnimatedUnderline
                                      active={hovered || pressed}
                                    />
                                  </>
                                )}
                              </Pressable>
                            ))
                          : null}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            );
          }

          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={onClose}
              // @ts-ignore hovered is web-only; pressed covers mobile
              style={({ hovered, pressed }) => [styles.menuItem]}
            >
              {({ hovered, pressed }) => (
                <>
                  <Text style={styles.menuText}>{item.label}</Text>
                  <AnimatedUnderline active={hovered || pressed} />
                </>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </OverlayShell>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: spacing.lg + 8,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl * 2,
    gap: spacing.xs,
  },
  menuItem: {
    alignSelf: "flex-start",
    position: "relative",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: 10,
  },
  menuItemActive: {
    alignSelf: "flex-start",
    borderRadius: 0,
  },
  menuItemOpen: {
    backgroundColor: colors.surface,
    borderRadius: 0,
  },
  menuText: {
    color: "#f7f7fa",
    fontSize: 28,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    lineHeight: 34,
  },
  menuTextActive: {
    color: colors.textPrimary,
  },
  academicsBlock: {
    gap: spacing.xs,
  },
  submenu: {
    paddingLeft: spacing.md,
    gap: spacing.md,
  },
  group: {
    gap: spacing.xs,
  },
  groupTrigger: {
    alignSelf: "flex-start",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 2,
  },
  groupTriggerActive: {
    alignSelf: "flex-start",
  },
  groupTitle: {
    color: "#f7f7fa",
    fontSize: 18,
    fontFamily: FontFamilies.headingBold,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  groupTitleActive: {
    color: "#f7f7fa",
  },
  groupIndicator: {
    color: "#f7f7fa",
    fontSize: 22,
    lineHeight: 22,
    fontFamily: FontFamilies.headingBold,
    fontWeight: "800",
  },
  groupIndicatorActive: {
    color: "#f7f7fa",
  },
  groupItem: {
    color: "#d8dce5",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: FontFamilies.bodySemi,
    paddingLeft: spacing.xs,
    textTransform: "uppercase",
  },
  groupItemRow: {
    alignSelf: "flex-start",
    position: "relative",
  },
  groupItemLink: {
    color: colors.surface,
  },
  underlineTrack: {
    ...StyleSheet.absoluteFillObject,
  },
  animatedUnderline: {
    position: "absolute",
    left: 0,
    height: 2,
    backgroundColor: colors.primary,
  },
});
