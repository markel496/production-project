import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from '@/shared/config/routeConfig/RequireAuth'
import { RequireRoles } from '@/shared/config/routeConfig/RequireRoles'
import {
  AppRoutesProps,
  routeConfig
} from '@/shared/config/routeConfig/routeConfig'
import { PageLoader } from '@/widgets/PageLoader'

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
