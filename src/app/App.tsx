import "./styles/index.scss"
import { useTheme } from "app/providers/ThemeProvider"
import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "./providers/Router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"
import { Suspense } from "react"

const App = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames("app", {}, [theme])}>
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
