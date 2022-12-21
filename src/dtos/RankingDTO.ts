export interface UserRanking {
    colaborador_id: string;
    colaborador_nome: string;
    colaborador_email: string;
    colaborador_setor: string;
    colaborador_pontuacao: Number;
    colaborador_peso: Number;
    colaborador_avatar: string;
    colaborador_created_at: Date;
    colaborador_updated_at: Date;
    pontuacao_do_mes: Number;
  }
  
  export interface Ranking {
    ranking: UserRanking[];
  }
  