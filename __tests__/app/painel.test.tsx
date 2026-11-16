import TelaPainel from "@/app/painel";
import { renderRouter, screen } from "expo-router/testing-library";

function abrirPainel() {
  return renderRouter({ painel: TelaPainel }, { initialUrl: "/painel" });
}

describe("Painel de busca", () => {
  test("avisa que os dados dos parceiros são fictícios", async () => {
    await abrirPainel();
    expect(
      screen.getByText(/os dados dos parceiros são fictícios/i),
    ).toBeOnTheScreen();
  });

  test("sem cidade escolhida, pede para escolher uma cidade", async () => {
    await abrirPainel();
    expect(
      screen.getByText("Escolha uma cidade para ver os parceiros."),
    ).toBeOnTheScreen();
  });
});
