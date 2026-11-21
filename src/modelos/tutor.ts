import AsyncStorage from "@react-native-async-storage/async-storage";
import { salvarFoto, retornaSucesso, retornaErro } from "@/utils";
import type { CidadeTutor } from "@/modelos/cidade";

export interface TutorDTO {
  nome: string;
  cidade: CidadeTutor | null;
  fotoTutor?: string | null;
  fotoPets?: [string | null, string | null];
}

export interface MensagemRetorno {
  sucesso: boolean;
  mensagem?: string;
  erro?: string;
}

export class TutorService {
  async cadastrar(dados: TutorDTO) {
    if (!dados.nome?.trim()) {
      return retornaErro("O campo nome é obrigatório.");
    }
    if (!dados.cidade?.trim()) {
      return retornaErro("O campo cidade é obrigatório.");
    }

    try {
      if (dados.fotoTutor) {
        dados.fotoTutor = await salvarFoto(dados.fotoTutor);
      }
      await AsyncStorage.setItem("tutor", JSON.stringify(dados));
    } catch {
      return retornaErro("Ocorreu um problema gravando suas informações. \\n Tente novamente.");
    }
    return retornaSucesso("Tutor cadastrado com sucesso!");
  }

  async consultar(): Promise<MensagemRetorno> {
    try {
      const dadosTutor = await AsyncStorage.getItem("tutor");

      if (!dadosTutor) throw new Error("Não foram encontrados dados do tutor.");

      return retornaSucesso(dadosTutor);
    } catch (error: any) {
      return retornaErro(error.message);
    }
  }

  async hasTutor(): Promise<boolean> {
    try {
      const tutor = await AsyncStorage.getItem("tutor");
      return !!tutor;
    } catch (error) {
      console.error("Ocorreu erro verificando ");
      return false;
    }
  }

  async editarTutor(dadosTutor: TutorDTO) {
    try {
      const info = await this.cadastrar(dadosTutor);
      if (info.sucesso) retornaSucesso("Dados Atualizados com sucesso");
    } catch (error: any) {
      return retornaErro("Ocorreu um problema atualizando suas informações. <br> Tente novamente.");
    }
  }

  async excluirTutor(): Promise<MensagemRetorno> {
    try {
      await AsyncStorage.multiRemove(["tutor"]);
      return retornaSucesso("sucesso");
    } catch (error: any) {
      return retornaErro("erro");
    }
  }
}
