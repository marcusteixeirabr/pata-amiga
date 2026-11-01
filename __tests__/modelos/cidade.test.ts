import { CIDADES, type Cidade } from "@/modelos/cidade";

describe("Cidades", () => {
  test("tem as 8 cidades fixas da região, em ordem alfabética", () => {
    expect(CIDADES).toEqual([
      "Balneário Camboriú",
      "Blumenau",
      "Brusque",
      "Camboriú",
      "Florianópolis",
      "Itajaí",
      "Itapema",
      "Porto Belo",
    ]);
  });

  test("o TypeScript recusa cidade fora da lista", () => {
    // @ts-expect-error Joinville não está na lista fixa
    const cidade: Cidade = "Joinville";
  });
});
