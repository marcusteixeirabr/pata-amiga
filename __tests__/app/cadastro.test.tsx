import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { act, fireEvent, renderRouter, screen, waitFor } from "expo-router/testing-library";

import TelaCadastro from "@/app/cadastro";
import TelaEscolha from "@/app/escolha";
import TelaPainel from "@/app/painel";

// A galeria e a câmera não existem no Jest: aqui o usuário sempre cancela.
jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true, assets: null }),
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  launchCameraAsync: jest.fn().mockResolvedValue({ canceled: true, assets: null }),
}));

const TUTOR_SALVO = {
  nome: "Marcus Teste",
  cidade: "Itajaí",
  fotoTutor: "file:///documentos/fotos/foto-tutor.jpg",
  fotoPets: [null, null],
};

async function salvarTutor(tutor: object = TUTOR_SALVO) {
  await AsyncStorage.setItem("tutor", JSON.stringify(tutor));
}

async function lerTutor() {
  return JSON.parse((await AsyncStorage.getItem("tutor")) ?? "null");
}

async function abrirMeuPerfil() {
  await renderRouter({ cadastro: TelaCadastro }, { initialUrl: "/cadastro" });
  await screen.findByDisplayValue("Marcus Teste");
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
});

describe("Meu perfil: foto do tutor", () => {
  test("fora da edição, tocar na foto não troca a foto pelas iniciais", async () => {
    await salvarTutor();
    await abrirMeuPerfil();
    expect(screen.queryByText("MT")).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole("button", { name: /foto de perfil/i }));

    expect(screen.queryByText("MT")).not.toBeOnTheScreen();
  });

  test("na edição, cancelar a galeria mantém a foto atual", async () => {
    await salvarTutor();
    await abrirMeuPerfil();
    await fireEvent.press(screen.getByRole("button", { name: "Editar perfil" }));

    await fireEvent.press(screen.getByRole("button", { name: /foto de perfil/i }));

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    expect(screen.queryByText("MT")).not.toBeOnTheScreen();
  });
});

describe("Meu perfil: modo de visualização", () => {
  test("nome e cidade só podem mudar depois de tocar em Editar perfil", async () => {
    await salvarTutor();
    await abrirMeuPerfil();
    expect(screen.getByDisplayValue("Marcus Teste")).toBeDisabled();
    expect(screen.getByRole("combobox", { name: "Cidade" })).toBeDisabled();

    await fireEvent.press(screen.getByRole("button", { name: "Editar perfil" }));

    expect(screen.getByDisplayValue("Marcus Teste")).toBeEnabled();
    expect(screen.getByRole("combobox", { name: "Cidade" })).toBeEnabled();
  });

  test("tocar fora do aviso de apagar fecha o aviso sem apagar", async () => {
    await salvarTutor();
    await abrirMeuPerfil();
    await fireEvent.press(screen.getByRole("button", { name: "Apagar perfil" }));
    expect(screen.getByText("Sim, apagar")).toBeOnTheScreen();

    await fireEvent.press(screen.getByTestId("folha-fundo"));

    expect(screen.queryByText("Sim, apagar")).not.toBeOnTheScreen();
    expect(await lerTutor()).not.toBeNull();
  });
});

describe("Salvar o perfil", () => {
  test("o primeiro cadastro abre o painel e o voltar não leva de novo à escolha", async () => {
    const app = renderRouter(
      { escolha: TelaEscolha, cadastro: TelaCadastro, painel: TelaPainel },
      { initialUrl: "/escolha" },
    );
    await app;
    await fireEvent.press(screen.getByText("Sou Tutor"));
    await fireEvent.changeText(await screen.findByPlaceholderText("Digite seu nome"), "Marcus");
    await fireEvent.press(screen.getByText("Onde você mora?"));
    await fireEvent.press(screen.getByText("Itajaí"));

    await fireEvent.press(screen.getByRole("button", { name: "Salvar perfil" }));

    await waitFor(() => expect(app.getPathname()).toBe("/painel"));
    expect(router.canGoBack()).toBe(false);
    expect((await lerTutor()).nome).toBe("Marcus");
  });

  test("editar e salvar continua no Meu perfil, avisa e volta para um painel só", async () => {
    await salvarTutor({ ...TUTOR_SALVO, fotoTutor: null });
    const app = renderRouter({ painel: TelaPainel, cadastro: TelaCadastro }, { initialUrl: "/painel" });
    await app;
    await act(() => router.push("/cadastro"));
    await screen.findByDisplayValue("Marcus Teste");
    await fireEvent.press(screen.getByRole("button", { name: "Editar perfil" }));
    await fireEvent.changeText(screen.getByDisplayValue("Marcus Teste"), "Marcus Editado");

    await fireEvent.press(screen.getByRole("button", { name: "Salvar perfil" }));

    expect(await screen.findByText("Perfil atualizado!")).toBeOnTheScreen();
    expect(app.getPathname()).toBe("/cadastro");
    expect(screen.getByDisplayValue("Marcus Editado")).toBeDisabled();
    expect((await lerTutor()).nome).toBe("Marcus Editado");

    await fireEvent.press(screen.getByRole("button", { name: "Voltar" }));
    expect(app.getPathname()).toBe("/painel");
    expect(router.canGoBack()).toBe(false);
  });
});
