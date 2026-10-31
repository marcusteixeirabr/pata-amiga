import { TIPOS_PARCEIRO } from "@/modelos/tipoParceiro";

describe("Tipos de parceiros", () => {
  test("tem os 3 tipos de parceiros disponíveis", () => {
    expect(TIPOS_PARCEIRO).toEqual(["Cuidador", "Petshop", "ONG"]);
  });
});
