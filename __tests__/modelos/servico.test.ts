import { SERVICOS } from "@/modelos/servico";

describe("Serviços", () => {
  test("tem os 3 serviços disponíveis", () => {
    expect(SERVICOS).toEqual(["passeio", "cuidados em casa", "hospedagem"]);
  });
});
