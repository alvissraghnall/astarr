import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../util/local-storage.hook";
import { useNavigate } from "react-router-dom";

export type AuthContextValue = {
    token: string | null,
    login: (t: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [token, setToken] = useLocalStorage<string | null>("token", null);
    const navigate = useNavigate();

    const login = async (data: string) => {
        setToken(data);
        navigate("/profile");
    }

    const logout = () => {
        setToken(null);
        navigate("/", { replace: true })
    }

    const value = useMemo(
        () => ({
            token,
            login,
            logout
        }), [token]
    )
   

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);