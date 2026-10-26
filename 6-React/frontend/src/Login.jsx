import { useState } from "react";
import{ useNavigate } from 'react-router-dom'
import "@styles/Login.css"

const Login = () => {
    const[username,setUsername]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(username == "admin" && password=="admin"){
            console.log("Login Ok")
            localStorage.setItem("isLoggedIn", "true");
            navigate('/actividades')
        }
        else{
            console.log("login incorrecto")
        }
    }
    return(
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
            <h2>Iniciar sesion</h2>
            <label htmlFor="username">Username : </label>
            <input id="username" type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)}
            value={username}
            required/>
            <label htmlFor="password"> Password: </label>
            <input id="password" type="password" placeholder="contrasenia" onChange={(e) => setPassword(e.target.value)}
            value={password}
            required/>
            <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}
export default Login;