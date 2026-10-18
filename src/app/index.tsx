import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const navegarParaTutor = () => {
    router.push("./tutor");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Pata Amiga</Text>

      <TouchableOpacity style={styles.button} onPress={navegarParaTutor}>
        <Text style={styles.buttonText}>Acessar via Botão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  linkButton: {
    color: "#007AFF",
    fontSize: 16,
    marginBottom: 15,
    padding: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
