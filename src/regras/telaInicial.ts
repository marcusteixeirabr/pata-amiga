export type TelaInicial = "painel" | "escolha";

export function telaInicial(perfil: any | null): TelaInicial {
  if (perfil) {
    return "painel";
  }
  return "escolha";
}
