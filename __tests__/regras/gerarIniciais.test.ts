import { gerarIniciais } from "@/regras/gerarIniciais";

describe("Gerar Iniciais (RN07)", () => {
  test.each([
    { caso: "primeiro e último nome", nome: "Ana Luísa Souza", esperado: "AS" },
    { caso: "nome de duas palavras", nome: "Pet Help", esperado: "PH" },
    { caso: "uma palavra só", nome: "Mateus", esperado: "M" },
    { caso: "ignora símbolos", nome: "Patas & Focinhos", esperado: "PF" },
    { caso: "acentos", nome: "Ângela Évora", esperado: "ÂÉ" },
    {
      caso: "minúsculas e espaços sobrando",
      nome: "  ana  souza  ",
      esperado: "AS",
    },
  ])("$caso: $nome → $esperado", ({ nome, esperado }) => {
    expect(gerarIniciais(nome)).toBe(esperado);
  });
});
