import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppTheme, FontFamilies } from "@/constants/theme";
import { OverlayHeader } from "./overlay-header";
import { OverlayShell } from "./overlay-shell";

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
    <OverlayShell
      visible={visible}
      onClose={onClose}
      backgroundColor={DARK_BG}
      safeAreaStyle={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <OverlayHeader
          logoSource={require("@/assets/images/gwc-logo-new-white.png")}
          title="GWC"
          subtitle="Grade Portal"
          onHomePress={handleHomePress}
          onClose={onClose}
          closeLabel="Close search"
          accentColor={ACCENT}
        />

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
                  <FontAwesome5 name="times-circle" size={18} color="#8b8b93" />
                </Pressable>
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Search"
              onPress={handleSearch}
              // @ts-ignore hovered is supported in Expo web; pressed covers native
              style={({ pressed, hovered }) => [
                styles.searchButton,
                (pressed || hovered) && styles.searchButtonActive,
              ]}
            >
              {
                // @ts-ignore hovered is available on web
                ({ pressed, hovered }) => (
                  <>
                    <Text style={styles.searchButtonText}>Search</Text>
                    <FontAwesome5
                      name="search"
                      size={18}
                      color="#fff"
                      style={[
                        styles.searchIcon,
                        (pressed || hovered) && styles.searchIconActive,
                      ]}
                    />
                  </>
                )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </OverlayShell>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
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
    // High-contrast dark-blue glow (base)
    shadowColor: "#0c1f58",
    shadowOpacity: 0.48,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 9 },
    elevation: 18,
  },
  searchButtonActive: {
    backgroundColor: "#000",
    // Deeper blue glow on hover/press
    shadowColor: "#1f4baa",
    shadowOpacity: 0.75,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 },
    elevation: 28,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: typography.subtitle + 2,
    fontWeight: "700",
    fontFamily: FontFamilies.headingBold,
    letterSpacing: 0.4,
  },
  searchIcon: {
    transform: [{ translateX: 0 }],
  },
  searchIconActive: {
    transform: [{ translateX: 4 }],
  },
});
