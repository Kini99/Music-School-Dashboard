import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

function PrivateRoute(props) {
    const {isAuth, loginUser} = useContext(AuthContext);

    const navigate=useNavigate()

    if(!isAuth){
        navigate("/login");
        return null;
    }
console.log(true)
    return props.children;
   
}

export default PrivateRoute;
