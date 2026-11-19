import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextTitle } from "@/components/TextTitle";
import { cores } from "@/estilos/cores";

export default function TelaParceiro() {
  return (
    <View style={estilos.tela}>
      <TextTitle style={estilos.titulo}>Seja um parceiro</TextTitle>
      <Text style={estilos.texto}>
        O cadastro de cuidadores, petshops e ONGs chega na próxima versão do
        Pata Amiga.
      </Text>
      <Text style={estilos.texto}>
        Por enquanto, os parceiros que aparecem no app são fictícios, criados
        para demonstração.
      </Text>

      <Pressable
        accessibilityRole="button"
        style={estilos.botao}
        onPress={() => router.back()}
      >
        <Text style={estilos.botaoTexto}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.creme,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },
  titulo: { fontSize: 32, color: cores.azul, textAlign: "center" },
  texto: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    fontSize: 17,
    textAlign: "center",
  },
  botao: {
    backgroundColor: cores.laranja,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  botaoTexto: {
    color: cores.branco,
    fontFamily: "AndikaRegular",
    fontSize: 18,
  },
});
