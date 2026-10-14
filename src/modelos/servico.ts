export const SERVICOS = ["passeio", "visita", "hospedagem"] as const;

export type Servico = (typeof SERVICOS)[number];
