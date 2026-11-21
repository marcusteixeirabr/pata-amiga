import { CidadeTutor } from "@/modelos/cidade";
import { TutorService } from "@/modelos/tutor";


describe("Cadastro de Tutor", () => {
  test("Deve cadastrar um novo tutor com sucesso ao informar nome e cidade válidos", async () => {
    const novoTutor = { nome: "Maria Silva", cidade: "Blumenau" as CidadeTutor };

    const resultado = await new TutorService().cadastrar(novoTutor);

    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe("Tutor cadastrado com sucesso!");
  });

  test("Deve rejeitar o cadastro caso o campo nome esteja vazio.", async () => {
    const tutorInvalido = { nome: "", cidade: "Blumenau" as CidadeTutor };

    const resultado = await new TutorService().cadastrar(tutorInvalido);

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("O campo nome é obrigatório.");
  });

  test("Deve rejeitar o cadastro caso o campo cidade esteja vazio.", async () => {
    const tutorInvalido = { nome: "Maria", cidade: "" as CidadeTutor };

    const resultado = await new TutorService().cadastrar(tutorInvalido);

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("O campo cidade é obrigatório.");
  });
});
