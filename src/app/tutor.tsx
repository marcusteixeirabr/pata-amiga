// Arquivo: app/tutor.js
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles, tutorStyles } from "./styles";
import { TutorService } from "@/modelos/tutor";

export default function TutorScreen() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [documento, setDocumento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [imagemTutor, setImagemTutor] = useState<string | undefined>(undefined);

  const handleCadastrar = async () => {
    setMensagem("");
    setErro("");

    const resultado = await new TutorService().cadastrar({ nome, cidade, documento, fotoTutor: imagemTutor });

    if (resultado.sucesso) {
      setMensagem(String(resultado.mensagem));
      setNome("");
      setCidade("");
    } else {
      setErro(String(resultado.erro));
    }
  };

  const escolherImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso aos arquivos de mídia.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagemTutor(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso à camera para tirar fotos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagemTutor(result.assets[0].uri);
    }
  };

  return (
    <View style={tutorStyles.container}>
      <Text style={tutorStyles.title}>Cadastre-se</Text>

      {mensagem ? <Text style={styles.sucessoText}>{mensagem}</Text> : null}
      {erro ? <Text style={styles.erroText}>{erro}</Text> : null}

      <TextInput
        style={tutorStyles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        testID="input-nome"
      />

      <TextInput
        style={tutorStyles.input}
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        testID="input-Documento"
      />

      <TextInput
        style={tutorStyles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
        testID="input-cidade"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={escolherImagem}
      >
        <Text style={styles.buttonText}>Escolha uma imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={tirarFoto}
      >
        <Text style={styles.buttonText}> Tire uma foto </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastrar}
        testID="btn-cadastrar"
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
