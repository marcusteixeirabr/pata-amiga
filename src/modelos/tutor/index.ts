import AsyncStorage from "@react-native-async-storage/async-storage";
import { salvarFoto, retornaSucesso, retornaErro } from "@/utils";

export interface TutorDTO {
  nome: string;
  cidade: string;
  fotoTutor?: string;
}

export interface petDTO {
  nome: string;
  uri_foto: string;
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
    return retornaSucesso(JSON.stringify(await this.consultar()));
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
      AsyncStorage.multiRemove(["tutor"]);
      return retornaSucesso("sucesso");
    } catch (error: any) {
      return retornaErro("erro");
    }
  }

  async excluirPet(): Promise<MensagemRetorno> {
    try {
      return retornaSucesso("sucesso");
    } catch (error: any) {
      return retornaErro("erro");
    }
  }

  async cadastrarPet(dadosPet: petDTO): Promise<MensagemRetorno> {
    try {
      await AsyncStorage.setItem(dadosPet.nome, JSON.stringify(dadosPet));
      return retornaSucesso("Dados do pet salvos com sucesso.");
    } catch (error: any) {
      return retornaErro(error.message);
    }
  }

  async consultaPet(nomePet: string): Promise<MensagemRetorno> {
    try {
      const dadosPet = await AsyncStorage.getItem(nomePet);

      if (!dadosPet) throw new Error(`Não foi encontrado nenhum pet com nome: ${nomePet}`);

      return retornaSucesso(dadosPet);
    } catch (error: any) {
      return retornaErro(error.message);
    }
  }
}
