import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SearchOverlay } from "@/components/search-overlay";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing, typography } = AppTheme;

// Extracted SearchBar component for reusability
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search",
  autoFocus = false,
}: SearchBarProps) {
  const handleSubmit = () => {
    onSubmit?.();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.searchRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Submit search"
        accessibilityHint="Performs the search with the entered text"
        style={({ pressed }) => [
          styles.searchButton,
          pressed && styles.searchButtonPressed,
        ]}
        onPress={handleSubmit}
      >
        <FontAwesome5 name="search" size={22} color={colors.surface} />
      </Pressable>
    </View>
  );
}

// Main screen component
export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Searching for:", query);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Header
        hideAnnouncementsIcon
        onSearchPress={() => setIsSearchOpen(true)}
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 0 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.landingSection}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSearch}
            placeholder="Search"
            autoFocus={false}
          />
        </View>

        <Footer bottomInset={insets.bottom} />
      </ScrollView>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  content: {
    backgroundColor: colors.pageBackground,
    // Removed gap
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  landingSection: {
    backgroundColor: colors.pageBackground,
    // Added 40px padding all around
    padding: 40,
    marginHorizontal: 0,
    marginTop: 0,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    overflow: "hidden",
    height: 56,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: spacing.lg,
    fontSize: typography.body,
    fontFamily: FontFamilies.body,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        paddingVertical: 0,
      },
      android: {
        paddingVertical: 0,
        textAlignVertical: "center",
      },
    }),
  },
  searchButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchButtonPressed: {
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
});
