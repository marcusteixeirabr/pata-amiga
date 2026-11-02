import type { Tutor } from "@/modelos/tutor/contrato";
import { telaInicial } from "@/regras/telaInicial";

describe("Tela Inicial", () => {
  test("Com perfil de tutor salvo, o app abre direto o painel", () => {
    const perfil: Tutor = {
      nome: "João",
      cidade: "Balneário Camboriú",
      fotoPets: [],
    };
    expect(telaInicial(perfil)).toBe("painel");
  });

  test("Sem perfil salvo (ou depois de apagar), o app abre a tela de escolha", () => {
    expect(telaInicial(null)).toBe("escolha");
  });
});
