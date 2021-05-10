import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Routes from './routes'
import { PokemonProvider } from './contexts/pokemonContext'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <Router>
      <PokemonProvider>
        <Header />
        <Routes />
      </PokemonProvider>
    </Router>
  )
}
export default App
