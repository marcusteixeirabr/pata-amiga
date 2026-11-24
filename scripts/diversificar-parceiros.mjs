// Aumenta a variedade da massa de dados dos parceiros fictícios
// (card "Melhorar a diversidade da massa de dados dos parceiros").
//
// Uso: node scripts/diversificar-parceiros.mjs
//
// - Muda só os campos listados abaixo, pelo id do parceiro.
// - Não mexe no WhatsApp nem na ordem: o trocar-whatsapp.mjs continua igual.
// - Pode rodar mais de uma vez: o resultado é sempre o mesmo.
import { readFileSync, writeFileSync } from "node:fs";

const arquivo = new URL("../src/dados/parceiros.json", import.meta.url);
const parceiros = JSON.parse(readFileSync(arquivo, "utf8"));

const MUDANCAS = {
  // Blumenau: menos selos (4 de 10), 3 petshops, notas mais baixas.
  g01: { nome: "João Luís Becker" },
  g02: { faixaPreco: "Gratuito (aceita doação de ração)" },
  g04: { nome: "Érica Schmitt", verificado: false },
  g06: { nome: "Otávio Krüger", notaMedia: 3.6, quantidadeAvaliacoes: 5 },
  g07: { nome: "Bicho Mimado Petshop", tipo: "Petshop", verificado: false },
  g08: { nome: "Heloísa Wagner" },
  g09: { notaMedia: 3.9 },
  g10: { nome: "Petshop Rua XV", tipo: "Petshop", verificado: false },

  // Camboriú: metade com selo (5 de 10), 3 petshops, um sem selo com nota 4,9.
  g11: { nome: "Maria Eduarda Silva" },
  g12: { nome: "PetMania Camboriú", tipo: "Petshop", notaMedia: 4.9, quantidadeAvaliacoes: 52 },
  g14: { nome: "Rogério Tavares", verificado: false },
  g16: { nome: "Letícia Andrade", notaMedia: 3.4, quantidadeAvaliacoes: 4 },
  g18: { nome: "Pedro Henrique Lima", verificado: false },
  g19: { nome: "Hotelzinho Rio Camboriú", tipo: "Petshop" },
  g20: { nome: "Úrsula Medeiros" },

  // Brusque: quase todos com selo (9 de 10), 6 cuidadores, um veterano com muitas avaliações.
  g21: { nome: "Ana Clara Schulz" },
  g23: { quantidadeAvaliacoes: 87 },
  g24: { nome: "Vítor Hugo Pereira", verificado: true },
  g25: { nome: "Lar Temporário Brusque" },
  g26: { nome: "Beatriz Lenz", notaMedia: 3.8, quantidadeAvaliacoes: 3 },
  g27: { nome: "Amanda Zimmermann", tipo: "Cuidador", faixaPreco: "R$ 60 a R$ 95 por diária" },
  g28: { nome: "Ícaro Bauer" },
  g29: { nome: "Bicharada Petshop", tipo: "Petshop", verificado: true, notaMedia: 4.5 },
  g30: { nome: "Sônia Fischer" },

  // Itajaí: uma nota abaixo de 4 na cidade da demonstração; cuidador com nome de pessoa.
  c05: { nome: "Fernanda Lopes" },
  c08: { notaMedia: 3.7 },

  // Florianópolis: petshop sem selo com nota mais baixa.
  c29: { notaMedia: 4.1 },

  // Itapema: cuidadores com nome de pessoa e 6 de 10 com selo.
  c32: { nome: "Camila Rocha" },
  c34: { nome: "Gustavo Nunes" },
  c37: { faixaPreco: "R$ 30 a R$ 50 por diária" },
  c38: { nome: "Mateus Vieira", verificado: false },
  c40: { nome: "Juliana Ramos" },
};

/** Padroniza horários e preços (acentos, maiúsculas e unidade do preço). */
function padronizar(parceiro) {
  let horario = parceiro.horarioAtendimento
    .replace(/^seg\b/, "Seg")
    .replace(/\bsab\b/g, "sáb")
    .replace(/^todos os dias/, "Todos os dias");
  if (horario === "24h") horario = "Todos os dias, 24h";
  parceiro.horarioAtendimento = horario;

  const unidade = parceiro.servicos.includes("hospedagem") ? "por diária" : "por visita";
  parceiro.faixaPreco = parceiro.faixaPreco
    .replace(/por diaria$/, "por diária")
    .replace(/por sessão$/, unidade);
}

const ids = new Set(parceiros.map((p) => p.id));
const naoEncontrados = Object.keys(MUDANCAS).filter((id) => !ids.has(id));
if (naoEncontrados.length > 0) {
  console.error(`Ids que não estão no JSON: ${naoEncontrados.join(", ")}`);
  process.exit(1);
}

for (const parceiro of parceiros) {
  Object.assign(parceiro, MUDANCAS[parceiro.id] ?? {});
  padronizar(parceiro);
}

writeFileSync(arquivo, JSON.stringify(parceiros, null, 2) + "\n");
console.log(`${Object.keys(MUDANCAS).length} parceiros alterados; horários e preços padronizados.`);
