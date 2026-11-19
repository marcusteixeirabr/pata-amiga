import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "@/estilos";

export default function TelaMeuPerfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Meu Perfil</Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text>Voltar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          router.dismissAll();
          router.replace("/escolha");
        }}
      >
        <Text>Apagar Perfil</Text>
      </Pressable>
    </View>
  );
}
