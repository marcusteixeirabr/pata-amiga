import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cores } from "@/estilos/cores";

type FolhaProps = {
  visivel: boolean;
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
};

/**
 * Folha que sobe da parte de baixo da tela (bottom sheet).
 *
 * - Tocar fora da folha ou no voltar do aparelho fecha.
 * - O fim da folha fica acima dos botões do sistema (insets.bottom).
 */
export function Folha({ visivel, titulo, aoFechar, children }: FolhaProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={aoFechar}
    >
      <View style={estilos.fundo}>
        <Pressable
          testID="folha-fundo"
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          style={StyleSheet.absoluteFill}
          onPress={aoFechar}
        />
        <View
          testID="folha"
          style={[estilos.folha, { paddingBottom: insets.bottom + 20 }]}
        >
          <Text style={estilos.titulo}>{titulo}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  folha: {
    backgroundColor: cores.branco,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  titulo: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    fontSize: 18,
    marginBottom: 4,
  },
});
