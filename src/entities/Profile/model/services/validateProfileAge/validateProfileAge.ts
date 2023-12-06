export function validateProfileAge(value?: string) {
  const regex = /^[0-9\b]+$/
  if (
    !value ||
    (regex.test(value!) &&
      Number(value) > 0 &&
      Number(value) < 100 &&
      value.length < 3)
  ) {
    return true
  } else {
    return false
  }
}
