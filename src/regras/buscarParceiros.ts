import type { Cidade } from "@/modelos/cidade";
import type { Parceiro } from "@/modelos/parceiro";
import type { Servico } from "@/modelos/servico";

export function buscarParceiros(
  parceiros: Parceiro[],
  cidade: Cidade,
  servico?: Servico,
): Parceiro[] {
  const parceirosFiltrados = parceiros.filter(
    (p) => p.cidade === cidade && (!servico || p.servicos.includes(servico)),
  );
  return ordenarParceiros(parceirosFiltrados);
}

function ordenarParceiros(parceiros: Parceiro[]): Parceiro[] {
  return parceiros.toSorted((a, b) => {
    const ordenaVerificacao = Number(b.verificado) - Number(a.verificado);
    const ordenaNotaMedia = b.notaMedia - a.notaMedia;
    const ordenaQuantidadeAvaliacoes =
      b.quantidadeAvaliacoes - a.quantidadeAvaliacoes;
    const ordenaNomeAlfabetica = a.nome.localeCompare(b.nome, "pt-BR");
    return (
      ordenaVerificacao ||
      ordenaNotaMedia ||
      ordenaQuantidadeAvaliacoes ||
      ordenaNomeAlfabetica
    );
  });
}
