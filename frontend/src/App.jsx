import { Navigate, Routes, Route } from "react-router-dom"
import Main from "./Main"
import Login from "./Login"
import SignUp from "./SignUp";

// maybe change w guest landing pg before login/sign up
function App() {
    return (
     <Routes>
         <Route path="/" element={<Navigate to="/login" replace />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/main" element={<Main />} />
     </Routes>
    )
}

export default App;