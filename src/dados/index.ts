import type { Parceiro } from "@/modelos/parceiro";
import dados from "./parceiros.json";

// O JSON chega com tipos genéricos (string no lugar de Cidade, Servico...).
// A conversão é segura porque __tests__/dados/parceiros.test.ts confere
// cada parceiro do arquivo contra o contrato.
export const PARCEIROS = dados as Parceiro[];
