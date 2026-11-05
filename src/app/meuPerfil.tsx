import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TelaMeuPerfil() {
  return (
    <View>
      <Text>Tela Meu Perfil</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Voltar</Text>
      </Pressable>
      <Pressable
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
