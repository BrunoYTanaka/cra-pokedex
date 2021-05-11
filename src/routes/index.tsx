import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Pokedex from '../pages/Pokedex'
import Pokemon from '../pages/Pokemon'
import NotFounded from '../pages/NotFounded'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Pokedex} />
    <Route path="/pokemon/:id" component={Pokemon} />
    <Route path="*" component={NotFounded} />
  </Switch>
)
export default Routes
