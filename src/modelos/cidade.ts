export const CIDADES = [
  "Balneário Camboriú",
  "Blumenau",
  "Brusque",
  "Camboriú",
  "Florianópolis",
  "Itajaí",
  "Itapema",
  "Porto Belo",
] as const;

export type Cidade = (typeof CIDADES)[number];
