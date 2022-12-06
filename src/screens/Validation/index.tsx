import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
// import { Saude } from "../../dtos/Saude";
import { api } from "../../services/api";
import "./style.css";

let pilMap = new Map();
pilMap.set("Saúde", {
  head: "da saúde",
  vars: [
    { key: "alimentacao", value: "Alimentação saudavel" },
    { key: "exercicio", value: "Exercício físico" },
    { key: "exercise", value: "Exercício físico2" },
  ],
});
pilMap.set("Conhecimento", {
  head: "do conhecimento",
  vars: [
    { key: "article", value: "Artigo" },
    { key: "book", value: "Leitura de livro" },
  ],
});
pilMap.set("Inovacao", {
  head: "da Inovacao",
  vars: [
    { key: "inovacao", value: "Inovacao"}
  ]
})
pilMap.set("Interno", {
  head: "do interno",
  vars: [
    { key: "donate", value: "Doação"},
  ]
})

interface vTab {
  valTab: string;
}

export function Validation({ valTab }: vTab) {
  const [info, setInfo] = useState<any[]>([]);
  const [pag, setPag] = useState(1);

  async function fetchPendencias() {
    if (pag <= 0) {
      return setPag(1);
    }
    try {
      const { data } = await api.get(
        valTab === "Saúde"
          ? `/pilares/saude/pendentes?_page=${pag}&limit=10`
          : valTab === "Conhecimento" ? `/pilares/conhecimento/pendentes?_page=${pag}&limit=10`
          : valTab === "Interno" ? `/pilares/interno/pendentes?_page=${pag}&limit=10`
          : `/pilares/inovacao/pendentes?_page=${pag}&limit=10`
      );
      setInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  function pagState(pvar: any) {
    if (pvar.key === "Enter" && !isNaN(pvar.target.valueAsNumber)) {
      setPag(pvar.target.valueAsNumber as number);
      pvar.target.value = null;
      pvar.target.blur();

      fetchPendencias();
    }
  }

  useEffect(() => {
    fetchPendencias();
  }, [pag, valTab]);
  return (
    <div className="validationScreen">
      {false && ( // header desabilitado
        <div className="valHead">
          <h2 className="valPil">Pilar {pilMap.get(valTab).head}</h2>
          <div className="valEnvios">
            <div>Envios:</div>
            {pilMap.get(valTab).vars.map((item3: any) => {
              return <button key={item3.value}>{item3.value}</button>;
            })}
          </div>
        </div>
      )}
      <div className="cardList">
        {info.map((item) => {
          return (
            <Card
              key={item.id}
              post={item}
              vars={pilMap.get(valTab).vars}
              valTab={valTab}
              fetchPendencias={fetchPendencias}
            />
          );
        })}
      </div>

      <div className="pageNav">
        <button className="dubArrow" onClick={() => setPag(1)}>
          {"<<"}
        </button>
        <button
          className="arrow"
          onClick={() => setPag((oldState) => oldState - 1)}
        >
          {"<"}
        </button>
        <button
          className="arrow"
          onClick={() => setPag((oldState) => oldState + 1)}
        >
          {">"}
        </button>
        <input
          className="pageNum"
          type="number"
          value={pag}
          readOnly={true}
          onWheel={(event) => event.currentTarget.blur()}
        />
        <input
          className="pageNumDisplay"
          type="number"
          onKeyDown={pagState}
          onWheel={(event) => event.currentTarget.blur()}
        />
      </div>
    </div>
  );
}
