export const getInitialBodyClasses = () =>
  [...document.body.classList]
    .filter((cls) => !cls.includes('_theme'))
    .join(' ')
