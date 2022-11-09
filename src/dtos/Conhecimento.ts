export interface Conhecimento {
  categoria: string;
  id: string;
  titulo: string;
  descricao: string;
  files: Files[];
  pilar: Pilar;
}

interface Colaborador {
  avatar: string; // Se não estiver lento vai ter
  id: string;
  nome: string;
  peso: number;
  pontuacao: number;
  setor: string;
}

interface Pilar {
  colaborador: Colaborador;
  data_alteracao: Date;
  data_inclusao: Date;
  id: string;
  pontuacao: number;
  status: "pendente" | "aprovado" | "recusado";
}

export interface Files {
  id: string;
  uri: string;
}
