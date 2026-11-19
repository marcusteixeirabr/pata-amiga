import type { Parceiro } from "@/modelos/parceiro";

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatarAvaliacoes(parceiro: Parceiro): string {
  const nota = parceiro.notaMedia.toFixed(1).replace(".", ",");
  return `★ ${nota} (${parceiro.quantidadeAvaliacoes} avaliações)`;
}
