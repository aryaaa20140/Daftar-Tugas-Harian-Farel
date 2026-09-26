import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Tugas from './pages/Tugas'
import Profil from './pages/Profil'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tugas" element={<Tugas />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App