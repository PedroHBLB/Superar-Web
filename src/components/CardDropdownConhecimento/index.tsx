import React, { useState } from "react";
import { api } from "../../services/api";
import Aceito from "../../assets/check_aceito.svg";
import Rejeitado from "../../assets/check_rejeitado.svg";
import { Files } from "../../dtos/Conhecimento";
import Popup from "reactjs-popup";
// import { Document, Page, pdfjs } from "react-pdf";

import "./style.css";

interface ImgProps {
  categoriaExp: string;
  categoria: string;
  descricao: string;
  files: Files[];
  id: string;
  pontuacao: number;
  fetchPendencias: () => Promise<void>;
}

export function CardDropdownConhecimento({
  categoriaExp,
  categoria,
  descricao,
  files,
  id,
  pontuacao,
  fetchPendencias,
}: ImgProps) {
  const [reject, setReject] = useState(true);
  const [accept, setAccept] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [pontos, setPontos] = useState(0);

  async function answerAceito() {
    if (pontos > 0 && pontos < 20) {
      try {
        await api.put(`/pilares/conhecimento/pendente/${id}`, {
          status: "aprovado",
          categoria: categoria,
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
      await api.put(`/pilares/conhecimento/pendente/${id}`, {
        status: "recusado",
        categoria: categoria,
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
        <p className="categoria">Categoria: {categoriaExp}</p>
        <p className="textoEnvio">{descricao}</p>
      </div>
      <div className="cardImgs">
        {files?.map((file) => {
          return (
            <div key={file.id}>
              
              {file.uri.includes(".pdf") ? (
                <a href={file.uri} target="_blank">
                  <div className="cardPdf">
                    {file.uri
                      .substring(file.uri.lastIndexOf("/") + 1)
                      .substring(0, 20)}
                  </div>
                </a>
              ) : (
                <Popup
                  trigger={
                    <img 
                      className="cardImg" 
                      src={file.uri} 
                      alt="" 
                      loading="lazy"
                    />
                  }
                  modal
                  nested
                  closeOnDocumentClick
                  overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                  }}
                >
                {(close: any) => (
                  <>
                    <span className="close" onClick={close}>
                      &times;
                    </span>
                    <img className="modal-img" src={file.uri} alt="" loading="lazy"/>
                  </>
                )}
                </Popup>
              )}
            </div>
          );
        })}
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
