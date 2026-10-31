import { Parceiro } from "@/modelos/parceiro";

describe("Parceiro", () => {
  const exemplo: Parceiro = {
    id: "1",
    nome: "Pet Help",
    whatsapp: "47999460780",
    horarioAtendimento: "9h às 18h",
    faixaPreco: "R$50 - R$100",
    tipo: "ONG",
    servicos: ["cuidados em casa", "hospedagem"],
    cidade: "Florianópolis",
    notaMedia: 4.5,
    quantidadeAvaliacoes: 10,
    verificado: true,
  };

  test("Deve aceitar exemplo é uma instância de Parceiro", () => {
    expect(exemplo).toBeInstanceOf(Parceiro);
  });

  test("Deve rejeitar cidade fora da lista", () => {
    // @ts-expect-error  São Francisco do Sul não está na lista de cidades
    const parceiroCidadeInvalida: Parceiro = {
      ...exemplo,
      cidade: "São Francisco do Sul",
    };
  });

  test("Deve rejeitar serviço fora da lista", () => {
    // @ts-expect-error Visita não está na lista de serviços
    const parceiroServicoInvalido: Parceiro = {
      ...exemplo,
      servicos: ["Visita"],
    };
  });

  test("Deve rejeitar nota média como texto", () => {
    // @ts-expect-error Nota média deve ser um número
    const parceiroNotaMediaInvalida: Parceiro = {
      ...exemplo,
      notaMedia: "4.5",
    };
  });
});
