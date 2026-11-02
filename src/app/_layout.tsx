import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

// Mantém a splash screen visível enquanto as fontes carregam
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Carrega a fonte da pasta assets/fonts/
  const [loaded, error] = useFonts({
    Chewy: require("../../assets/fonts/Chewy-Regular.ttf"),
    AndikaRegular: require("../../assets/fonts/Andika-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Se a fonte ainda não carregou, exibe um indicador de carregamento
  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
