import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Pokedex from '../pages/Pokedex'
import Pokemon from '../pages/Pokemon'
import NotFound from '../pages/404'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Pokedex} />
    <Route path="/pokemon/:id" component={Pokemon} />
    <Route path="*" component={NotFound} />
  </Switch>
)
export default Routes
