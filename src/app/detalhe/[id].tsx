import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PARCEIROS } from "@/dados";
import { cores } from "@/estilos/cores";
import { capitalizar, formatarAvaliacoes } from "@/regras/formatar";
import { gerarIniciais } from "@/regras/gerarIniciais";
import { TutorDTO } from "@/modelos/tutor";
import { linkWhatsApp } from "@/regras/linkWhatsApp";
import { TutorService } from "@/modelos/tutor";
import { Servico, SERVICOS } from "@/modelos/servico";
import { Linha } from "@/components/Linha";
import { Voltar } from "@/components/BtnVoltar";


export default function TelaDetalhe() {
  const { id, servico } = useLocalSearchParams<{
    id: string;
    servico?: string;
  }>();
  const parceiro = PARCEIROS.find((p) => p.id === id);
  const [tutor, setTutor] = useState<TutorDTO | null>(null);

  useEffect(() => {
    new TutorService()
      .consultar()
      .then((dados) => {
        if (!dados.sucesso || !dados.mensagem) {
          throw new Error("Não foram encontrados dados para o tutor");
        }
        setTutor(JSON.parse(dados.mensagem) as TutorDTO);
      })
      .catch((_) => {
        console.error("Ocorreu um problema consultando tutor");
      });
  }, []);

  if (!parceiro) {
    return (
      <View style={[estilos.tela, estilos.conteudo]}>
        <Voltar />
        <Text style={estilos.mensagem}>Parceiro não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
    >
      <Voltar />

      <View style={estilos.cabecalho}>
        <View style={estilos.avatar}>
          <Text style={estilos.iniciais}>{gerarIniciais(parceiro.nome)}</Text>
        </View>
        <View style={estilos.identificacao}>
          <Text style={estilos.nome}>{parceiro.nome}</Text>
          <Text style={estilos.tipo}>{parceiro.tipo}</Text>
          {parceiro.verificado && <Text style={estilos.selo}>✓ Verificado</Text>}
        </View>
      </View>

      <Linha
        rotulo="Serviços"
        valor={capitalizar(parceiro.servicos.join(", "))}
      />
      <Linha
        rotulo="Cidade"
        valor={parceiro.cidade}
      />
      <Linha
        rotulo="Horário de atendimento"
        valor={parceiro.horarioAtendimento}
      />
      <Linha
        rotulo="Faixa de preço"
        valor={parceiro.faixaPreco}
      />
      <Linha
        rotulo="Avaliações"
        valor={formatarAvaliacoes(parceiro)}
      />

      {tutor && (
        <Pressable
          accessibilityRole="button"
          style={estilos.whatsapp}
          onPress={() => Linking.openURL(linkWhatsApp(parceiro, tutor, servicoValido(servico)))}
        >
          <Text style={estilos.whatsappTexto}>Chamar no WhatsApp</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function servicoValido(valor?: string): Servico | undefined {
  return SERVICOS.find((s) => s === valor);
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.creme },
  conteudo: { padding: 20, paddingTop: 56, gap: 16 },
  voltar: { color: cores.laranja, fontFamily: "AndikaRegular", fontSize: 16 },
  cabecalho: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
  },
  iniciais: { color: cores.branco, fontFamily: "Chewy", fontSize: 28 },
  identificacao: { flex: 1, gap: 2 },
  nome: { color: cores.azul, fontFamily: "AndikaRegular", fontSize: 22 },
  tipo: { color: cores.cinza, fontFamily: "AndikaRegular", fontSize: 16 },
  selo: { color: cores.verde, fontFamily: "AndikaRegular" },
  linha: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    gap: 2,
  },
  rotulo: { color: cores.cinza, fontFamily: "AndikaRegular", fontSize: 13 },
  valor: { color: cores.azul, fontFamily: "AndikaRegular", fontSize: 16 },
  whatsapp: {
    backgroundColor: cores.whatsapp,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  whatsappTexto: {
    color: cores.branco,
    fontFamily: "AndikaRegular",
    fontSize: 18,
  },
  mensagem: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    textAlign: "center",
    marginTop: 16,
  },
});
