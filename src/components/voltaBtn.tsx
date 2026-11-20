import { StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";

import { cores } from "@/estilos/cores";

export function Voltar() {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.back()}
      style={estilos.button}
    >
      <Text style={estilos.voltar}>Voltar</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  voltar: {
    color: cores.creme,
    fontFamily: "AndikaRegular",
    fontSize: 16,
  },
  button: {
    backgroundColor: cores.ciano,
    borderRadius: 8,
    minWidth: 70,
    minHeight: 50,

    alignItems: "center",
    justifyContent: "center",
  }
});
