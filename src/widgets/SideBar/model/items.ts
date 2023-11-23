import { routePath } from 'shared/config/routeConfig/routeConfig'
import MainPageIcon from 'shared/assets/icons/main-20-20.svg'
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg'
import ProfilePageIcon from 'shared/assets/icons/profile-20-20.svg'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: routePath.main,
    text: 'Главная',
    Icon: MainPageIcon
  },
  {
    path: routePath.about,
    text: 'О сайте',
    Icon: AboutPageIcon
  },
  {
    path: routePath.profile,
    text: 'Профиль',
    Icon: ProfilePageIcon,
    authOnly: true
  }
]
