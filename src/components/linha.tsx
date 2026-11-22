import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { cores } from "@/estilos/cores";

export function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={estilos.linha}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    gap: 2,
  },
  rotulo: { color: cores.cinza, fontFamily: "AndikaRegular", fontSize: 13 },
  valor: { color: cores.azul, fontFamily: "AndikaRegular", fontSize: 16 },
  whatsapp: {
    backgroundColor: cores.whatsapp,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  whatsappTexto: {
    color: cores.branco,
    fontFamily: "AndikaRegular",
    fontSize: 18,
  },
  mensagem: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    textAlign: "center",
    marginTop: 16,
  },
});
