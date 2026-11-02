import type { Tutor } from "@/modelos/tutor/contrato";

export function telaInicial(perfil: Tutor | null): "painel" | "escolha" {
  if (perfil) {
    return "painel";
  }
  return "escolha";
}
