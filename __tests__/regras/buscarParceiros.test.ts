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

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p01", "p03"]);
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

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p01", "p03"]);
  });

  test("parceiros ordenados por verificação", () => {
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

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p02", "p03", "p01"]);
  });

  test("parceiros ordenados por nota média, do maior para o menor", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        notaMedia: 4.5,
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Itajaí",
        notaMedia: 4.8,
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        notaMedia: 4.2,
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Balneário Camboriú",
        notaMedia: 4.9,
      },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p02", "p01", "p03"]);
  });

  test("parceiros ordenados por quantidade de avaliações, do maior para o menor", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        quantidadeAvaliacoes: 10,
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Itajaí",
        quantidadeAvaliacoes: 15,
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        quantidadeAvaliacoes: 5,
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Balneário Camboriú",
        quantidadeAvaliacoes: 20,
      },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p02", "p01", "p03"]);
  });

  test("parceiros ordenados por ordem alfabética de nome, do A ao Z", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        nome: "Fábio Luís Souza",
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Itajaí",
        nome: "Érica Henriques da Silva",
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        nome: "Carlos Eduardo Oliveira",
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Balneário Camboriú",
        nome: "Daniela Martins Pereira",
      },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p) => p.id)).toEqual(["p03", "p02", "p01"]);
  });

  test("critérios empatados devem ser resolvidos na ordem de prioridade correta", () => {
    const parceiros: Parceiro[] = [
      {
        ...exemploParceiro,
        id: "p01",
        cidade: "Itajaí",
        nome: "Fábio Luís Souza",
        quantidadeAvaliacoes: 10,
        notaMedia: 4.0,
        verificado: true,
      },
      {
        ...exemploParceiro,
        id: "p02",
        cidade: "Itajaí",
        nome: "Érica Henriques da Silva",
        quantidadeAvaliacoes: 15,
        notaMedia: 5.0,
        verificado: false,
      },
      {
        ...exemploParceiro,
        id: "p03",
        cidade: "Itajaí",
        nome: "Carlos Eduardo Oliveira",
        quantidadeAvaliacoes: 25,
        notaMedia: 3.9,
        verificado: true,
      },
      {
        ...exemploParceiro,
        id: "p04",
        cidade: "Itajaí",
        nome: "Daniela Martins Pereira",
        quantidadeAvaliacoes: 15,
        notaMedia: 5.0,
        verificado: false,
      },
    ];

    const parceirosFiltrados = buscarParceiros(parceiros, "Itajaí");

    expect(parceirosFiltrados.map((p) => p.id)).toEqual([
      "p01",
      "p03",
      "p04",
      "p02",
    ]);
  });
});
