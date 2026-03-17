import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AppTheme, FontFamilies } from "@/constants/theme";

type SearchOverlayProps = {
  visible: boolean;
  onClose: () => void;
};

const { colors, spacing, typography } = AppTheme;
const DARK_BG = "#0d1424";
const ACCENT = colors.primary;

export function SearchOverlay({ visible, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleHomePress = () => {
    Keyboard.dismiss();
    onClose();
    router.push("/");
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    Keyboard.dismiss();
    onClose();

    if (!trimmedQuery) {
      return;
    }

    router.push({
      pathname: "/search",
      params: { query: trimmedQuery },
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      transparent={false}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={styles.headerBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go to home"
              onPress={handleHomePress}
              style={styles.logoRow}
            >
              <View style={styles.logoWrapper}>
                <Image
                  source={require("@/assets/images/gwc-logo-new-white.png")}
                  style={styles.logo}
                  contentFit="contain"
                />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.headerTitle}>GWC</Text>
                <Text style={styles.headerSubtitle}>Grade Portal</Text>
              </View>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close search"
              onPress={onClose}
              style={styles.closeButton}
            >
              <FontAwesome5 name="times-circle" size={28} color="#e6e6e6" />
            </Pressable>
          </View>

          <View style={styles.headerAccent} />

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.searchBox}>
              <TextInput
                placeholder="type keyword(s) here"
                placeholderTextColor="#8b8b93"
                value={query}
                onChangeText={setQuery}
                style={styles.input}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Search"
                onPress={handleSearch}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonText}>Search</Text>
                <FontAwesome5 name="search" size={18} color="#fff" />
              </Pressable>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: spacing.md + spacing.xs,
    minHeight: 98,
    paddingRight: spacing.md + spacing.sm,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: spacing.md,
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
    color: "#f5f5f5",
    letterSpacing: 0.2,
    lineHeight: typography.title + 8,
  },
  headerSubtitle: {
    marginTop: spacing.xs / 4,
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.accent,
    color: "#e0e6f4",
    letterSpacing: 0.4,
    lineHeight: typography.subtitle + 3,
  },
  closeButton: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  headerAccent: {
    height: 3,
    backgroundColor: ACCENT,
  },
  content: {
    paddingHorizontal: spacing.lg + 8,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xl * 2,
    gap: spacing.xl,
  },
  searchBox: {
    alignItems: "center",
    gap: spacing.md + 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c2f36",
    backgroundColor: "#1a1c22",
    color: "#f8f8fa",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: typography.subtitle + 4,
    fontFamily: FontFamilies.body,
    textAlign: "center",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: ACCENT,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: typography.subtitle + 2,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
  },
  helperText: {
    color: "#b4b6be",
    textAlign: "center",
    fontSize: typography.subtitle + 2,
    fontFamily: FontFamilies.body,
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 12,
  },
  emptyTitle: {
    color: "#e1e1e6",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
  },
  emptyBody: {
    color: "#a9abb3",
    fontSize: typography.subtitle + 1,
    fontFamily: FontFamilies.body,
    textAlign: "center",
  },
  results: {
    gap: spacing.md,
  },
  resultCard: {
    backgroundColor: "#1a1c22",
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "#22252d",
    gap: spacing.sm,
  },
  resultBadge: {
    alignSelf: "flex-start",
    backgroundColor: ACCENT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  resultBadgeText: {
    color: "#fff",
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontFamily: FontFamilies.accentBold,
  },
  resultTitle: {
    color: "#f7f7fa",
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.2,
  },
  resultSnippet: {
    color: "#cfd1d8",
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    fontFamily: FontFamilies.body,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  resultDate: {
    color: "#c7c7cf",
    fontSize: typography.caption + 1,
    fontFamily: FontFamilies.accent,
  },
});
