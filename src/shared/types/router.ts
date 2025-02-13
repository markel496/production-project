import { UserRole } from '@/entities/User'
import { RouteProps } from 'react-router-dom'

//Расширяю дефолтный RouteProps
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
