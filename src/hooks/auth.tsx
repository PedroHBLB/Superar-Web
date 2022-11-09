import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { api } from "../services/api";
import { Colaborador } from "../dtos/ColaboradorDTO";

interface AuthContextData {
  colaborador: Colaborador;
  LoadCookie: () => void;
  SignIn: (credentials: SignInCredentials) => Promise<void>;
  SignOut: () => void;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Colaborador>({} as Colaborador);
  const cookies = new Cookies();
  const history = useHistory();

  function SignOut() {
    try {
      cookies.remove("@SuperarParaInovar:user");
      setUser({} as Colaborador);
      api.defaults.headers.authorization = ``;
      history.push("/");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function SignIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const newColaborador: Colaborador = {
        data: response.data.data,
        access_token: response.data.access_token,
      };
      api.defaults.headers.authorization = `Bearer ${newColaborador.access_token}`;
      setUser(newColaborador);
      cookies.set("@SuperarParaInovar:user", newColaborador, {
        path: "/",
        maxAge: 259200,
      });
      history.push("/home");
    } catch (error: any) {
      throw new Error(error);
    }
  }
  function LoadCookie() {
    const colaborador: Colaborador = cookies.get("@SuperarParaInovar:user");
    colaborador &&
      (api.defaults.headers.authorization = `Bearer ${colaborador.access_token}`);
    colaborador && history.push("/home");
    setUser(colaborador);
  }
  useEffect(() => {
    LoadCookie();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        colaborador: user,
        LoadCookie,
        SignIn,
        // SignUp,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
