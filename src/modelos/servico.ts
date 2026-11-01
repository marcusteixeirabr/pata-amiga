export const SERVICOS = ["passeio", "cuidados em casa", "hospedagem"] as const;

export type Servico = (typeof SERVICOS)[number];
