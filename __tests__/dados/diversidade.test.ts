import { PARCEIROS } from "@/dados";
import { CIDADES } from "@/modelos/cidade";
import { SERVICOS } from "@/modelos/servico";

// Critérios do card "Melhorar a diversidade da massa de dados dos parceiros".

const daCidade = (cidade: string) => PARCEIROS.filter((p) => p.cidade === cidade);
const cidadesComParceiros = CIDADES.filter((cidade) => daCidade(cidade).length > 0);

// Palavras que denunciam nome de empresa. Cuidador é pessoa.
// \p{L} (com a flag u) em vez de \b: o \b do JavaScript não conhece letras
// acentuadas e acharia "cia" dentro de "Letícia".
const PALAVRAS_DE_EMPRESA =
  /(?<!\p{L})(pets?|care|cia|service|sitter|walker|dog|patas|focinhos|caminhada|passeios|cantinho|cuidados|cuidadora|central|bichos|caninos?|hotel)(?!\p{L})|&/iu;

describe("Massa de dados: variedade para a demonstração e os testes", () => {
  test("há notas abaixo de 4 em pelo menos duas cidades (deixa a ordem da RN05 visível)", () => {
    const cidades = new Set(PARCEIROS.filter((p) => p.notaMedia < 4).map((p) => p.cidade));
    expect(cidades.size).toBeGreaterThanOrEqual(2);
  });

  test("a proporção de parceiros com selo muda de cidade para cidade", () => {
    const proporcoes = cidadesComParceiros.map((cidade) => {
      const parceiros = daCidade(cidade);
      const comSelo = parceiros.filter((p) => p.verificado).length;
      return (comSelo / parceiros.length).toFixed(2);
    });
    expect(new Set(proporcoes).size).toBe(cidadesComParceiros.length);
  });

  test("duas cidades nunca têm o mesmo perfil de tipos, selos e notas", () => {
    const perfis = cidadesComParceiros.map((cidade) => {
      const parceiros = daCidade(cidade);
      const tipos = parceiros.map((p) => p.tipo).sort().join(",");
      const selos = parceiros.filter((p) => p.verificado).length;
      const notas = parceiros.map((p) => p.notaMedia).sort().join(",");
      return `${tipos} | ${selos} | ${notas}`;
    });
    expect(new Set(perfis).size).toBe(cidadesComParceiros.length);
  });

  test.each(PARCEIROS.filter((p) => p.tipo === "Cuidador"))(
    "o cuidador $nome tem nome de pessoa",
    ({ nome }) => {
      expect(nome).not.toMatch(PALAVRAS_DE_EMPRESA);
      expect(nome.trim().split(/\s+/).length).toBeGreaterThanOrEqual(2);
    },
  );
});

describe("Massa de dados: o que já estava bom continua", () => {
  test("Porto Belo continua sem parceiros (busca sem resultado)", () => {
    expect(daCidade("Porto Belo")).toHaveLength(0);
  });

  test.each(cidadesComParceiros)("%s oferece os 3 serviços e tem petshop", (cidade) => {
    const parceiros = daCidade(cidade);
    for (const servico of SERVICOS) {
      expect(parceiros.some((p) => p.servicos.includes(servico))).toBe(true);
    }
    expect(parceiros.some((p) => p.tipo === "Petshop")).toBe(true);
  });
});
