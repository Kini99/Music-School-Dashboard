import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

function AuthContextProvider(props) {

    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const auth = localStorage.getItem("isAuth");
            setIsAuth(auth);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        loginUser();
      }, []);

    return (
        <AuthContext.Provider value={{ isAuth, loginUser}}>
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContextProvider;
