import React from 'react'
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
} from 'react-router-dom'

interface RouteProps extends ReactDOMRouterProps {
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  return <ReactDOMRoute {...rest} render={() => <Component />} />
}

export default Route
