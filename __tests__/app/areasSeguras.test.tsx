import { renderRouter, screen } from "expo-router/testing-library";
import { StyleSheet } from "react-native";

import TelaCadastro from "@/app/cadastro";
import TelaDetalhe from "@/app/detalhe/[id]";
import TelaPainel from "@/app/painel";

// Celular com os 3 botões do Android embaixo (padrão dos Samsung):
// a barra de status ocupa 32 e os botões ocupam 48 no fim da tela.
const BARRA_DE_STATUS = 32;
const BOTOES_DO_SISTEMA = 48;

jest.mock("react-native-safe-area-context", () => {
  const real = jest.requireActual("react-native-safe-area-context");
  return {
    ...real,
    useSafeAreaInsets: () => ({ top: 32, bottom: 48, left: 0, right: 0 }),
  };
});

describe("Áreas seguras: o conteúdo não fica embaixo das barras do sistema", () => {
  test.each(["/cadastro", "/painel", "/detalhe/p01"])("%s", async (url) => {
    await renderRouter(
      { cadastro: TelaCadastro, painel: TelaPainel, "detalhe/[id]": TelaDetalhe },
      { initialUrl: url },
    );

    const conteudo = StyleSheet.flatten(screen.getByTestId("tela").props.contentContainerStyle);

    expect(conteudo.paddingTop).toBeGreaterThan(BARRA_DE_STATUS);
    expect(conteudo.paddingBottom).toBeGreaterThan(BOTOES_DO_SISTEMA);
  });
});
