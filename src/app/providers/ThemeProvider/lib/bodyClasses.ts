export const bodyClasses = () =>
  [...document.body.classList]
    .filter((cls) => !cls.includes('_theme'))
    .join(' ')
