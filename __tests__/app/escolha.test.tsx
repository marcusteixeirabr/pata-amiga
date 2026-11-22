import { renderRouter, screen } from "expo-router/testing-library";

import TelaEscolha from "@/app/escolha";
import TelaParceiro from "@/app/parceiro";

describe("Tela de escolha (RF02)", () => {
  test("explica cada opção para quem abre o app pela primeira vez", async () => {
    await renderRouter({ escolha: TelaEscolha }, { initialUrl: "/escolha" });

    expect(screen.getByText("Como você quer usar o app?")).toBeOnTheScreen();
    expect(screen.getByRole("link", { name: /sou tutor.*cuide do meu pet/i })).toBeOnTheScreen();
    expect(screen.getByRole("link", { name: /sou parceiro.*petshop ou ONG/i })).toBeOnTheScreen();
  });
});

describe("Placeholder de parceiro (RF04)", () => {
  test("avisa que o cadastro de parceiros chega numa próxima versão", async () => {
    await renderRouter({ parceiro: TelaParceiro }, { initialUrl: "/parceiro" });

    expect(screen.getByText(/próxima versão/i)).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: "Voltar" })).toBeOnTheScreen();
  });
});
