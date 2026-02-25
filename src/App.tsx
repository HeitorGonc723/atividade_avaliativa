import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TaskMaster from "./pages/Todo"
import ConnectHub from "./pages/Contacts"
import MoneyFlow from "./pages/Finances"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskMaster />} />
        <Route path="/contacts" element={<ConnectHub />} />
        <Route path="/finance" element={<MoneyFlow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App