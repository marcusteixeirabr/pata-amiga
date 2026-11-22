// Troca o WhatsApp dos parceiros fictícios pelos números da equipe que
// autorizaram o uso, distribuídos em rodízio entre os parceiros.
//
// Uso (DDD + número, separados por vírgula):
//   NUMEROS="47999990001,47999990002" node scripts/trocar-whatsapp.mjs
//
// Só a linha "whatsapp" de cada parceiro muda; o resto do arquivo fica igual.
import { readFileSync, writeFileSync } from "node:fs";

const arquivo = new URL("../src/dados/parceiros.json", import.meta.url);

const numeros = (process.env.NUMEROS ?? "")
  .split(",")
  .map((n) => n.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, ""))
  .filter(Boolean);

if (numeros.length === 0) {
  console.error('Informe os números: NUMEROS="47999990001,47999990002"');
  process.exit(1);
}
for (const n of numeros) {
  if (!/^\d{10,11}$/.test(n)) {
    console.error(`Número inválido (use DDD + número): ${n}`);
    process.exit(1);
  }
}

const formatar = (n) => `(${n.slice(0, 2)}) ${n.slice(2, -4)}-${n.slice(-4)}`;

let indice = 0;
const texto = readFileSync(arquivo, "utf8").replace(
  /("whatsapp":\s*)"[^"]*"/g,
  (_, chave) => `${chave}"${formatar(numeros[indice++ % numeros.length])}"`,
);
writeFileSync(arquivo, texto);

console.log(`${indice} parceiros atualizados com ${numeros.length} números.`);
