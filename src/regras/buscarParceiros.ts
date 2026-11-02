import type { Cidade } from "@/modelos/cidade";
import type { Parceiro } from "@/modelos/parceiro";
import type { Servico } from "@/modelos/servico";

export function buscarParceiros(
  parceiros: Parceiro[],
  cidade: Cidade,
  servicos?: Servico[],
): Parceiro[] {
  return parceiros.filter((parceiro) => parceiro.cidade === cidade);
}
