import { useState, useEffect } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { SelectDropdown } from "@/components/Dropdown";

import { gerarIniciais } from "@/regras/gerarIniciais";
import { TutorDTO, MensagemRetorno } from "@/modelos/tutor";
import { styles as estilo } from "@/estilos";
import { cores } from "@/estilos/cores";
import { CIDADES, type CidadeTutor } from "@/modelos/cidade";

import { TutorService } from "@/modelos/tutor";
import { Voltar } from "@/components/BtnVoltar";

type CidadeOption = { label: string; value: CidadeTutor };

export default function CreateProfileScreen() {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [excluirModal, setExcluirModal] = useState<boolean>(false);
  const [cidadeOption, _] = useState<CidadeOption[]>(mapCidadeOptions());

  const [nome, setNome] = useState<TutorDTO["nome"]>("");
  const [cidade, setCidade] = useState<TutorDTO["cidade"]>(null);
  const [imagemTutor, setImagemTutor] = useState<TutorDTO["fotoTutor"]>(null);
  const [petFotos, setPetFotos] = useState<TutorDTO["petFotos"]>([null, null]);

  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const [activePetSlot, setActivePetSlot] = useState<0 | 1 | null>(null);

  useEffect(() => {
    new TutorService().consultar().then((dadosSalvos: MensagemRetorno) => {
      if (dadosSalvos?.erro) return;

      const dadosTutor: TutorDTO = JSON.parse(dadosSalvos?.mensagem ?? "{}");

      if (dadosTutor?.nome) {
        setEditMode(false);
        setNome(dadosTutor.nome);
        setCidade(dadosTutor.cidade);
        setImagemTutor(dadosTutor.fotoTutor);
        setPetFotos(dadosTutor.petFotos);
      }
    });
  }, []);

  function mapCidadeOptions(): CidadeOption[] {
    const list: CidadeOption[] = CIDADES.map((cidade) => ({
      label: cidade,
      value: cidade,
    }));
    list.push({ label: "Outra", value: "Outra" });
    return list;
  }

  async function escolherImagem(): Promise<string | null> {
    if (!editMode) return null;
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso aos arquivos de mídia.");
      return null;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
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

    let result = await ImagePicker.launchCameraAsync({
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
    setImagemTutor(uri);
  };

  const handleCadastrar = async () => {
    setMensagem("");
    setErro("");

    const resultado = await new TutorService().cadastrar({
      nome,
      cidade,
      petFotos,
      fotoTutor: imagemTutor,
    });

    if (resultado.sucesso) {
      setMensagem(String(resultado.mensagem));
      setNome("");
      setCidade(null);
      setTimeout(() => router.replace("/painel"), 1000);
    } else {
      setErro(String(resultado.erro));
    }
  };

  async function handleEditar() {
    if (editMode) await handleCadastrar();
    else setEditMode(true);
  }

  async function apagarPerfil() {
    await new TutorService().excluirTutor();
    router.dismissAll();
    router.replace("/escolha");
  }

  function handleParceiros() {
    router.replace("/painel");
  }

  const handleOpenPetPicker = (slotIndex: 0 | 1) => {
    if (editMode) setActivePetSlot(slotIndex);
  };

  const handleClosePetPicker = () => {
    setActivePetSlot(null);
  };

  const toggleExcluirModal = () => {
    setExcluirModal(!excluirModal);
  };

  const setPhotoAtSlot = (slotIndex: 0 | 1, uri: string | null) => {
    if (!uri) return;
    setPetFotos((prev) => {
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

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Voltar />
      {editMode ? (
        <View style={styles.header}>
          <Text style={styles.title}>Cadastre seu perfil</Text>
          <Text style={styles.subtitle}>Fica salvo no seu celular, sem login</Text>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.title}>Bem vindo, {nome}</Text>
        </View>
      )}

      <View style={styles.avatarSection}>
        <Pressable
          onPress={handleAvatar}
          accessibilityRole="button"
          accessibilityLabel="Adicionar foto de perfil"
          style={({ pressed }) => [styles.avatarWrapper, pressed && styles.pressed]}
        >
          <View style={styles.avatarCircle}>
            {imagemTutor ? (
              <Image
                source={{ uri: imagemTutor }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={styles.avatarIniciais}>{gerarIniciais(nome ?? "Sem Nome")}</Text>
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
          placeholder="Digite seu nome"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>

      <SelectDropdown<CidadeTutor>
        label="Cidade"
        placeholder="Onde você mora?"
        value={cidade}
        onChange={setCidade}
        options={cidadeOption}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>SEUS PETS (ATÉ 2)</Text>
        <View style={styles.petsRow}>
          {([0, 1] as const).map((slotIndex) => {
            if (!petFotos) return;
            const photoUri = petFotos[slotIndex];

            return (
              <Pressable
                key={slotIndex}
                onPress={() => handleOpenPetPicker(slotIndex)}
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
                  <Text style={styles.petCardText}>+ Foto</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {mensagem ? <Text style={estilo.sucessoText}>{mensagem}</Text> : null}
      {erro ? <Text style={estilo.erroText}>{erro}</Text> : null}
      {!editMode && (
        <Pressable
          onPress={handleParceiros}
          accessibilityRole="button"
          style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
        >
          <Text style={styles.submitButtonText}>Buscar Parceiros</Text>
        </Pressable>
      )}
      <Pressable
        onPress={handleEditar}
        accessibilityRole="button"
        style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
      >
        {editMode ? (
          <Text style={styles.submitButtonText}>Salvar perfil</Text>
        ) : (
          <Text style={styles.submitButtonText}>Editar perfil</Text>
        )}
      </Pressable>
      {!editMode && (
        <Pressable
          onPress={toggleExcluirModal}
          style={{ alignContent: "center", alignItems: "center" }}
        >
          <Text style={styles.petCardText}>Apagar Perfil</Text>
        </Pressable>
      )}
      <Modal
        visible={activePetSlot !== null}
        transparent
        animationType="fade"
        onRequestClose={handleClosePetPicker}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={handleClosePetPicker}
        >
          <Pressable
            style={styles.sheetContainer}
            onPress={() => {}}
          >
            <Text style={styles.sheetTitle}>Foto do pet {activePetSlot !== null ? activePetSlot + 1 : ""}</Text>

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
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        visible={excluirModal}
        transparent
        animationType="fade"
        onRequestClose={toggleExcluirModal}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={handleClosePetPicker}
        >
          <Pressable
            style={styles.sheetContainer}
            onPress={() => {}}
          >
            <Text style={styles.sheetTitle}>Tem certeza que deseja apagar seus dados?</Text>

            <View style={{ flexDirection: "row", alignContent: "space-between" }}>
              <Pressable
                onPress={apagarPerfil}
                style={styles.sheetCancel}
              >
                <Text style={styles.sheetCancelText}> Sim </Text>
              </Pressable>
              <Pressable
                onPress={toggleExcluirModal}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}> Não </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#18181B",
    letterSpacing: -0.5,
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
  avatarIcon: {
    fontSize: 48,
    color: "#FFFFFF",
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
    flex: 1,
  },
  submitButtonPressed: {
    opacity: 0.88,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  pressed: {
    opacity: 0.8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
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
    flex: 1,
  },
  sheetCancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
});
