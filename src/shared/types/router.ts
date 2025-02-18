/* eslint-disable markel-plugin/layer-imports */
import { RouteProps } from 'react-router-dom'

import { UserRole } from '@/entities/User'

//Расширяю дефолтный RouteProps
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
