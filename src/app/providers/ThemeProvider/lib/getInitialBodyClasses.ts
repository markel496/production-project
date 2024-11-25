export const getInitialBodyClasses = () => {
  if (__PROJECT__ !== 'storybook') return ''
  return [...document.body.classList]
    .filter((cls) => !cls.includes('_theme'))
    .join(' ')
}
