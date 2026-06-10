import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css"
import axios from "axios"

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3002/user/signup", {
            name,
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            if (res.data.status === "SUCCESS") {
                navigate("/");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <p className="title">Sign Up</p>

            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="name"
                />
                <input
                    required
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email"
                />
                <div className="password-container">
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password"
                    />
                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <button type="submit" className="btn">sign up</button>
                <a href="/login" className="link">already have an account?</a>
            </form>
        </div>
    )
}

export default SignUp;