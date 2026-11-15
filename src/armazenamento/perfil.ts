import type { Tutor } from "@/modelos/tutor/contrato";

// PROVISÓRIO: o perfil ainda não é salvo, então sempre devolve null.
// A implementação com AsyncStorage é o card
// "Salvar, carregar, editar e apagar perfil (TDD)". Só o corpo desta
// função muda; quem chama (a tela de abertura) continua igual.
export async function carregarPerfil(): Promise<Tutor | null> {
  return null;
}
