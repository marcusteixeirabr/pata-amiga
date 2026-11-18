import { Pressable, StyleSheet, Text } from "react-native";

import { cores } from "@/estilos/cores";

type ChipProps = {
  rotulo: string;
  selecionado: boolean;
  onPress: () => void;
};

export function Chip({ rotulo, selecionado, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: selecionado }}
      onPress={onPress}
      style={[estilos.chip, selecionado && estilos.chipSelecionado]}
    >
      <Text style={[estilos.texto, selecionado && estilos.textoSelecionado]}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipSelecionado: { backgroundColor: cores.laranja },
  texto: { color: cores.laranja, fontFamily: "AndikaRegular" },
  textoSelecionado: { color: cores.branco },
});
