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

  test("cidade sem parceiros retorna lista vazia", () => {
    const parceiros: Parceiro[] = [
      { ...exemploParceiro, id: "p01", cidade: "Itajaí" },
      { ...exemploParceiro, id: "p02", cidade: "Balneário Camboriú" },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Camboriú");

    expect(parceirosFiltrados).toEqual([]);
  });

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

  test("com serviço escolhido, só aparece quem oferece aquele serviço", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        servicos: ["passeio"],
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Camboriú",
        servicos: ["passeio"],
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        servicos: ["passeio", "cuidados em casa"],
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Itajaí",
        servicos: ["cuidados em casa"],
      },
      { ...exemploParceiro, id: "p05", cidade: "Itajaí", servicos: [] },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí", "passeio");

    expect(parceirosFiltrados.map((p: Parceiro) => p.id)).toEqual([
      "p01",
      "p03",
    ]);
  });

  test("ordena os parceiros por verificação", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        verificado: false,
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Itajaí",
        verificado: true,
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        verificado: true,
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Balneário Camboriú",
        verificado: true,
      },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p: Parceiro) => p.id)).toEqual([
      "p02",
      "p03",
      "p01",
    ]);
  });
});
