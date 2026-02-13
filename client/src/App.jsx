import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'

function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>This is a placeholder dashboard. Replace with your real component.</p>
      <p>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
