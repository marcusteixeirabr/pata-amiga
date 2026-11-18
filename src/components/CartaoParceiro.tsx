import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { cores } from "@/estilos/cores";
import type { Parceiro } from "@/modelos/parceiro";
import { formatarAvaliacoes } from "@/regras/formatar";

export function CartaoParceiro({ parceiro }: { parceiro: Parceiro }) {
  return (
    <Link
      href={{ pathname: "/detalhe/[id]", params: { id: parceiro.id } }}
      asChild
    >
      <Pressable style={estilos.cartao}>
        <Text testID="nome-parceiro" style={estilos.nome}>
          {parceiro.nome}
        </Text>
        <Text style={estilos.info}>
          {`${parceiro.tipo} · ${formatarAvaliacoes(parceiro)}`}
        </Text>
        {parceiro.verificado && <Text style={estilos.selo}>✓ Verificado</Text>}
      </Pressable>
    </Link>
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
