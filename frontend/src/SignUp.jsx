import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css"
import axios from "axios"

function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3002/user/signup", {
            username,
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
            <p className="title">Sign Up</p>

            {error && (
                <div className="alert-box">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    required
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="signup-password"
                />
                <button
                    type="button"
                    className="eye-btn"
                    id="signup-eye"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button type="submit" className="btn">sign up</button>
                <a href="/login" className="link">already have an account?</a>
            </form>
        </div>
    )
}

export default SignUp;