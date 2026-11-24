import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { cores } from "@/estilos/cores";

/** Voltar padrão do app: "← Voltar" em texto laranja, no topo da tela. */
export function Voltar() {
  function voltar() {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      onPress={voltar}
      hitSlop={12}
      style={({ pressed }) => [estilos.botao, pressed && estilos.pressionado]}
    >
      <Text style={estilos.texto}>← Voltar</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  pressionado: {
    opacity: 0.6,
  },
  texto: {
    color: cores.laranja,
    fontFamily: "AndikaRegular",
    fontSize: 16,
  },
});
