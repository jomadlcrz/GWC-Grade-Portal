import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
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

  const fontsLoaded = openSansLoaded && montserratLoaded && merriweatherSansLoaded;

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

        <StatusBar style="dark" translucent={false} backgroundColor="#ffffff" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
