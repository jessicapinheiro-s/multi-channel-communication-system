import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Login from '../pages/Login'

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem' }}>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}
