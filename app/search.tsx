import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SearchOverlay } from "@/components/search-overlay";
import { AppTheme, FontFamilies } from "@/constants/theme";

const { colors, spacing } = AppTheme;

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
        style={({ pressed }) => [
          styles.searchButton,
          pressed && styles.searchButtonPressed,
        ]}
        onPress={handleSubmit}
      >
        <FontAwesome5 name="search" size={28} color={colors.surface} />
      </Pressable>
    </View>
  );
}

function TablePanel() {
  return (
    <View style={styles.tablePanel}>
      <div style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Search Results</Text>
      </div>
      <View style={styles.tableContent}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Sorry, you must enter at least one search criteria before you can
            continue
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Responsive padding: use 40 only if screen is wide enough
  const horizontalPadding = width < 400 ? 20 : 40;

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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.landingSection,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSearch}
          />
        </View>

        <View style={{ paddingHorizontal: horizontalPadding }}>
          <TablePanel />
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
    paddingBottom: 0,
  },
  landingSection: {
    paddingVertical: 40,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "stretch", // Ensures children fill height
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    height: 80,
    width: "100%",
    overflow: "hidden",
  },
  input: {
    flex: 1, // Takes up remaining space
    minWidth: 0, // Allows input to shrink below its content width
    height: "100%",
    paddingHorizontal: spacing.lg,
    fontSize: 24, // Slightly reduced for mobile fit; stays large
    fontFamily: FontFamilies.body,
    color: colors.textPrimary,
  },
  searchButton: {
    width: 80,
    flexShrink: 0, // CRITICAL: Prevents button from disappearing on small screens
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  tablePanel: {
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tableHeader: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.pageBackground || colors.surface,
  },
  tableHeaderText: {
    fontSize: 24,
    fontFamily: FontFamilies.body,
    color: colors.textPrimary,
  },
  tableContent: {
    padding: spacing.xl,
    minHeight: 200,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 22,
    fontFamily: FontFamilies.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22 * 1.4,
  },
});
