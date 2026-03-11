import {
  MerriweatherSans_600SemiBold,
  MerriweatherSans_700Bold,
  useFonts as useMerriweatherSans,
} from "@expo-google-fonts/merriweather-sans";
import {
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts as useMontserrat,
} from "@expo-google-fonts/montserrat";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  useFonts as useOpenSans,
} from "@expo-google-fonts/open-sans";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  const [openSansLoaded] = useOpenSans({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const [montserratLoaded] = useMontserrat({
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  const [merriweatherSansLoaded] = useMerriweatherSans({
    MerriweatherSans_600SemiBold,
    MerriweatherSans_700Bold,
  });

  const fontsLoaded =
    openSansLoaded && montserratLoaded && merriweatherSansLoaded;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>

        <StatusBar style="dark" translucent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
