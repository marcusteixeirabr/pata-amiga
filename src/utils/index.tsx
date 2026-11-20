import { File, Directory, Paths } from "expo-file-system";
// Se o erro persistir com a classe File, teste também:
import * as FileSystem from "expo-file-system/legacy"; // ou "expo-file-system" conforme sua versão

type MensagemRetorno = {
  sucesso: boolean;
  mensagem?: string;
  erro?: string;
};

export function retornaSucesso(mensagem: string): MensagemRetorno {
  return { sucesso: true, mensagem: mensagem };
}
export function retornaErro(mensagem: string): MensagemRetorno {
  return { sucesso: false, erro: mensagem };
}

export async function salvaImgTutorDocument(fileUri: string): Promise<string> {
  const origem = new File(fileUri);

  // Remove ponto inicial caso origem.extension venha como ".jpeg"
  const ext = (origem.extension || "jpg").replace(/^\.+/, "");
  const nomeArquivo = `avatar_tutor_${Date.now()}.${ext}`;

  // Garante barra no final de Paths.document.uri ao montar o URI de destino
  const baseDocUri = Paths.document.uri.endsWith("/")
    ? Paths.document.uri
    : `${Paths.document.uri}/`;
  const destinoUri = `${baseDocUri}${nomeArquivo}`;
  const destino = new File(destinoUri);

  console.log("origem.uri:", origem.uri);
  console.log("origem.exists:", origem.exists);
  console.log("destino.uri:", destino.uri);

  try {
    origem.copy(destino);
  } catch (err) {
    console.log("Exceção em origem.copy:", err);
  }

  // Checa novamente criando uma nova referência para evitar cache de propriedade no objeto
  const verificacao = new File(destinoUri);
  console.log("verificacao.exists:", verificacao.exists);

  if (verificacao.exists) {
    return verificacao.uri;
  }

  // Fallback caso File.copy não tenha gravado: copia via copyAsync
  await FileSystem.copyAsync({
    from: origem.uri,
    to: destinoUri,
  });

  const verificacaoFallback = new File(destinoUri);
  console.log("verificacaoFallback.exists:", verificacaoFallback.exists);

  if (!verificacaoFallback.exists) {
    throw new Error("Ocorreu um problema gravando sua foto. Tente novamente.");
  }

  return verificacaoFallback.uri;
}

export async function salvarFoto(uriTemporaria: string): Promise<string> {
  const pasta = new Directory(Paths.document, "fotos");
  if (!pasta.exists) pasta.create();

  const origem = new File(uriTemporaria);
  const destino = new File(pasta, `foto-${Date.now()}${origem.extension}`);
  await origem.copy(destino);

  return destino.uri;
}