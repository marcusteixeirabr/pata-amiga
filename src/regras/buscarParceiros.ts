import type { Cidade } from "@/modelos/cidade";
import type { Parceiro } from "@/modelos/parceiro";
import type { Servico } from "@/modelos/servico";

export function buscarParceiros(
  parceiros: Parceiro[],
  cidade: Cidade,
  servico?: Servico,
): Parceiro[] {
  const parceirosFiltrados = parceiros.filter((p) => p.cidade === cidade);
  if (servico) {
    return parceirosFiltrados.filter((p) => p.servicos.includes(servico));
  }
  return parceirosFiltrados;
}
