export { userActions, userReducer } from './model/slice/userSlice'
export { getUserAuthData } from './model/selectors/getUserAuthData'
export { getUserInited } from './model/selectors/getUserInited'
export {
  getUserRoles,
  isUserAdmin,
  isUserManager
} from './model/selectors/roleSelectors'

export type { User, UserSchema } from './model/types/user'
export { UserRole } from './model/consts/userConsts'
