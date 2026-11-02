import type { Cidade } from "@/modelos/cidade";
import type { Parceiro } from "@/modelos/parceiro";
import type { Servico } from "@/modelos/servico";

export function buscarParceiros(
  parceiros: Parceiro[],
  cidade: Cidade,
  servico?: Servico,
): Parceiro[] {
  // filtra os parceiros pela cidade
  const parceirosFiltrados = parceiros.filter((p) => p.cidade === cidade);

  // ordena os parceiros por verificação, colocando os verificados primeiro
  parceirosFiltrados.sort((a, b) => {
    if (a.verificado && !b.verificado) {
      return -1;
    }
    if (!a.verificado && b.verificado) {
      return 1;
    }
    return 0;
  });

  // filtra os parceiros pelo serviço, se fornecido
  if (servico) {
    return parceirosFiltrados.filter((p) => p.servicos.includes(servico));
  }
  return parceirosFiltrados;
}
