export { userActions, userReducer } from './model/slice/userSlice'
export { getUserAuthData, getUserId } from './model/selectors/authDataSelectors'
export { getUserInited } from './model/selectors/getUserInited'
export { getUserRoles } from './model/selectors/getUserRoles'
export { UserRole } from './model/consts/userConsts'

export type { User, UserSchema } from './model/types/user'
