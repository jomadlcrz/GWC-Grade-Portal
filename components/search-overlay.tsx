import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<TextInput>(null);

  // Auto-focus the input when the modal opens
  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

      return () => clearTimeout(timeoutId);
    } else {
      // Optional: Clear the search query when the modal closes
      setQuery("");
    }
  }, [visible]);

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

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      transparent={false}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Header Bar */}
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

          {/* Search Content */}
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.searchBox}>
              {/* Input Wrapper for positioning the Clear Button */}
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={inputRef}
                  placeholder="type keyword(s) here"
                  placeholderTextColor="#8b8b93"
                  value={query}
                  onChangeText={setQuery}
                  style={styles.input}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                />

                {query.length > 0 && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Clear search"
                    onPress={handleClear}
                    style={styles.clearIcon}
                  >
                    <FontAwesome5
                      name="times-circle"
                      size={18}
                      color="#8b8b93"
                    />
                  </Pressable>
                )}
              </View>

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
  inputWrapper: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c2f36",
    backgroundColor: "#1a1c22",
    color: "#f8f8fa",
    borderRadius: 12,
    paddingVertical: 16,
    paddingLeft: 18, // Added padding to center text visually considering the right icon
    paddingRight: 40, // Make room for the clear button
    fontSize: typography.subtitle + 4,
    fontFamily: FontFamilies.body,
  },
  clearIcon: {
    position: "absolute",
    right: 14,
    padding: 6, // Larger touch target
    zIndex: 10,
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
});
