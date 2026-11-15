import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TelaEscolha() {
  return (
    <View>
      <Text>Tela Escolha</Text>
      <Link href="/parceiro">
        <Text>Sou Parceiro</Text>
      </Link>
      <Link href="/tutor">
        <Text>Sou Tutor</Text>
      </Link>
    </View>
  );
}
