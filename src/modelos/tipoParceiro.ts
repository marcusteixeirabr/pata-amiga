export const TIPOS_PARCEIRO = ["Cuidador", "Petshop", "ONG"] as const;

export type TipoParceiro = (typeof TIPOS_PARCEIRO)[number];
