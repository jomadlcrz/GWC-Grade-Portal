import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuOverlay } from "@/components/menu-overlay";
import { SearchOverlay } from "@/components/search-overlay";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing } = AppTheme;

const programContent = {
  "bachelor-of-science-in-information-technology": {
    title: "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
    paragraphs: [
      {
        before:
          "Unleash the gateway that connects your dream to your competence with the ",
        bold: "Bachelor of Science in Information Technology (BSIT)",
        after:
          " Program. The BSIT is a four (4) year program well-suited for individuals who are analytical, detail-oriented, and problem-solvers- skills that are essential in engaging with computing solutions.",
      },
      {
        text: "The BSIT Program develops your competence in IT Infrastructure Management, Front-end and Back-end Web Development, Mobile and Microcontroller-Based Applications, Database Management, Software Engineering, including Testing and Documentation, and Project Management. Moreover, you are prepared in acquiring other technical skills in Multimedia and Animation, Cyber Security, Game Development, and Techno-preneurship for a solid skillset to meet the demand of the industries you dream to engage in.",
      },
      {
        text: "The BSIT Program is one of the pioneer programs in the College. Established in 2008, the program has gone far in terms of providing quality and efficient education. The program is duly recognized by the Commission on Higher Education (CHED) and has a Level 1 accreditation from the Association of Local Colleges and Universities, Commission on Accreditation (ALCUCOA). Our Capstone researches have been constantly accepted and presented and have earned awards in various competitions and International Research Conferences.",
      },
      {
        text: "Alongside quality education is our commitment to provide the latest and advanced technology. Our program boasts a number of its laboratories that level up our delivery of education with global standards such as our CISCO Lab, and the newly established MAC laboratory. We also take pride with our Institute of Computing Studies (ICS) team, composed of competent faculty line up ready to implement flexible learning scheme fit to students' teaching and learning needs.",
      },
    ],
  },
} as const;

type ProgramSlug = keyof typeof programContent;

export default function ProgramDetailScreen() {
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug;
  const program =
    resolvedSlug && resolvedSlug in programContent
      ? programContent[resolvedSlug as ProgramSlug]
      : null;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Header
        hideAnnouncementsIcon
        onSearchPress={() => setIsSearchOpen(true)}
        onMenuPress={() => setIsMenuOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ACADEMICS | PROGRAMS</Text>
          <Text style={styles.heroTitle}>
            {program?.title ?? "PROGRAM NOT FOUND"}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.contentCard}>
            {program ? (
              <>
                <Text style={styles.paragraph}>
                  {program.paragraphs[0].before}
                  <Text style={styles.paragraphBold}>
                    {program.paragraphs[0].bold}
                  </Text>
                  {program.paragraphs[0].after}
                </Text>

                {program.paragraphs.slice(1).map((paragraph) => (
                  <Text key={paragraph.text} style={styles.paragraph}>
                    {paragraph.text}
                  </Text>
                ))}
              </>
            ) : (
              <Text style={styles.paragraph}>
                The requested academic program page is not available yet.
              </Text>
            )}
          </View>
        </View>

        <Footer bottomInset={insets.bottom} />
      </ScrollView>

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
    backgroundColor: colors.surface,
  },
  content: {
    backgroundColor: colors.surface,
  },
  hero: {
    backgroundColor: "#494646",
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 34,
    gap: spacing.sm,
  },
  eyebrow: {
    color: "#d8d8dd",
    fontSize: 13,
    fontFamily: FontFamilies.accentBold,
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: FontFamilies.headingBold,
    textTransform: "uppercase",
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#eef1f6",
  },
  contentCard: {
    borderRadius: 10,
    padding: 0,
    gap: 18,
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamilies.body,
    textAlign: "justify",
  },
  paragraphBold: {
    fontFamily: FontFamilies.bodyBold,
    color: colors.textPrimary,
  },
});
