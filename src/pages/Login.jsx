import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContextProvider';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isAuth, loginUser} = useContext(AuthContext);

    const handleLogin = () => {
        if (username === "admin" && password === "Admin@123") {
            localStorage.setItem("isAuth", true);
            loginUser();
            navigate("/");
        } else {
            alert("Invalid Username/Password. Please try again!")
        }
    }

    return (
        <div className={`p-3 my-5 h-custom`}>
            <div className={`md:flex`}>
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                    className={`img-fluid md:w-1/2`}
                />
                <div className={`md:w-1/2 px-3`}>
                    <div className={`p-3 my-5 md:w-1/2`}>
                        <h1 className={`font-bold text-center mb-3`}>Login</h1>
                        <input
                            className={`mb-4 block w-full border border-gray-300 rounded-md py-2 px-3`}
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className={`mb-4 block w-full border border-gray-300 rounded-md py-2 px-3`}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={`d-flex justify-beeen mx-4 mb-4`}>
                            <label className={`flex items-center`}>
                                <input type="checkbox" className={`mr-2`} />
                                Remember me
                            </label>
                        </div>
                        <button className={`mb-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded`} onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login