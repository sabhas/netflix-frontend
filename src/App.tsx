import "./app.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Watch from "./pages/watch"

const App = () => {
  const user = true

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/series" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
