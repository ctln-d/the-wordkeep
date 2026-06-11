import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import "./Auth.css"
import axios from "axios"

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3002/user/login", {
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            if (res.data.status === "SUCCESS") {
                setError("");
                navigate("/main");
            } else {
                setError(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <p className="title">Login</p>

            {error && (
                <div className="alert-box">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email"
                />
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password"
                    id="login-password"
                />
                <button
                    type="button"
                    className="eye-btn"
                    id="login-eye"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button type="submit" className="btn">login</button>
                <a href="/signup" className="link">don't have an account?</a>
            </form>
        </div>
    )
}

export default Login;