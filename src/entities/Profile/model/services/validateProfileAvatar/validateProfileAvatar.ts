// https://www.zhenghao.io/posts/verify-image-url

export function validateProfileAvatar(url: string) {
  const img = new Image()
  img.src = url

  const result = new Promise((resolve) => {
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })

  return result
}
