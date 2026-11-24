import { StyleSheet, Text, View } from "react-native";

import { Voltar } from "@/components/BtnVoltar";
import { Tela } from "@/components/Tela";
import { TextTitle } from "@/components/TextTitle";
import { cores } from "@/estilos/cores";

export default function TelaParceiro() {
  return (
    <Tela estiloConteudo={estilos.conteudo}>
      <Voltar />

      <View style={estilos.centro}>
        <TextTitle style={estilos.titulo}>Seja um parceiro</TextTitle>
        <Text style={estilos.texto}>
          O cadastro de cuidadores, petshops e ONGs chega na próxima versão do
          Pata Amiga.
        </Text>
        <Text style={estilos.texto}>
          Por enquanto, os parceiros que aparecem no app são fictícios, criados
          para demonstração.
        </Text>
      </View>
    </Tela>
  );
}

const estilos = StyleSheet.create({
  conteudo: { flexGrow: 1 },
  centro: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 4,
  },
  titulo: { fontSize: 32, color: cores.azul, textAlign: "center" },
  texto: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    fontSize: 17,
    textAlign: "center",
  },
});
