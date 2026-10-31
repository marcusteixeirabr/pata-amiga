import type { Parceiro } from "@/modelos/parceiro";

describe("Parceiro", () => {
  // Teste de entrada correta:
  // Se faltar um campo ou algum valor estiver errado, o tsc acusa o erro
  // e o teste falha. Se tudo estiver correto, o teste passa.
  const exemplo: Parceiro = {
    id: "1",
    nome: "Pet Help",
    whatsapp: "47900000000",
    horarioAtendimento: "9h às 18h",
    faixaPreco: "R$50 - R$100",
    tipo: "ONG",
    servicos: ["cuidados em casa", "hospedagem"],
    cidade: "Florianópolis",
    notaMedia: 4.5,
    quantidadeAvaliacoes: 10,
    verificado: true,
  };

  test("Deve rejeitar cidade fora da lista", () => {
    const parceiroCidadeInvalida: Parceiro = {
      ...exemplo,
      // @ts-expect-error  São Francisco do Sul não está na lista de cidades
      cidade: "São Francisco do Sul",
    };
  });

  test("Deve rejeitar serviço fora da lista", () => {
    const parceiroServicoInvalido: Parceiro = {
      ...exemplo,
      // @ts-expect-error Visita não está na lista de serviços
      servicos: ["Visita"],
    };
  });

  test("Deve rejeitar nota média como texto", () => {
    const parceiroNotaMediaInvalida: Parceiro = {
      ...exemplo,
      // @ts-expect-error Nota média deve ser um número
      notaMedia: "4.5",
    };
  });
});
