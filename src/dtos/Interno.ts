export interface Interno {
    categoria: string;
    id: string;
    descricao: string;
    photos: Photo[];
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
  
  export interface Photo {
    id: string;
    comprovante: string;
  }
  