import React, { useState } from "react";
import { api } from "../../services/api";
import Aceito from "../../assets/check_aceito.svg";
import Rejeitado from "../../assets/check_rejeitado.svg";
//import { Inovacao } from "../../dtos/Inovacao";

import "./style.css";

interface InovacaoProps {
    categoria: string;
    descricao: string;
    id: string;
    pontuacao: number;
    fetchPendencias: () => Promise<void>;
}

export function CardDropdownInovacao({
    categoria,
    descricao,
    id,
    pontuacao,
    fetchPendencias,
}: InovacaoProps) {
    const [reject, setReject] = useState(true);
    const [accept, setAccept] = useState(false);
    const [justificativa, setJustificativa] = useState("");
    const [pontos, setPontos] = useState(0);

    async function answerAceito() {
        if (pontos > 0 && pontos < 20) {
            try {
                await api.put(`/pilares/inovacao/pendente/${id}`, {
                    status: "aprovado",
                    categoria: "inovacao",
                    pontuacao: pontos,
                    justificativa: justificativa,
                });
                fetchPendencias();
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function answerRecusado() {
        try {
            await api.put(`/pilares/inovacao/pendente/${id}`, {
                status: "recusado",
                categoria: "inovacao",
                pontuacao: 0,
                justificativa: justificativa,
            });
            fetchPendencias();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="cardContent">
          <div className="cardText">
            <p className="categoria">Categoria: Inovação</p>
            <p className="textoEnvio">{descricao}</p>
          </div>
          <div className="cardButtons">
            {reject ? (
              <div className="preRejBox">
                <button className="rejeitar" onClick={() => setReject(false)}>
                  <img className="ico" src={Rejeitado} alt=""></img>
                </button>
              </div>
            ) : (
              <div className="rejBox">
                <button className="rejeitando" onClick={answerRecusado}>
                  <img className="ico" src={Rejeitado} alt=""></img>
                </button>
                <p className="textFix">Justificativa:</p>
                <input
                  className="textBox"
                  type="text"
                  onChange={(event) => setJustificativa(event.target.value)}
                />
              </div>
            )}
            {accept ? (
              <div className="acBox2">
                <p className="valueText">Pontos:</p>
                <input
                  className="valueBox"
                  type="number"
                  onChange={(event) => setPontos(event.target.valueAsNumber)}
                />
                <button className="aceitando" onClick={answerAceito}>
                  <img className="ico" src={Aceito} alt=""></img>
                </button>
              </div>
            ) : (
              <div className="acBox1">
                <button className="aceitar" onClick={() => setAccept(true)}>
                  <img className="ico" src={Aceito} alt=""></img>
                </button>
              </div>
            )}
          </div>
        </div>
      );
}