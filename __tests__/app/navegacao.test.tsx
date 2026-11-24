import TelaDetalhe from "@/app/detalhe/[id]";
import TelaEscolha from "@/app/escolha";
import TelaPainel from "@/app/painel";
import TelaParceiro from "@/app/parceiro";
import TelaTutor from "@/app/cadastro";
import { router } from "expo-router";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    await fireEvent.press(screen.getByRole("button", { name: "Voltar" }));
    expect(app.getPathname()).toBe("/escolha");
  });

  test("da tela escolha vai para a tela tutor", async () => {
    const app = renderRouter(
      {
        escolha: TelaEscolha,
        cadastro: TelaTutor,
      },
      {
        initialUrl: "/escolha",
      },
    );
    await app;
    expect(app.getPathname()).toBe("/escolha");
    await fireEvent.press(screen.getByText("Sou Tutor"));
    expect(app.getPathname()).toBe("/cadastro");
  });

  test("da tela painel para a tela detalhe do parceiro", async () => {
    const app = renderRouter(
      {
        painel: TelaPainel,
        "detalhe/[id]": TelaDetalhe,
      },
      {
        initialUrl: "/painel",
      },
    );
    await app;
    expect(app.getPathname()).toBe("/painel");
    await fireEvent.press(screen.getByRole("button", { name: "Itajaí" }));
    await fireEvent.press(screen.getByText("Ana Luísa Souza"));
    expect(app.getPathname()).toBe("/detalhe/p01");
    expect(screen.getByText("Horário de atendimento")).toBeOnTheScreen();
  });

  test("da tela painel para a tela meu perfil", async () => {
    const app = renderRouter(
      {
        painel: TelaPainel,
        cadastro: TelaTutor,
      },
      {
        initialUrl: "/painel",
      },
    );
    await app;
    expect(app.getPathname()).toBe("/painel");
    await fireEvent.press(screen.getByRole("link", { name: "Meu perfil" }));
    expect(app.getPathname()).toBe("/cadastro");
  });

  test("da tela meu perfil volta para a tela painel", async () => {
    const app = renderRouter(
      {
        painel: TelaPainel,
        cadastro: TelaTutor,
      },
      {
        initialUrl: "/painel",
      },
    );
    await app;
    await fireEvent.press(screen.getByRole("link", { name: "Meu perfil" }));
    expect(app.getPathname()).toBe("/cadastro");
    await fireEvent.press(screen.getByRole("button", { name: "Voltar" }));
    expect(app.getPathname()).toBe("/painel");
  });

  test("da tela meu perfil, após apagar perfil, volta para a tela escolha", async () => {
    await AsyncStorage.setItem(
      "tutor",
      JSON.stringify({
        nome: "Tutor Teste",
        cidade: "Itajaí",
        fotoPets: [null, null],
        fotoTutor: null,
      }),
    );
    const app = renderRouter(
      {
        painel: TelaPainel,
        cadastro: TelaTutor,
        escolha: TelaEscolha,
      },
      {
        initialUrl: "/painel",
      },
    );
    await app;
    await fireEvent.press(screen.getByRole("link", { name: "Meu perfil" }));
    expect(app.getPathname()).toBe("/cadastro");
    await fireEvent.press(screen.getByRole("button", { name: "Apagar perfil" }));
    await fireEvent.press(screen.getByText("Sim, apagar"));
    expect(app.getPathname()).toBe("/escolha");
    expect(router.canGoBack()).toBe(false);
  });
});
