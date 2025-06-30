import { Suspense, useEffect } from 'react'

import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'

import { initUserData, useGetUserInited } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { PageLoader } from '@/widgets/PageLoader'

import { AppRouter } from './providers/Router'

const App = () => {
  const inited = useGetUserInited()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initUserData())
  }, [dispatch])

  if (!inited) {
    return <PageLoader />
  }

  return (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
