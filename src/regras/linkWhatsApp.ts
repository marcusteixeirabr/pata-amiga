import type { Parceiro } from "@/modelos/parceiro";
import type { Servico } from "@/modelos/servico";
import type { Tutor } from "@/modelos/tutor/contrato";

export function linkWhatsApp(
  parceiro: Parceiro,
  tutor: Tutor,
  servico?: Servico,
): string {
  const numeroLimpo = parceiro.whatsapp.replace(/\D/g, "");
  const numeroWhatsApp =
    (numeroLimpo.length === 13 || numeroLimpo.length === 12) &&
    numeroLimpo.startsWith("55")
      ? numeroLimpo
      : `55${numeroLimpo}`;
  const servicoTexto = servico ? `vaga de ${servico}` : "vaga";
  const mensagem = `Olá, ${parceiro.nome}! Eu sou ${tutor.nome}, encontrei vocês no Pata Amiga. Vocês têm ${servicoTexto} para meu pet?`;
  return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}
