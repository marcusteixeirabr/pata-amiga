import TelaEscolha from "@/app/escolha";
import TelaParceiro from "@/app/parceiro";
import TelaTutor from "@/app/tutor";
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

  test("da tela escolha vai para a tela tutor", async () => {
    const app = renderRouter(
      {
        escolha: TelaEscolha,
        tutor: TelaTutor,
      },
      {
        initialUrl: "/escolha",
      },
    );
    await app;
    expect(app.getPathname()).toBe("/escolha");
    await fireEvent.press(screen.getByText("Sou Tutor"));
    expect(app.getPathname()).toBe("/tutor");
  });
});
