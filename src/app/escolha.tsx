import { Image } from "expo-image";
import { Link } from "expo-router";

import { TextTitle } from "@/components/TextTitle";
import { router } from "expo-router";
import { Text, View, Pressable, StyleSheet } from "react-native";

import { cores } from "@/estilos/cores";

export default function TelaEscolha() {
  return (
    <View style={estilos.tela}>
      <Image
        source={require("../../assets/images/logo_pata_512.png")}
        style={estilos.logo}
        contentFit="contain"
        tintColor={cores.laranja}
      />
      <TextTitle style={estilos.titulo}>Pata Amiga</TextTitle>
      <Text style={estilos.pergunta}>Como você quer usar o app?</Text>

      <Link
        href="/tutor"
        asChild
      >
        <Pressable style={estilos.opcaoTutor}>
          <Text style={[estilos.opcaoTitulo, estilos.textoClaro]}>Sou Tutor</Text>
          <Text style={[estilos.opcaoDescricao, estilos.textoClaro]}>Quero encontrar quem cuide do meu pet</Text>
        </Pressable>
      </Link>

      <Link
        href="/parceiro"
        asChild
      >
        <Pressable style={estilos.opcaoParceiro}>
          <Text style={estilos.opcaoTitulo}>Sou Parceiro</Text>
          <Text style={estilos.opcaoDescricao}>Cuido de pets, tenho petshop ou ONG</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.creme,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  logo: { width: 120, height: 120 },
  titulo: { fontSize: 40, color: cores.azul },
  pergunta: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    fontSize: 18,
    marginBottom: 8,
  },
  opcaoTutor: {
    width: "100%",
    backgroundColor: cores.laranja,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  opcaoParceiro: {
    width: "100%",
    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  opcaoTitulo: { color: cores.laranja, fontFamily: "Chewy", fontSize: 26 },
  opcaoDescricao: {
    color: cores.azul,
    fontFamily: "AndikaRegular",
    fontSize: 15,
  },
  textoClaro: { color: cores.branco },
});
