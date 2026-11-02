import type { Tutor } from "@/modelos/tutor/contrato";

export type TelaInicial = "painel" | "escolha";

export function telaInicial(perfil: Tutor | null): TelaInicial {
  if (perfil) {
    return "painel";
  }
  return "escolha";
}
