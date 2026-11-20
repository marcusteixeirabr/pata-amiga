import { useState, useEffect } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { SelectDropdown } from "@/components/dropdown";
import { CIDADES, CidadeTutor } from "@/modelos/cidade";
import { TutorDTO, MensagemRetorno } from "@/modelos/tutor";
import { styles as estilo, tutorStyles } from "@/estilos";

import { TutorService } from "@/modelos/tutor";

export default function CreateProfileScreen() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState<CidadeTutor | null>(null);
  const [imagemTutor, setImagemTutor] = useState<string | undefined>(undefined);
  const [petPhotos, setPetPhotos] = useState<[string | null, string | null]>([null, null]);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [activePetSlot, setActivePetSlot] = useState<0 | 1 | null>(null);

  useEffect(() => {
    new TutorService().consultar().then((dadosSalvos: MensagemRetorno) => {
      if (dadosSalvos?.erro) return;

      const dadosTutor: TutorDTO = JSON.parse(dadosSalvos?.mensagem ?? "{}");
      if (dadosTutor?.nome) router.replace("/meuPerfil");
    });
  }, []);

  async function escolherImagem() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É necessário fornecer acesso aos arquivos de mídia.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagemTutor(result.assets[0].uri);
    }
  }

  async function tirarFoto() {
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
  }

  const handleCadastrar = async () => {
    setMensagem("");
    setErro("");

    const resultado = await new TutorService().cadastrar({
      nome,
      cidade,
      fotoTutor: imagemTutor,
    });

    if (resultado.sucesso) {
      setMensagem(String(resultado.mensagem));
      setNome("");
      setCidade(null);
      setTimeout(() => router.replace("/meuPerfil"), 1000);
    } else {
      setErro(String(resultado.erro));
    }
  };

  const handlePetSlotPress = (index: 0 | 1) => {
    // TODO: plugar serviço de foto do pet no slot `index`
    setPetPhotos((prev) => prev);
  };

  const handleSave = () => {
    // TODO: plugar serviço de salvar perfil
  };

  const handleOpenPetPicker = (slotIndex: 0 | 1) => {
    setActivePetSlot(slotIndex);
  };

  const handleClosePetPicker = () => {
    setActivePetSlot(null);
  };

  const setPhotoAtSlot = (slotIndex: 0 | 1, uri: string | null) => {
    if (!uri) return;
    setPetPhotos((prev) => {
      const next: [string | null, string | null] = [...prev];
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
      <View style={styles.header}>
        <Text style={styles.title}>Crie seu perfil</Text>
        <Text style={styles.subtitle}>Fica salvo no seu celular, sem login</Text>
      </View>

      <View style={styles.avatarSection}>
        <Pressable
          onPress={escolherImagem}
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
              <Text style={styles.avatarIcon}>👤</Text>
            )}
          </View>
          <View style={styles.cameraBadge}>
            <Text style={styles.cameraIcon}>📷</Text>
          </View>
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

      <SelectDropdown<TutorDTO["cidade"]>
        label="Cidade"
        placeholder="Onde você mora?"
        value={cidade}
        onChange={setCidade}
        options={CIDADES.map((cidade) => {
          return { label: cidade, value: cidade };
        })}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>SEUS PETS (ATÉ 2)</Text>
        <View style={styles.petsRow}>
          {([0, 1] as const).map((slotIndex) => {
            const photoUri = petPhotos[slotIndex];

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
      <Pressable
        onPress={handleCadastrar}
        accessibilityRole="button"
        style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
      >
        <Text style={styles.submitButtonText}>Salvar perfil</Text>
      </Pressable>

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
  cameraBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FCF9F4",
  },
  cameraIcon: {
    fontSize: 15,
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
  },
  sheetCancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
});
