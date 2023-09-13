import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {

  const [isAuth, setIsAuth] = useState(false);

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
    <AuthContext.Provider value={{ isAuth, loginUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
