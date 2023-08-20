import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={classNames(cls.links)}>
        <AppLink className={classNames(cls.mainLink)} to={"/about"}>
          О сайте
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/"}>
          Главная
        </AppLink>
      </div>
    </div>
  )
}
