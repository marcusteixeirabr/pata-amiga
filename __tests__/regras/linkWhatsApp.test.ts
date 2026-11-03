import type { Parceiro } from "@/modelos/parceiro";
import type { Tutor } from "@/modelos/tutor/contrato";
import { linkWhatsApp } from "@/regras/linkWhatsApp";

describe("Link do WhatsApp", () => {
  const exemploParceiro: Parceiro = {
    id: "p01",
    nome: "Parceiro Teste",
    whatsapp: "48900000000",
    horarioAtendimento: "08:00 - 18:00",
    faixaPreco: "R$ 100 a R$ 500",
    tipo: "Petshop",
    servicos: ["passeio", "hospedagem"],
    cidade: "Florianópolis",
    notaMedia: 4.5,
    quantidadeAvaliacoes: 10,
    verificado: true,
  };
  const exemploTutor: Tutor = {
    nome: "Tutor Teste",
    cidade: "Florianópolis",
    fotoTutor: "https://example.com/foto-tutor.jpg",
    fotoPets: [
      "https://example.com/foto-pet1.jpg",
      "https://example.com/foto-pet2.jpg",
    ],
  };
  test("Deve retornar um link de WhatsApp válido para o parceiro", () => {
    const linkTest = linkWhatsApp(exemploParceiro, exemploTutor, "passeio");
    const url = new URL(linkTest);
    expect(url.searchParams.get("text")).toBe(
      "Olá, Parceiro Teste! Eu sou Tutor Teste, encontrei vocês no Pata Amiga. Vocês têm vaga de passeio para meu pet?",
    );
  });

  test("Nome do parceiro com acentos deve ser codificado corretamente no link", () => {
    const parceiroComAcentos: Parceiro = {
      ...exemploParceiro,
      nome: "Parceiro Teste ÁÉÍÓÚ",
    };
    const linkTest = linkWhatsApp(parceiroComAcentos, exemploTutor, "passeio");
    const url = new URL(linkTest);
    expect(url.searchParams.get("text")).toBe(
      "Olá, Parceiro Teste ÁÉÍÓÚ! Eu sou Tutor Teste, encontrei vocês no Pata Amiga. Vocês têm vaga de passeio para meu pet?",
    );
  });

  test("Nome do Tutor com acentos deve ser codificado corretamente no link", () => {
    const tutorComAcentos: Tutor = {
      ...exemploTutor,
      nome: "Tutor Teste ÁÉÍÓÚ",
    };
    const linkTest = linkWhatsApp(exemploParceiro, tutorComAcentos, "passeio");
    const url = new URL(linkTest);
    expect(url.searchParams.get("text")).toBe(
      "Olá, Parceiro Teste! Eu sou Tutor Teste ÁÉÍÓÚ, encontrei vocês no Pata Amiga. Vocês têm vaga de passeio para meu pet?",
    );
  });

  test("Deve retornar um link de WhatsApp válido mesmo sem o serviço", () => {
    const linkTest = linkWhatsApp(exemploParceiro, exemploTutor);
    const url = new URL(linkTest);
    expect(url.searchParams.get("text")).toBe(
      "Olá, Parceiro Teste! Eu sou Tutor Teste, encontrei vocês no Pata Amiga. Vocês têm vaga para meu pet?",
    );
  });

  test("Deve lidar com números de WhatsApp com caracteres especiais", () => {
    const parceiroWhatsComCharEspeciais: Parceiro = {
      ...exemploParceiro,
      whatsapp: "(48) 90000-0000",
    };
    const linkTest = linkWhatsApp(parceiroWhatsComCharEspeciais, exemploTutor);
    const url = new URL(linkTest);
    expect(url.pathname).toBe("/5548900000000");
  });

  test("Deve lidar com números de whatsapp começados por +55", () => {
    const parceiroWhatsCom55: Parceiro = {
      ...exemploParceiro,
      whatsapp: "+5548900000000",
    };
    const linkTest = linkWhatsApp(parceiroWhatsCom55, exemploTutor);
    const url = new URL(linkTest);
    expect(url.pathname).toBe("/5548900000000");
  });

  test("Hostname deve estar correto", () => {
    const linkTest = linkWhatsApp(exemploParceiro, exemploTutor);
    const url = new URL(linkTest);
    expect(url.hostname).toBe("wa.me");
  });

  test("Link não deve conter espaços extras", () => {
    const linkTest = linkWhatsApp(exemploParceiro, exemploTutor);
    expect(linkTest).not.toContain(" ");
  });

  test("Parceiro do Santa Maria-RS deve ter o DDD correto no link", () => {
    const parceiroRS: Parceiro = {
      ...exemploParceiro,
      whatsapp: "55900000000", // DDD 55 para Santa Maria, RS
    };
    const linkTest = linkWhatsApp(parceiroRS, exemploTutor);
    const url = new URL(linkTest);
    expect(url.pathname).toBe("/5555900000000");
  });
});
