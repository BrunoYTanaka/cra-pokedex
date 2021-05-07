import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Routes from './routes'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  )
}
export default App
