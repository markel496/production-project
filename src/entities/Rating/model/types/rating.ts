export interface RatingSchema {
  _id: string
  autor: string
  dataId: string // id статьи или профиля - на кого отзыв
  rating: number
}
