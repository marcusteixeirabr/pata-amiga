import { SERVICOS } from "@/modelos/servico";

describe("ambiente de testes", () => {
  test("resolve o atalho @/ e lê os serviços do MVP", () => {
    expect(SERVICOS).toEqual(["passeio", "visita", "hospedagem"]);
  });
});
