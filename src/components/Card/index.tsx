import { useState } from "react";
import { format } from "date-fns";

import OpenIco from "../../assets/arrow_open.svg";
import ClosedIco from "../../assets/arrow_closed.svg";
import { CardDropdownSaude } from "../CardDropdownSaude";
import { CardDropdownConhecimento } from "../CardDropdownConhecimento";
import { CardDropdownInovacao } from "../CardDropdownInovacao";
import { CardDropdownInterno } from "../CardDropdownInterno";

import "./style.css";
import { ptBR } from "date-fns/esm/locale";

interface CardProps {
  // post: Saude;
  post: any;
  vars: any;
  valTab: string;
  fetchPendencias: () => Promise<void>;
}

export function Card({ post, vars, valTab, fetchPendencias }: CardProps) {
  const [open, setOpen] = useState(false);

  function calculateTime() {
    // const oldDate = new Date(post?.pilar?.data_inclusao);
    // const dateFormatted = formatDistanceToNow(oldDate, {
    //   locale: ptBR,
    //   addSuffix: true,
    // });
    const dateFormatted = format(
      new Date(post?.pilar?.data_inclusao),
      "dd 'de' MMMM 'de' yyyy",
      { locale: ptBR }
    );
    return dateFormatted;
  }

  return (
    <div className="container">
      <div style={{ borderBottomWidth: open ? "1px" : "0px" }} className="row">
        <div className="colabDiv">
          <div>{post.pilar.colaborador.nome}</div>
        </div>
        <div className="timeDiv">
          {/* <div>{formattedDate}</div> */}
          <span>{calculateTime()}</span>
        </div>
        <div className="arrowDiv">
          <button className="arrowBut" onClick={() => setOpen(!open)}>
            {open ? (
              <img className="ico" src={OpenIco} alt=""></img>
            ) : (
              <img className="ico" src={ClosedIco} alt=""></img>
            )}
          </button>
        </div>
      </div>
      <div className={open ? "rowContentOpen" : "rowContentClosed"}>
        {open && (
          <div className="contentContainer">
            {valTab === "Saúde" ? (
              <CardDropdownSaude
                categoriaExp={vars.map((item: any) => {
                  return post.categoria === item.key && item.value;
                })}
                categoria={post.categoria}
                legenda={post.legenda}
                // photos={imgArray}
                photos={post.photos}
                id={post.pilar.id}
                fetchPendencias={fetchPendencias}
              />
            ) : valTab === "Conhecimento" ? (
              <CardDropdownConhecimento
                categoriaExp={vars.map((item: any) => {
                  return post.categoria === item.key && item.value;
                })}
                categoria={post.categoria}
                descricao={post.descricao}
                files={post.files}
                id={post.pilar.id}
                pontuacao={post.pilar.pontuacao}
                fetchPendencias={fetchPendencias}
              />
            ) : valTab === "Inovacao" ? (
                <CardDropdownInovacao
                categoria={post.categoria}
                descricao={post.descricao}
                id={post.pilar.id}
                pontuacao={post.pilar.pontuacao}
                fetchPendencias={fetchPendencias}
              />
            ): (
              <CardDropdownInterno
                categoriaExp={vars.map((item: any) => {
                  return post.nome === item.key && item.value;
                })}
                categoria={post.nome}
                descricao={post.descricao}
                comprovante={post.comprovante}
                id={post.pilar.id}
                fetchPendencias={fetchPendencias}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
