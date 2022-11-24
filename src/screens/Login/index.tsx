import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import LogoSuperar from "../../assets/Superar_Inovar_SPI_Logo_2021-Color2.png";
import "./style.css";
import { useAuth } from "../../hooks/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { SignIn } = useAuth();
  const history = useHistory();

  async function LoginWeb() {
    const newUser = {
      email: email,
      password: senha,
    };
    try {
      await SignIn(newUser);
    } catch (error) {
      console.log(error);
    }
  }
  function preventRefresh(event: any) {
    event.preventDefault();
  }

  return (
    <div className="login">
      <div className="loginPage">
        <div className="loginImg">
          <div className="imgDiv">
            <img className="logoSuperar" src={LogoSuperar} alt=""></img>
          </div>
        </div>
        <form
          className="form"
          // onSubmit={() => {
          //   return false;
          // }}
          onSubmit={preventRefresh}
        >
          <div className="loginText">
            <div>
              <div className="h1Login">Sign in</div>
              <div className="h2Login">Entre com sua conta</div>
              <div className="h3Login">
                E acompanhe tudo sobre <br />o Superar Para Inovar
              </div>
            </div>
          </div>
          <div className="loginForm">
            <div>Email</div>
            <input
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
            <div>Senha</div>
            <input
              type="password"
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>
          {/* <div className="esqueceu">Esqueceu sua senha? Espero que não...</div> */}
          {/* <Link to="/home" className="submitLogin" onClick={LoginWeb}>
            <div>Sign in</div>
          </Link> */}
          <input
            value="Sign in"
            type="submit"
            className="submitLogin"
            onClick={LoginWeb}
          />
          <div className="createDiv">
            <div>Não tem cadastro? Crie sua conta no App&nbsp; </div>
            {/* <Link to="/" className="create" onClick={LoginWeb}>
              <div>Crie sua conta</div>
            </Link> */}
            <Link to="/" className="create" onClick={LoginWeb}>
              <div>Crie sua conta</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
