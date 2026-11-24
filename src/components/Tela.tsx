import type { ReactNode } from "react";
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cores } from "@/estilos/cores";

const ESPACO = 20;

type TelaProps = {
  children: ReactNode;
  /** Ajustes do conteúdo (gap, alinhamento). O espaço das barras do sistema é sempre aplicado. */
  estiloConteudo?: StyleProp<ViewStyle>;
};

/**
 * Base das telas com rolagem.
 *
 * O Android desenha o app atrás da barra de status e dos botões do sistema
 * (edge-to-edge). Esta tela soma esses espaços (insets) ao padding, para o
 * começo e o fim do conteúdo nunca ficarem embaixo das barras.
 */
export function Tela({ children, estiloConteudo }: TelaProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      testID="tela"
      style={estilos.tela}
      contentContainerStyle={[
        estilos.conteudo,
        estiloConteudo,
        { paddingTop: insets.top + ESPACO, paddingBottom: insets.bottom + ESPACO },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.creme },
  conteudo: { paddingHorizontal: ESPACO, gap: 16 },
});
