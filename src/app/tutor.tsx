// Arquivo: app/tutor.js
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles, tutorStyles } from "./styles";
import { TutorService } from "@/modelos/tutor";

export default function TutorScreen() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [documento, setDocumento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [image, setImage] = useState<string | null>(null);

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

  const escolherImagem = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
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
      setImage(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    // Camera access always requires the user's permission.
    // Taking a photo also requires a device with a camera. The iOS Simulator
    // does not have one, so use a physical device to test this button.
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
      setImage(result.assets[0].uri);
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
