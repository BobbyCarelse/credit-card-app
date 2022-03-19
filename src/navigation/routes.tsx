import React from 'react'
import { RouteProps } from 'react-router-dom'

const HomeScreen = React.lazy(() => import('containers/HomeScreen'))
const BannedCountriesScreen = React.lazy(() => import('containers/BannedCountriesScreen'))

export interface RouteObject extends RouteProps {
  exact: boolean
  path: string
  element: any
  title: string
}

export const PublicRoutes: RouteObject[] = [
  {
    exact: true,
    path: '/',
    element: <HomeScreen />,
    title: 'Home Screen'
  },
  {
    exact: true,
    path: '/banned-countries',
    element: <BannedCountriesScreen />,
    title: 'Banned Countries'
  }
]
