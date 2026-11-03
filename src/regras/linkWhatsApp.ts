import type { Parceiro } from "@/modelos/parceiro";
import type { Tutor } from "@/modelos/tutor/contrato";

export function linkWhatsApp(
  parceiro: Parceiro,
  tutor: Tutor,
  serviço?: string,
): string {
  const numeroLimpo = parceiro.whatsapp.replace(/\D/g, "");
  const numeroWhatsApp = numeroLimpo.startsWith("55")
    ? numeroLimpo
    : `55${numeroLimpo}`;
  const serviçoTexto = serviço ? `de ${serviço} ` : "";
  const mensagem = `Olá, ${parceiro.nome}! Eu sou ${tutor.nome}, encontrei vocês no Pata Amiga. Vocês têm vaga ${serviçoTexto}para meu pet?`;
  return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}
