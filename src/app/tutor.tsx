// Arquivo: app/tutor.js
import { TutorService } from "@/modelos/tutor";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TutorScreen() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastrar = () => {
    setMensagem("");
    setErro("");

    const resultado = new TutorService().cadastrar({ nome, cidade });

    if (resultado.sucesso) {
      setMensagem(String(resultado.mensagem));
      setNome("");
      setCidade("");
    } else {
      setErro(String(resultado.erro));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cuidador (Painel Tutor)</Text>

      {mensagem ? <Text style={styles.sucessoText}>{mensagem}</Text> : null}
      {erro ? <Text style={styles.erroText}>{erro}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nome do cuidador"
        value={nome}
        onChangeText={setNome}
        testID="input-nome"
      />

      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
        testID="input-cidade"
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastrar} testID="btn-cadastrar">
        <Text style={styles.buttonText}>Cadastrar Cuidador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sucessoText: {
    color: "green",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  erroText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});
