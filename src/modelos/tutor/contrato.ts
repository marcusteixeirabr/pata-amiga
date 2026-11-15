import type { CidadeTutor } from "@/modelos/cidade";

export type Tutor = {
  nome: string;
  cidade: CidadeTutor;
  documento: string;
  fotoTutor?: string;
  fotoPets: string[];
};
