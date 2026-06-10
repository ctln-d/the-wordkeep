import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./Main"
import Login from "./Login"
import SignUp from "./SignUp";

function App() {
    return (
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<Main />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<SignUp />} />
         </Routes>
     </BrowserRouter>
    )
}

export default App;