import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TelaDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Detalhe do Parceiro {id}</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Voltar</Text>
      </Pressable>
    </View>
  );
}
