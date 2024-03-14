import { ArticleDetailsCommentsSchema } from './articleDetailsCommentsSchema'
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema
  recommendations: ArticleDetailsRecommendationsSchema
}
