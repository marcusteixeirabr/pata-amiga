import parceiros from "@/dados/parceiros.json";
import { CIDADES } from "@/modelos/cidade";
import { SERVICOS } from "@/modelos/servico";
import { TIPOS_PARCEIRO } from "@/modelos/tipoParceiro";

describe("Parceiros Mockados", () => {
  test.each(parceiros)("$nome tem cidade válida", (parceiro) => {
    expect(CIDADES).toContain(parceiro.cidade);
  });

  test.each(parceiros)("$nome tem tipo válido", (parceiro) => {
    expect(TIPOS_PARCEIRO).toContain(parceiro.tipo);
  });

  test.each(parceiros)("$nome tem serviços válidos", (parceiro) => {
    for (const servico of parceiro.servicos) {
      expect(SERVICOS).toContain(servico);
    }
  });

  test.each(parceiros)("$nome tem nota média entre 0 e 5", (parceiro) => {
    expect(parceiro.notaMedia).toBeGreaterThanOrEqual(0);
    expect(parceiro.notaMedia).toBeLessThanOrEqual(5);
  });

  test("o id é único na lista de parceiros", () => {
    const parceirosIdUnicos = new Set(parceiros.map((parceiro) => parceiro.id));
    expect(parceirosIdUnicos.size).toBe(parceiros.length);
  });
});
