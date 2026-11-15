import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { carregarPerfil } from "@/armazenamento/perfil";
import { TextTitle } from "@/components/TextTitle";
import { styles } from "@/estilos";
import { telaInicial } from "@/regras/telaInicial";

const ROTAS = { escolha: "/escolha", painel: "/painel" } as const;

export default function Abertura() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const perfil = await carregarPerfil();
      router.replace(ROTAS[telaInicial(perfil)]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {carregando && <ActivityIndicator size="small" color="#fff" />}
      <Image
        source={require("../../assets/images/logo_pata_512.png")}
        style={{ width: 200, height: 200 }}
        priority="high"
        onLoadEnd={() => setCarregando(false)}
      />
      {!carregando && (
        <>
          <TextTitle style={styles.title}>Pata Amiga</TextTitle>
          <Text style={styles.subtitle}>conectando pets e pessoas</Text>
        </>
      )}
    </View>
  );
}
