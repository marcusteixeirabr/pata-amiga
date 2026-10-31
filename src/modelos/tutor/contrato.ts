import type { CidadeTutor } from "@/modelos/cidade";

export type Tutor = {
  nome: string;
  cidade: CidadeTutor;
  fotoTutor?: string;
  fotosPet?: string[];
};
