export interface Colaborador {
  data: {
    nome: string;
    email: string;
    setor: string;
    pontuacao: number;
    peso: number;
    avatar: string;
  };
  access_token: string;
}
