import type { Cidade } from "@/modelos/cidade";

export type Tutor = {
  nome: string;
  cidadeTutor: Cidade | "Outra";
  fotoTutor?: string;
  fotosPet?: string[];
};
