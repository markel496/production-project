import { ReactNode } from 'react'

import { List } from '@/shared/ui/List'

import cls from '../../ui/AboutPage.module.scss'

import { useAboutTextTranslate } from './useAboutTextTranslate'

export function useAboutPageData() {
  const t = useAboutTextTranslate()

  const testingWork = [
    'Unit (Jest)',
    'Component (React Testing Library)',
    'Storybook + screenshot tests (Loki)',
    'E2E (Cypress)'
  ]

  const frontendSkills: ReactNode[] = [
    t.frontend_build,
    t.frontend_architecture,
    t.frontend_ui,
    t.frontend_i18n,
    t.frontend_optimisation,
    t.frontend_ci_cd,
    t.frontend_testing,
    <List
      className={cls.testing}
      key="testing"
      list={testingWork}
      bullet="▪"
    />,
    t.frontend_error_boundary,
    t.frontend_feature_flags,
    t.frontend_react_migration
  ]

  const backendSkills: ReactNode[] = [
    t.backend_rest_api,
    t.backend_mongoDB,
    t.backend_crud,
    t.backend_jwt_authorisation,
    t.backend_architecture
  ]

  const generalSkills: ReactNode[] = [
    t.skills_architecture,
    t.skills_infrastructure,
    t.skills_ui,
    t.skills_testing,
    t.skills_optimisation,
    t.skills_create_plugins,
    t.skills_authorisation,
    t.skills_backend
  ]

  return {
    t,
    frontendSkills,
    backendSkills,
    generalSkills
  }
}
