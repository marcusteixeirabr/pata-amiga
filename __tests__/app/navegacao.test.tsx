import TelaEscolha from "@/app/escolha";
import TelaParceiro from "@/app/parceiro";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

describe("Navegação", () => {
  test("da tela de escolha vai para a tela parceiro", async () => {
    const app = renderRouter(
      {
        escolha: TelaEscolha,
        parceiro: TelaParceiro,
      },
      { initialUrl: "/escolha" },
    );
    await app;
    expect(app.getPathname()).toBe("/escolha");
    await fireEvent.press(screen.getByText("Sou Parceiro"));
    expect(app.getPathname()).toBe("/parceiro");
  });

  test("da tela parceiro vai para a tela de escolha", async () => {
    const app = renderRouter(
      {
        escolha: TelaEscolha,
        parceiro: TelaParceiro,
      },
      { initialUrl: "/escolha" },
    );
    await app;
    await fireEvent.press(screen.getByText("Sou Parceiro"));
    expect(app.getPathname()).toBe("/parceiro");
    await fireEvent.press(screen.getByText("Voltar"));
    expect(app.getPathname()).toBe("/escolha");
  });
});
