import type { Parceiro } from "@/modelos/parceiro";
import { buscarParceiros } from "@/regras/buscarParceiros";

describe("Buscar Parceiros", () => {
  const exemploParceiro: Parceiro = {
    id: "p01",
    nome: "Ana Luísa Souza",
    tipo: "Cuidador",
    servicos: ["passeio", "cuidados em casa"],
    cidade: "Itajaí",
    whatsapp: "(47) 90000-0001",
    horarioAtendimento: "Seg a sex, 8h às 18h",
    faixaPreco: "R$ 40 a R$ 60 por passeio",
    notaMedia: 4.8,
    quantidadeAvaliacoes: 12,
    verificado: true,
  };
  test("só aparecem parceiros da cidade escolhida", () => {
    const parceiros: Parceiro[] = [
      { ...exemploParceiro, id: "p01", cidade: "Itajaí" },
      { ...exemploParceiro, id: "p02", cidade: "Balneário Camboriú" },
      { ...exemploParceiro, id: "p03", cidade: "Itajaí" },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p: Parceiro) => p.id)).toEqual([
      "p01",
      "p03",
    ]);
  });
});
