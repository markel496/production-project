import { useParams } from 'react-router-dom'

import { EditableProfileCard } from '@/features/editableProfileCard'

import { Page } from '@/widgets/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props

  const { id } = useParams<{ id: string }>()

  return (
    <Page className={className} data-testid="ProfilePage">
      <EditableProfileCard id={id} />
    </Page>
  )
}

export default ProfilePage
