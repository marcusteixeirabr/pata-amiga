import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Folha } from "@/components/Folha";

const CELULAR_COM_3_BOTOES = {
  frame: { x: 0, y: 0, width: 411, height: 891 },
  insets: { top: 32, bottom: 48, left: 0, right: 0 },
};

async function abrirFolha(aoFechar = jest.fn()) {
  await render(
    <SafeAreaProvider initialMetrics={CELULAR_COM_3_BOTOES}>
      <Folha visivel titulo="Apagar seu perfil?" aoFechar={aoFechar}>
        <Text>Conteúdo da folha</Text>
      </Folha>
    </SafeAreaProvider>,
  );
  return aoFechar;
}

describe("Folha que sobe de baixo", () => {
  test("mostra o título e o conteúdo", async () => {
    await abrirFolha();
    expect(screen.getByText("Apagar seu perfil?")).toBeOnTheScreen();
    expect(screen.getByText("Conteúdo da folha")).toBeOnTheScreen();
  });

  test("tocar fora da folha fecha", async () => {
    const aoFechar = await abrirFolha();
    await fireEvent.press(screen.getByTestId("folha-fundo"));
    expect(aoFechar).toHaveBeenCalledTimes(1);
  });

  test("o fim da folha fica acima dos botões do sistema", async () => {
    await abrirFolha();
    const folha = StyleSheet.flatten(screen.getByTestId("folha").props.style);
    expect(folha.paddingBottom).toBeGreaterThan(CELULAR_COM_3_BOTOES.insets.bottom);
  });
});
