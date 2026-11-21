import { TutorDTO } from "@/modelos/tutor";
import { telaInicial } from "@/regras/telaInicial";

describe("Tela Inicial", () => {
  test("Com perfil de tutor salvo, o app abre direto o painel", () => {
    const perfil: TutorDTO = {
      nome: "João",
      cidade: "Balneário Camboriú",
    };
    expect(telaInicial(perfil)).toBe("painel");
  });

  test("Sem perfil salvo (ou depois de apagar), o app abre a tela de escolha", () => {
    expect(telaInicial(null)).toBe("escolha");
  });
});
