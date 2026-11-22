import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import { File } from "expo-file-system";

import { gerarIniciais } from "@/regras/gerarIniciais";

import { styles } from "@/estilos";
import { cores } from "@/estilos/cores";
import { TutorDTO, TutorService } from "@/modelos/tutor";
import { Voltar } from "@/components/BtnVoltar";
import { Linha } from "@/components/linha";

export default function TelaMeuPerfil() {
  const [tutor, setTutor] = useState<TutorDTO | null>(null);

  useEffect(() => {
    new TutorService().consultar().then((resultado) => {
      if (resultado.sucesso && resultado.mensagem) {
        setTutor(JSON.parse(resultado.mensagem));
      }
    });
  }, []);

  async function apagarPerfil() {
    await new TutorService().excluirTutor();
    router.dismissAll();
    router.replace("/escolha");
  }

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Voltar />
      <View style={estilos.cabecalho}>
        <View style={estilos.avatar}>
          {tutor?.fotoTutor ? (
            <Image
              source={{ uri: tutor.fotoTutor }}
              style={estilos.avatarImagem}
              resizeMode="cover"
            />
          ) : (
            <Text style={estilos.iniciais}>
              {gerarIniciais(tutor?.nome ?? "Sem Nome")}
            </Text>
          )}
        </View>
        <View style={estilos.identificacao}>
          <Text style={estilos.nome}>{tutor?.nome ?? "Sem Nome"}</Text>
        </View>
        <Pressable style={styles.button} onPress={apagarPerfil}>
          <Text>Apagar Perfil</Text>
        </Pressable>
      </View>
      <Linha rotulo="Cidade" valor={tutor?.cidade ?? "Sem Cidade"} />
      <Linha rotulo={"dados do pet"} valor={"dados do pet"} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.creme },
  conteudo: { padding: 20, paddingTop: 56, gap: 16 },
  voltar: { color: cores.laranja, fontFamily: "AndikaRegular", fontSize: 16 },
  cabecalho: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: 36,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImagem: { width: "100%", height: "100%" },
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
