import { useEffect, useState } from "react";
import { Alert, Image, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";

import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { Voltar } from "@/components/BtnVoltar";
import { SelectDropdown } from "@/components/dropdown";
import { Folha } from "@/components/Folha";
import { Tela } from "@/components/Tela";
import { TextTitle } from "@/components/TextTitle";

import { styles as estilo } from "@/estilos";
import { cores } from "@/estilos/cores";
import { CIDADES, type CidadeTutor } from "@/modelos/cidade";
import { TutorService, type MensagemRetorno, type TutorDTO } from "@/modelos/tutor";
import { gerarIniciais } from "@/regras/gerarIniciais";

type CidadeOption = { label: string; value: CidadeTutor };

const OPCOES_CIDADE: CidadeOption[] = [
  ...CIDADES.map((cidade) => ({ label: cidade, value: cidade })),
  { label: "Outra", value: "Outra" },
];

/** Aviso rápido do Android, que continua visível depois de trocar de tela. */
function avisar(texto: string) {
  if (Platform.OS === "android") ToastAndroid.show(texto, ToastAndroid.SHORT);
}

export default function TelaCadastro() {
  // temPerfil: já existia perfil salvo quando a tela abriu (é o "Meu perfil").
  const [temPerfil, setTemPerfil] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [salvando, setSalvando] = useState<boolean>(false);
  const [excluirModal, setExcluirModal] = useState<boolean>(false);

  const [nome, setNome] = useState<TutorDTO["nome"]>("");
  const [cidade, setCidade] = useState<TutorDTO["cidade"]>(null);
  const [imagemTutor, setImagemTutor] = useState<TutorDTO["fotoTutor"]>(null);
  const [fotoPets, setFotoPets] = useState<NonNullable<TutorDTO["fotoPets"]>>([null, null]);

  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const [activePetSlot, setActivePetSlot] = useState<0 | 1 | null>(null);

  useEffect(() => {
    new TutorService().consultar().then((dadosSalvos: MensagemRetorno) => {
      if (!dadosSalvos.sucesso || !dadosSalvos.mensagem) return;

      const dadosTutor: TutorDTO = JSON.parse(dadosSalvos.mensagem);

      if (dadosTutor?.nome) {
        setTemPerfil(true);
        setEditMode(false);
        setNome(dadosTutor.nome);
        setCidade(dadosTutor.cidade);
        setImagemTutor(dadosTutor.fotoTutor ?? null);
        setFotoPets(dadosTutor.fotoPets ?? [null, null]);
      }
    });
  }, []);

  async function escolherImagem(): Promise<string | null> {
    if (!editMode) return null;
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso aos arquivos de mídia.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  }

  async function tirarFoto(): Promise<string | null> {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso à camera para tirar fotos.");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  }

  const handleAvatar = async () => {
    const uri = await escolherImagem();
    // null = nenhuma foto escolhida (cancelou, sem permissão ou fora da edição):
    // mantém a foto atual, igual ao setPhotoAtSlot dos pets.
    if (uri) setImagemTutor(uri);
  };

  async function handleSalvar() {
    if (salvando) return;
    setMensagem("");
    setErro("");
    setSalvando(true);

    const resultado = await new TutorService().cadastrar({
      nome,
      cidade,
      fotoPets,
      fotoTutor: imagemTutor,
    });

    setSalvando(false);

    if (!resultado.sucesso) {
      setErro(String(resultado.erro));
      return;
    }

    if (temPerfil) {
      // Edição: continua no Meu perfil, de volta ao modo de visualização.
      setEditMode(false);
      setMensagem("Perfil atualizado!");
      return;
    }

    // Primeiro cadastro: vai para o painel e tira a escolha/cadastro da pilha,
    // para o voltar do aparelho não levar de novo à tela de escolha.
    avisar("Perfil salvo!");
    if (router.canDismiss()) router.dismissAll();
    router.replace("/painel");
  }

  async function handleEditar() {
    if (editMode) {
      await handleSalvar();
    } else {
      setMensagem("");
      setEditMode(true);
    }
  }

  async function apagarPerfil() {
    setExcluirModal(false);
    await new TutorService().excluirTutor();
    if (router.canDismiss()) router.dismissAll();
    router.replace("/escolha");
  }

  const handleOpenPetPicker = (slotIndex: 0 | 1) => {
    if (editMode) setActivePetSlot(slotIndex);
  };

  const handleClosePetPicker = () => {
    setActivePetSlot(null);
  };

  const setPhotoAtSlot = (slotIndex: 0 | 1, uri: string | null) => {
    if (!uri) return;
    setFotoPets((prev) => {
      const next: [string | null, string | null] = [prev?.[0] ?? null, prev?.[1] ?? null];
      next[slotIndex] = uri;
      return next;
    });
  };

  const handleTakePhoto = async () => {
    if (activePetSlot === null) return;
    const slotIndex = activePetSlot;
    setActivePetSlot(null);

    const uri = await tirarFoto();
    setPhotoAtSlot(slotIndex, uri);
  };

  const handlePickFromGallery = async () => {
    if (activePetSlot === null) return;
    const slotIndex = activePetSlot;
    setActivePetSlot(null);

    const uri = await escolherImagem();
    setPhotoAtSlot(slotIndex, uri);
  };

  const titulo = !temPerfil ? "Cadastre seu perfil" : editMode ? "Editar perfil" : "Meu perfil";

  return (
    <Tela estiloConteudo={styles.conteudo}>
      <Voltar />

      <View style={styles.header}>
        <TextTitle style={styles.title}>{titulo}</TextTitle>
        <Text style={styles.subtitle}>Fica salvo no seu celular, sem login</Text>
      </View>

      <View style={styles.avatarSection}>
        <Pressable
          onPress={handleAvatar}
          disabled={!editMode}
          accessibilityRole="button"
          accessibilityLabel={editMode ? "Escolher foto de perfil" : "Foto de perfil"}
          style={({ pressed }) => [styles.avatarWrapper, pressed && styles.pressed]}
        >
          <View style={styles.avatarCircle}>
            {imagemTutor ? (
              <Image
                source={{ uri: imagemTutor }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={styles.avatarIniciais}>{gerarIniciais(nome ?? "")}</Text>
            )}
          </View>
          {editMode && (
            <View style={styles.cameraBadge}>
              <Text style={styles.cameraIcon}>+</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>SEU NOME</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          editable={editMode}
          placeholder="Digite seu nome"
          placeholderTextColor="#9CA3AF"
          style={[styles.input, !editMode && styles.inputLeitura]}
        />
      </View>

      <SelectDropdown<CidadeTutor>
        label="Cidade"
        placeholder="Onde você mora?"
        value={cidade}
        onChange={setCidade}
        options={OPCOES_CIDADE}
        desabilitado={!editMode}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>SEUS PETS (ATÉ 2)</Text>
        <View style={styles.petsRow}>
          {([0, 1] as const).map((slotIndex) => {
            const photoUri = fotoPets[slotIndex];

            return (
              <Pressable
                key={slotIndex}
                onPress={() => handleOpenPetPicker(slotIndex)}
                disabled={!editMode}
                accessibilityRole="button"
                accessibilityLabel={
                  photoUri ? `Alterar foto do pet ${slotIndex + 1}` : `Adicionar foto do pet ${slotIndex + 1}`
                }
                style={({ pressed }) => [
                  styles.petCard,
                  photoUri && styles.petCardWithPhoto,
                  pressed && styles.pressed,
                ]}
              >
                {photoUri ? (
                  <Image
                    source={{ uri: photoUri }}
                    style={styles.petImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.petCardText}>{editMode ? "+ Foto" : "Sem foto"}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {mensagem ? <Text style={estilo.sucessoText}>{mensagem}</Text> : null}
      {erro ? <Text style={estilo.erroText}>{erro}</Text> : null}

      <Pressable
        onPress={handleEditar}
        disabled={salvando}
        accessibilityRole="button"
        accessibilityState={{ disabled: salvando, busy: salvando }}
        style={({ pressed }) => [
          styles.submitButton,
          (pressed || salvando) && styles.submitButtonPressed,
        ]}
      >
        <Text style={styles.submitButtonText}>
          {editMode ? (salvando ? "Salvando..." : "Salvar perfil") : "Editar perfil"}
        </Text>
      </Pressable>

      {temPerfil && !editMode && (
        <Pressable
          onPress={() => setExcluirModal(true)}
          accessibilityRole="button"
          hitSlop={8}
          style={styles.apagar}
        >
          <Text style={styles.apagarTexto}>Apagar perfil</Text>
        </Pressable>
      )}

      <Folha
        visivel={activePetSlot !== null}
        titulo={`Foto do pet ${activePetSlot !== null ? activePetSlot + 1 : ""}`}
        aoFechar={handleClosePetPicker}
      >
        <Pressable
          onPress={handleTakePhoto}
          style={({ pressed }) => [styles.sheetOption, pressed && styles.sheetOptionPressed]}
        >
          <Text style={styles.sheetOptionText}>Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={handlePickFromGallery}
          style={({ pressed }) => [styles.sheetOption, pressed && styles.sheetOptionPressed]}
        >
          <Text style={styles.sheetOptionText}>Escolher da galeria</Text>
        </Pressable>

        <Pressable
          onPress={handleClosePetPicker}
          style={({ pressed }) => [styles.sheetCancel, pressed && styles.sheetOptionPressed]}
        >
          <Text style={styles.sheetCancelText}>Cancelar</Text>
        </Pressable>
      </Folha>

      <Folha
        visivel={excluirModal}
        titulo="Apagar seu perfil?"
        aoFechar={() => setExcluirModal(false)}
      >
        <Text style={styles.sheetTexto}>O perfil salvo neste celular será apagado.</Text>

        <Pressable
          onPress={apagarPerfil}
          style={({ pressed }) => [styles.botaoApagar, pressed && styles.submitButtonPressed]}
        >
          <Text style={styles.submitButtonText}>Sim, apagar</Text>
        </Pressable>

        <Pressable
          onPress={() => setExcluirModal(false)}
          style={({ pressed }) => [styles.sheetCancel, pressed && styles.sheetOptionPressed]}
        >
          <Text style={styles.sheetCancelText}>Cancelar</Text>
        </Pressable>
      </Folha>
    </Tela>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    color: cores.azul,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 8,
  },
  avatarWrapper: {
    position: "relative",
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircle: {
    width: 108,
    height: 108,
    overflow: "hidden",
    borderRadius: 54,
    backgroundColor: "#F48A34",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FDBA74",
  },
  avatarIniciais: { color: cores.branco, fontFamily: "Chewy", fontSize: 28 },

  cameraBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FCF9F4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FCF9F4",
  },
  cameraIcon: {
    fontSize: 15,
    fontWeight: 800,
    fontFamily: "Chewy",
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#52525B",
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
  },
  inputLeitura: {
    backgroundColor: "transparent",
  },
  petsRow: {
    flexDirection: "row",
    gap: 12,
  },
  petCard: {
    flex: 1,
    aspectRatio: 1.15,
    backgroundColor: "#F9EBD9",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E6CCB2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  petCardWithPhoto: {
    borderStyle: "solid",
    padding: 0,
  },
  petImage: {
    width: "100%",
    height: "100%",
  },
  petCardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: "#F48A34",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonPressed: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  apagar: {
    alignSelf: "center",
    paddingVertical: 8,
  },
  apagarTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: cores.vermelho,
  },
  pressed: {
    opacity: 0.8,
  },
  sheetTexto: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
  },
  sheetOption: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sheetOptionPressed: {
    backgroundColor: "#F3F4F6",
  },
  sheetOptionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  sheetCancel: {
    marginTop: 4,
    alignItems: "center",
    paddingVertical: 12,
  },
  sheetCancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  botaoApagar: {
    backgroundColor: cores.vermelho,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
});
