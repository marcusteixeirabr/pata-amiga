export interface TutorDTO {
  nome: string;
  cidade: string;
}

export class TutorService {
  static cadastrar: any;
  cadastrar(dados: TutorDTO) {
    if (!dados.nome?.trim()) {
      return { sucesso: false, erro: "O campo nome é obrigatório." };
    }
    if (!dados.cidade?.trim()) {
      return { sucesso: false, erro: "O campo cidade é obrigatório." };
    }
    return { sucesso: true, mensagem: "Tutor cadastrado com sucesso!" };
  }
}
