/** Tempo para o segundo toque no voltar confirmar a saída do app. */
export const JANELA_PARA_SAIR_MS = 2000;

/**
 * Decide se o toque no voltar deve sair do app.
 * Só sai quando houve um toque anterior há menos de JANELA_PARA_SAIR_MS.
 */
export function confirmaSaida(agora: number, ultimoToque: number | null): boolean {
  return ultimoToque !== null && agora - ultimoToque < JANELA_PARA_SAIR_MS;
}
