import type { Cidade } from "@/modelos/cidade";
import type { Servico } from "@/modelos/servico";
import type { TipoParceiro } from "@/modelos/tipoParceiro";

export type Parceiro = {
  id: string;
  nome: string;
  whatsapp: string;
  horarioAtendimento: string;
  faixaPreco: string;
  tipo: TipoParceiro;
  servicos: Servico[];
  cidade: Cidade;
  notaMedia: number;
  quantidadeAvaliacoes: number;
  verificado: boolean;
};
