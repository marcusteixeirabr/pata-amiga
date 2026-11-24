import { CIDADES, type Cidade } from "@/modelos/cidade";

/**
 * Cidade que o painel já abre selecionada, a partir da cidade do perfil do tutor.
 * "Outra", vazio ou uma cidade que não está na lista não selecionam nada.
 */
export function cidadeInicialDoPainel(cidadeDoTutor: string | null | undefined): Cidade | null {
  return CIDADES.find((cidade) => cidade === cidadeDoTutor) ?? null;
}
