import { JANELA_PARA_SAIR_MS, confirmaSaida } from "@/regras/sairDoApp";

describe("Voltar duas vezes para sair do app", () => {
  const AGORA = 1_000_000;

  test("o primeiro toque no voltar não sai: só avisa", () => {
    expect(confirmaSaida(AGORA, null)).toBe(false);
  });

  test("o segundo toque dentro da janela sai do app", () => {
    expect(confirmaSaida(AGORA, AGORA - 500)).toBe(true);
    expect(confirmaSaida(AGORA, AGORA - (JANELA_PARA_SAIR_MS - 1))).toBe(true);
  });

  test("o segundo toque depois da janela vale como um novo primeiro toque", () => {
    expect(confirmaSaida(AGORA, AGORA - JANELA_PARA_SAIR_MS)).toBe(false);
    expect(confirmaSaida(AGORA, AGORA - 10_000)).toBe(false);
  });
});
