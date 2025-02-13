// eslint-disable-next-line markel-plugin/layer-imports
import { UserRole } from '@/entities/User'
import { RouteProps } from 'react-router-dom'

//Расширяю дефолтный RouteProps
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
