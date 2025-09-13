import { Page } from '@/widgets/Page'
import { Text, TextSize } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'
import { List } from '@/shared/ui/List'

import { useAboutPageData } from '../lib/hooks/useAboutPageData'

import cls from './AboutPage.module.scss'

const AboutPage = () => {
  const { t, frontendSkills, backendSkills, generalSkills } = useAboutPageData()

  return (
    <Page data-testid="AboutPage">
      <VStack className={cls.title} gap="16">
        <Text title={t.about_title} size={TextSize.L} />
        <Text text={t.about_text} />
      </VStack>

      <VStack className={cls.title} gap="16">
        <Text title={t.working_title} size={TextSize.L} />
        <Text title="Frontend" />
        <List list={frontendSkills} bullet="✔" />
      </VStack>

      <VStack className={cls.title} gap="16">
        <Text title="Backend" />
        <List list={backendSkills} bullet="✔" />
      </VStack>

      <VStack gap="16">
        <Text title={t.skills_title} size={TextSize.L} />
        <List list={generalSkills} bullet="➤" />
      </VStack>
    </Page>
  )
}

export default AboutPage
