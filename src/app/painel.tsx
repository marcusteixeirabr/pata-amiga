import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TelaPainel() {
  const id = "p01"; // Exemplo de ID do parceiro
  return (
    <View>
      <Text>Tela Painel</Text>
      <Link
        href={{
          pathname: "/detalhe/[id]",
          params: { id },
        }}
      >
        <Text>Buscar Parceiro</Text>
      </Link>
      <Link href="/meuPerfil">
        <Text>Meu Perfil</Text>
      </Link>
    </View>
  );
}
