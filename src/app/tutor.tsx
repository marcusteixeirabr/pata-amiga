import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { MensagemRetorno, TutorDTO, TutorService } from "@/modelos/tutor";
import { styles, tutorStyles } from "@/estilos";

export default function TutorScreen() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [imagemTutor, setImagemTutor] = useState<string | undefined>(undefined);

  useEffect(() => {
    new TutorService().consultar().then((dadosSalvos: MensagemRetorno) => {
      if (dadosSalvos?.erro) return;

      const dadosTutor: TutorDTO = JSON.parse(dadosSalvos?.mensagem ?? "{}");
      if (dadosTutor?.nome) router.push("/meuPerfil");
    });
  }, []);

  const handleCadastrar = async () => {
    setMensagem("");
    setErro("");

    const resultado = await new TutorService().cadastrar({ nome, cidade, fotoTutor: imagemTutor });

    if (resultado.sucesso) {
      setMensagem(String(resultado.mensagem));
      setNome("");
      setCidade("");
      setTimeout(() => router.replace("/meuPerfil"), 2000);
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
      quality: 1,
    });

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
      quality: 1,
    });

    if (!result.canceled) {
      setImagemTutor(result.assets[0].uri);
    }
  };

  return (
    <View style={{ borderColor: "#000", borderWidth: 1, height: "100%", width: "100%", paddingVertical: 20 }}>
      <View style={{ ...tutorStyles.container, alignItems: "flex-end", paddingHorizontal: 40 }}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.back()}
          testID="btn-voltar"
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.buttonText}>Tire uma foto</Text>
        </TouchableOpacity>
      </View>
      <View style={tutorStyles.container}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleCadastrar}
          testID="btn-cadastrar"
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
