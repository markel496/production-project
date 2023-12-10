import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'shared/config/routeConfig/RequireAuth'
import {
  AppRoutesProps,
  routeConfig
} from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <div className="page-wrapper">{route.element}</div>

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
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
