import { File, Paths } from "expo-file-system";

type MensagemRetorno = {
  sucesso: boolean;
  mensagem?: string;
  erro?: string;
}

export function retornaSucesso(mensagem: string) : MensagemRetorno {
  return { sucesso: true, mensagem: mensagem };
}
export function retornaErro(mensagem: string) : MensagemRetorno{
  return { sucesso: false, erro: mensagem };
}

export async function salvaImgTutorDocument(fileUri: string) {
    try {
      const file = new File(fileUri);
      await file.copy(Paths.document);
      return;
    } catch (error: any) {
      throw new Error("Ocorreu um problema gravando sua foto. Tente novamente.");
    }
  }
