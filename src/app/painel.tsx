import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CartaoParceiro } from "@/components/CartaoParceiro";
import { Chip } from "@/components/Chip";
import { Tela } from "@/components/Tela";
import { TextTitle } from "@/components/TextTitle";
import { PARCEIROS } from "@/dados";
import { cores } from "@/estilos/cores";
import { CIDADES, type Cidade } from "@/modelos/cidade";
import { SERVICOS, type Servico } from "@/modelos/servico";
import { buscarParceiros } from "@/regras/buscarParceiros";
import { capitalizar } from "@/regras/formatar";

export default function TelaPainel() {
  const [cidade, setCidade] = useState<Cidade | null>(null);
  const [servico, setServico] = useState<Servico | undefined>(undefined);

  const parceiros = cidade ? buscarParceiros(PARCEIROS, cidade, servico) : [];

  return (
    <Tela estiloConteudo={estilos.conteudo}>
      <View style={estilos.cabecalho}>
        <TextTitle style={estilos.titulo}>Encontre um parceiro</TextTitle>
        <Link
          href="/cadastro"
          asChild
        >
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [estilos.meuPerfil, pressed && estilos.pressionado]}
          >
            <Text style={estilos.meuPerfilTexto}>Meu perfil</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={estilos.aviso}>⚠️ Os dados dos parceiros são fictícios, criados só para demonstração.</Text>

      <Text style={estilos.rotulo}>Cidade</Text>
      <View style={estilos.chips}>
        {CIDADES.map((c) => (
          <Chip
            key={c}
            rotulo={c}
            selecionado={c === cidade}
            onPress={() => setCidade(c)}
          />
        ))}
      </View>

      <Text style={estilos.rotulo}>Serviço</Text>
      <View style={estilos.chips}>
        <Chip
          rotulo="Todos"
          selecionado={servico === undefined}
          onPress={() => setServico(undefined)}
        />
        {SERVICOS.map((s) => (
          <Chip
            key={s}
            rotulo={capitalizar(s)}
            selecionado={s === servico}
            onPress={() => setServico(s)}
          />
        ))}
      </View>

      {cidade === null && <Text style={estilos.mensagem}>Escolha uma cidade para ver os parceiros.</Text>}

      {cidade !== null && parceiros.length === 0 && (
        <Text style={estilos.mensagem}>{`Nenhum parceiro encontrado em ${cidade}.`}</Text>
      )}

      {parceiros.map((p) => (
        <CartaoParceiro
          key={p.id}
          parceiro={p}
          servico={servico}
        />
      ))}
    </Tela>
  );
}

const estilos = StyleSheet.create({
  conteudo: { gap: 12 },
  cabecalho: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  titulo: { fontSize: 26, color: cores.azul, flexShrink: 1 },
  meuPerfil: {
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  meuPerfilTexto: { color: cores.laranja, fontFamily: "AndikaRegular", fontSize: 15 },
  pressionado: { opacity: 0.6 },
  aviso: {
    backgroundColor: cores.avisoFundo,
    color: cores.avisoTexto,
    padding: 10,
    borderRadius: 8,
    fontFamily: "AndikaRegular",
  },
  rotulo: { color: cores.azul, fontFamily: "AndikaRegular", fontSize: 16 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  mensagem: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    textAlign: "center",
    marginTop: 16,
  },
});
