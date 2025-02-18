import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppRoutesProps } from '@/shared/types/router'

import { PageLoader } from '@/widgets/PageLoader'

import { routeConfig } from '../config/routeConfig'

import { RequireRoles } from './RequireRoles'


import { RequireAuth } from './RequireAuth'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <>{route.element}</>

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>
              <RequireRoles roles={route.roles}>{element}</RequireRoles>
            </RequireAuth>
          ) : (
            element
          )
        }
      />
    )
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
