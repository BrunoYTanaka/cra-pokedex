import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Pokedex from '../pages/Pokedex'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Pokedex} />
  </Switch>
)
export default Routes
