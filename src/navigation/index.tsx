import { Spinner } from '@chakra-ui/react'
import { PublicRoutes } from 'navigation/routes'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const PageNotFound = React.lazy(() => import('containers/PageNotFound'))

const Navigation = () => {

    return <BrowserRouter>
        <React.Suspense fallback={<Spinner/>}>
            <Routes>
                 {PublicRoutes.map(route => <Route key={route.path} {...route}/>)}
                <Route path='*' element={<PageNotFound/>} />
            </Routes>
        </React.Suspense>
    </BrowserRouter>
}

export default Navigation