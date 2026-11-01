import type { Tutor } from "@/modelos/tutor/contrato";

describe("Tutores", () => {
  const exemploTutor: Tutor = {
    nome: "João Silva",
    cidade: "Itajaí",
    fotoTutor: "https://example.com/foto.jpg",
    fotoPets: ["https://example.com/foto_pet.jpg"],
  };

  test("Aceita Outra cidade", () => {
    const tutorOutraCidade: Tutor = {
      ...exemploTutor,
      cidade: "Outra",
    };
  });

  test("Aceita tutor sem foto", () => {
    const tutorSemFoto: Tutor = {
      nome: "Pedro Silva",
      cidade: "Brusque",
      fotoPets: ["https://example.com/foto_do_pet.jpg"],
    };
  });

  test("Aceita 3 fotos de Pet", () => {
    const tutorCom3Fotos: Tutor = {
      ...exemploTutor,
      fotoPets: [
        "https://example.com/foto_pet1.jpg",
        "https://example.com/foto_pet2.jpg",
        "https://example.com/foto_pet3.jpg",
      ],
    };
  });

  test("Rejeita cidade vazia", () => {
    const tutorCidadeVazia: Tutor = {
      ...exemploTutor,
      // @ts-expect-error cidade não pode ser vazia
      cidade: "",
    };
  });

  test("Rejeita cidade fora da lista sem ser Outra", () => {
    const tutorCidadeInvalida: Tutor = {
      ...exemploTutor,
      // @ts-expect-error cidade deve ser uma das cidades válidas ou "Outra"
      cidade: "Navegantes",
    };
  });
});
