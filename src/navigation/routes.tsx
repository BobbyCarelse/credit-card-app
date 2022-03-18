import React from 'react'
import { RouteProps } from 'react-router-dom'

const HomeScreen = React.lazy(() => import('containers/HomeScreen'))

export interface RouteObject extends RouteProps {
    exact: boolean
    path: string
    element: any
    title: string
}

export const PublicRoutes: RouteObject[] = [
    {
        exact: true, 
        path: "/",
        element: <HomeScreen/>,
        title: 'Home Screen'
    }
]