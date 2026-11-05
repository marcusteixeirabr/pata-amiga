import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TelaParceiro() {
  return (
    <View>
      <Text>Tela Parceiro</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Voltar</Text>
      </Pressable>
    </View>
  );
}
