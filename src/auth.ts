import Cookies from "universal-cookie";

export const isAuthenticated = () => {
  const cookies = new Cookies();
  const colaborador = cookies.get("@SuperarParaInovar:user") ? true : false;
  return colaborador;
};
