import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

import TelaPainel from "@/app/painel";
import { PARCEIROS } from "@/dados";
import { buscarParceiros } from "@/regras/buscarParceiros";
import TelaDetalhe from "@/app/detalhe/[id]";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

function abrirPainel() {
  return renderRouter({ painel: TelaPainel }, { initialUrl: "/painel" });
}

function nomesNaTela() {
  return screen.queryAllByTestId("nome-parceiro").map((nome) => nome.props.children);
}

describe("Painel de busca", () => {
  test("avisa que os dados dos parceiros são fictícios", async () => {
    await abrirPainel();
    expect(screen.getByText(/os dados dos parceiros são fictícios/i)).toBeOnTheScreen();
  });

  test("sem cidade escolhida, pede para escolher uma cidade", async () => {
    await abrirPainel();
    expect(screen.getByText("Escolha uma cidade para ver os parceiros.")).toBeOnTheScreen();
  });

  test("ao escolher a cidade, lista os parceiros dela na ordem de busca", async () => {
    await abrirPainel();
    await fireEvent.press(screen.getByRole("button", { name: "Itajaí" }));
    const esperados = buscarParceiros(PARCEIROS, "Itajaí").map((p) => p.nome);
    expect(esperados.length).toBeGreaterThan(0);
    expect(nomesNaTela()).toEqual(esperados);
  });

  test("filtra pelo serviço escolhido e volta a mostrar todos", async () => {
    await abrirPainel();
    await fireEvent.press(screen.getByRole("button", { name: "Itajaí" }));
    await fireEvent.press(screen.getByRole("button", { name: "Hospedagem" }));
    const hospedagem = buscarParceiros(PARCEIROS, "Itajaí", "hospedagem");
    expect(nomesNaTela()).toEqual(hospedagem.map((p) => p.nome));

    await fireEvent.press(screen.getByRole("button", { name: "Todos" }));
    const todos = buscarParceiros(PARCEIROS, "Itajaí");
    expect(nomesNaTela()).toEqual(todos.map((p) => p.nome));
  });

  test("cidade sem parceiros mostra uma mensagem em vez de lista vazia", async () => {
    await abrirPainel();
    await fireEvent.press(screen.getByRole("button", { name: "Porto Belo" }));
    expect(screen.getByText("Nenhum parceiro encontrado em Porto Belo.")).toBeOnTheScreen();
    expect(nomesNaTela()).toHaveLength(0);
  });

  test("o cartão leva o serviço escolhido para o detalhe", async () => {
    const app = renderRouter({ painel: TelaPainel, "detalhe/[id]": TelaDetalhe }, { initialUrl: "/painel" });
    await app;
    await fireEvent.press(screen.getByRole("button", { name: "Itajaí" }));
    await fireEvent.press(screen.getByRole("button", { name: "Passeio" }));
    await fireEvent.press(screen.getByText("Ana Luísa Souza"));

    expect(app.getPathname()).toBe("/detalhe/p01");
    expect(app.getSearchParams()).toEqual({ id: "p01", servico: "passeio" });
  });
});
