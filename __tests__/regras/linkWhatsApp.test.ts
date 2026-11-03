import type { Parceiro } from "@/modelos/parceiro";
import type { Tutor } from "@/modelos/tutor/contrato";

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
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/5548900000000");
    expect(url.searchParams.get("text")).toBe(
      "Olá, Parceiro Teste! Eu sou Tutor Teste, encontrei vocês no Pata Amiga. Vocês têm vaga de passeio para meu pet?",
    );
  });
});
