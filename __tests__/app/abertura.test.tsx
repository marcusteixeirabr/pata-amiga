import { act } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";

import TelaEscolha from "@/app/escolha";
import Abertura from "@/app/index";

describe("Tela de abertura", () => {
  test("sem perfil salvo, vai para a escolha depois de 2 segundos", async () => {
    const app = renderRouter(
      { index: Abertura, escolha: TelaEscolha },
      { initialUrl: "/" },
    );
    await app;
    expect(app.getPathname()).toBe("/");

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(app.getPathname()).toBe("/escolha");
  });
});
