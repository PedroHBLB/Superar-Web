import React, { useState } from "react";
import LogoSpi from "../../assets/SPI_Logo_semFundo.svg";
import LogoSuperar from "../../assets/Superar_Inovar_SPI_Logo_2021-Color2.png";
import HomeIco from "../../assets/HOME.svg";

import { Validation } from "../Validation";
import { ValidationTable } from "../ValidationTable";
import { Admin } from "../Admin";
import { useAuth } from "../../hooks/auth";
import "./style.css";

export function Home() {
  const [tab, setTab] = useState("Validação");
  const [val, setVal] = useState("Geral");
  const { colaborador } = useAuth();
  const { SignOut } = useAuth();

  function LogOutWeb() {
    SignOut();
  }
  return (
    <div className="home">
      <header className="header">
        <img className="logoSpi" src={LogoSpi} alt=""></img>
        <img className="logoSuperar" src={LogoSuperar} alt=""></img>
        <div className="userName">{colaborador?.data?.nome}</div>
      </header>
      <nav>
        <div className="tab">
          <div className="tabLeft">
            <div className="homeTab">
              <button
                className={tab === "Home" ? "active" : "inactive"}
                onClick={() => setTab("Home")}
              >
                <div className="homeBox">
                  <img className="homeIco" src={HomeIco} alt=""></img>
                </div>
              </button>
            </div>
            <div className="valiTab">
              <button
                className={tab === "Validação" ? "active" : "inactive"}
                onClick={() => setTab("Validação")}
              >
                Validação
              </button>
            </div>
            <div className="admTab">
              <button
                className={tab === "Admin" ? "active" : "inactive"}
                onClick={() => setTab("Admin")}
              >
                Admin
              </button>
            </div>
          </div>
          <div className="tabRight">
            <div className="logOut">
              <button className={"inactive"} onClick={LogOutWeb}>
                Log Out
              </button>
            </div>
          </div>
        </div>
        {tab === "Validação" && (
          <div className="tabSub">
            <div className="tabSubBts">
              <button
                className={val === "Geral" ? "activeSub" : "inactive"}
                onClick={() => setVal("Geral")}
              >
                Visão geral
              </button>
              <button
                className={val === "Saúde" ? "activeSub" : "inactive"}
                onClick={() => setVal("Saúde")}
              >
                Saúde
              </button>
              <button
                className={val === "Conhecimento" ? "activeSub" : "inactive"}
                onClick={() => setVal("Conhecimento")}
              >
                Conhecimento
              </button>
              <button
                className={val === "Inovacao" ? "activeSub" : "inactive"}
                onClick={() => setVal("Inovacao")}
              >
                Inovacao
              </button>
            </div>
          </div>
        )}
      </nav>
      {tab === "Home" && (
        <div id="Home" className="tabcontent">
          <h1>Em construção</h1>
        </div>
      )}
      {tab === "Validação" && (
        <div id="Validação" className="tabcontent">
          {val !== "Geral" ? <Validation valTab={val} /> : <ValidationTable />}
        </div>
      )}
      {tab === "Admin" && (
        <div id="Admin" className="tabcontent">
          <a
            className="tabLink"
            target="_blank"
            href="https://spiintegradora-my.sharepoint.com/:x:/g/personal/caio_silva_integradora_com_br/EVWM1gNELYxGuqkZPWrWvk8BvDvs3baEagFQ8-Wf6_to0Q"
          >
            Link para editar a tabela
          </a>
          {/* <Admin /> */}
        </div>
      )}
    </div>
  );
}
