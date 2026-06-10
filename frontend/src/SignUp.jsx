import "./Auth.css"

function SignUp() {
    return (
        <div>
            <p className="title">Sign Up</p>

            <form>
                <input required type="text" placeholder="name" autoComplete="off" />
                <input required type="email" placeholder="email" autoComplete="off" className="email" />
                <input required type="password" placeholder="password" autoComplete="off" className="password"/>
                <button type="submit" className="btn">sign up</button>
                <a href="/login" className="link">already have an account?</a>
            </form>
        </div>
    )
}

export default SignUp;