import { act } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";

import TelaEscolha from "@/app/escolha";
import Abertura from "@/app/index";
import { TutorService, TutorDTO } from "@/modelos/tutor";

const TUTOR: TutorDTO = { nome: "Marcus", cidade: "Itajaí" };

jest.mock("@/modelos/tutor", () => {
  return require("../../__mocks__/testMocks");
});

beforeEach(() => {
  jest.mocked(TutorService).mockImplementation(
    () =>
      ({
        hasTutor: jest.fn().mockResolvedValue(false),
        consultar: jest.fn().mockResolvedValue(TUTOR),
      }) as unknown as TutorService,
  );
});

describe("Tela de abertura", () => {
  test("sem perfil salvo, fica 3 segundos na abertura e vai para a escolha", async () => {
    const app = renderRouter({ index: Abertura, escolha: TelaEscolha }, { initialUrl: "/" });
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
