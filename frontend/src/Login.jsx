import "./Login.css"

function Login() {
    return (
        <div className="form">
            <p className="title">Login</p>

            <form>
                <input required type="email" placeholder="email" autoComplete="off" className="email" />
                <input required type="password" placeholder="password" autoComplete="off" className="password"/>
                <button type="submit" className="btn">login</button>
            </form>
        </div>
    )
}

export default Login;