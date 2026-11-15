import { act } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";

import TelaEscolha from "@/app/escolha";
import Abertura from "@/app/index";

describe("Tela de abertura", () => {
  test("sem perfil salvo, fica 3 segundos na abertura e vai para a escolha", async () => {
    const app = renderRouter(
      { index: Abertura, escolha: TelaEscolha },
      { initialUrl: "/" },
    );
    await app;
    expect(app.getPathname()).toBe("/");

    await act(async () => {
      jest.advanceTimersByTime(2999);
    });
    expect(app.getPathname()).toBe("/");

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(app.getPathname()).toBe("/escolha");
  });
});
