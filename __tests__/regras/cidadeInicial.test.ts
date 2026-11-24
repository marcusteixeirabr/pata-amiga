import { cidadeInicialDoPainel } from "@/regras/cidadeInicial";

describe("Cidade que o painel já abre selecionada", () => {
  test("cidade do perfil que está na lista vem selecionada", () => {
    expect(cidadeInicialDoPainel("Itajaí")).toBe("Itajaí");
    expect(cidadeInicialDoPainel("Porto Belo")).toBe("Porto Belo");
  });

  test("cidade Outra não seleciona nada: o tutor escolhe no painel", () => {
    expect(cidadeInicialDoPainel("Outra")).toBeNull();
  });

  test("sem cidade no perfil não seleciona nada", () => {
    expect(cidadeInicialDoPainel(null)).toBeNull();
    expect(cidadeInicialDoPainel(undefined)).toBeNull();
  });

  test("cidade gravada que não está mais na lista não seleciona nada", () => {
    // O dado vem do armazenamento do celular: pode ser de uma versão antiga do app.
    expect(cidadeInicialDoPainel("Gaspar")).toBeNull();
  });
});
