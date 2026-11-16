import { StyleSheet, Text, View } from "react-native";

import { cores } from "@/estilos/cores";
import type { Parceiro } from "@/modelos/parceiro";

export function CartaoParceiro({ parceiro }: { parceiro: Parceiro }) {
  const nota = parceiro.notaMedia.toFixed(1).replace(".", ",");

  return (
    <View style={estilos.cartao}>
      <Text testID="nome-parceiro" style={estilos.nome}>
        {parceiro.nome}
      </Text>
      <Text style={estilos.info}>
        {`${parceiro.tipo} · ★ ${nota} (${parceiro.quantidadeAvaliacoes} avaliações)`}
      </Text>
      {parceiro.verificado && <Text style={estilos.selo}>✓ Verificado</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  nome: { color: cores.azul, fontFamily: "AndikaRegular", fontSize: 18 },
  info: { color: cores.cinza, fontFamily: "AndikaRegular" },
  selo: { color: cores.verde, fontFamily: "AndikaRegular" },
});
