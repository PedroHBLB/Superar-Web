import React, { useState } from "react";
import { api } from "../../services/api";
import Aceito from "../../assets/check_aceito.svg";
import Rejeitado from "../../assets/check_rejeitado.svg";
import { Photo } from "../../dtos/Interno";
import Popup from "reactjs-popup";

import "./style.css";

interface ImgProps {
  categoriaExp: string;
  categoria: string;
  descricao: string;
  // photos: string[];
  comprovante: Photo[];
  // photos: any[];
  id: string;
  fetchPendencias: () => Promise<void>;
}

export function CardDropdownInterno({
  categoriaExp,
  categoria,
  descricao,
  comprovante,
  id,
  fetchPendencias,
}: ImgProps) {
  const [reject, setReject] = useState(true);
  const [justificativa, setJustificativa] = useState("");

  async function answer(status: string) {
    try {
      await api.put(`/pilares/interno/pendente/${id}`, {
        status: status,
        categoria: categoria,
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
        {comprovante?.map((comprovante) => (
          <div key={comprovante.id}>
            <Popup
              trigger={
                <img
                  className="cardImg"
                  src={comprovante.comprovante}
                  alt={comprovante.id}
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
                  <img src={comprovante.comprovante} alt={comprovante.id} className="modal-image" />
                </>
              )}
            </Popup>
          </div>
        ))}
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
            <button className="rejeitando" onClick={() => answer("recusado")}>
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
        <button className="aceitarSaude" onClick={() => answer("aprovado")}>
          <img className="ico" src={Aceito} alt=""></img>
        </button>
      </div>
    </div>
  );
}
