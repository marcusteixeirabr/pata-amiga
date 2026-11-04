import Escolha from "@/app/tela-escolha";
import Parceiro from "@/app/tela-parceiro";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

describe("Navegação", () => {
  test("da tela de escolha vai para a tela parceiro", async () => {
    const app = renderRouter({
      "tela-escolha": Escolha,
      "tela-parceiro": Parceiro,
    });
    await app;
    expect(app.getPathname()).toBe("/tela-escolha");
    await fireEvent.press(screen.getByText("Sou Parceiro"));
    expect(app.getPathname()).toBe("/tela-parceiro");
  });
});
