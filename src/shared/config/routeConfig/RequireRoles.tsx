import { Navigate, useLocation } from 'react-router-dom'
import { routePath } from './routeConfig'
import { UserRole, getUserRoles } from 'entities/User'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

interface RequireRolesProps {
  children: JSX.Element
  roles?: UserRole[]
}

export function RequireRoles(props: RequireRolesProps) {
  const { children, roles } = props

  const userRoles = useSelector(getUserRoles)
  const location = useLocation()

  const hasRequiredRoles = useMemo(() => {
    if (!roles) return true

    return roles.some((role) => userRoles?.includes(role))
  }, [roles, userRoles])

  if (!hasRequiredRoles) {
    return (
      <Navigate to={routePath.forbidden} state={{ from: location }} replace />
    )
  }

  return children
}
