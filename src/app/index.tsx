import { router } from "expo-router";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Text, ActivityIndicator, View } from "react-native";

import { styles } from "./styles";
import { TextTitle } from "../components/TextTitle";
import { TutorService } from "@/modelos/tutor";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tutorService = new TutorService();
    tutorService.consultaTutor()
    .then((dados) => {
      if(dados.erro){
        setTimeout(() => router.replace("./tutor"), 2000);
      }else{
        setTimeout(() => router.replace({
          pathname: "./tutorHome",
          params: {
            nome: dados.data.nome,
            documento: dados.data.documento,
            cidade: dados.data.cidade,
            fotoTutor: dados.data.fotoTutor ?? ''
          }
        }), 1000);
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <Image
        source={require("../../assets/images/logo_pata_512.png")}
        style={{
          width: 200,
          height: 200,
        }}
        priority="high"
        onLoadEnd={() => setLoading(false)}
      />
      {!loading && (
        <>
          <TextTitle style={styles.title}>Pata Amiga</TextTitle>
          <Text style={styles.subtitle}>conectando pets e pessoas</Text>
        </>
      )}
    </View>
  );
}