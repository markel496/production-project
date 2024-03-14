import { User } from 'entities/User'

export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
  POLITICS = 'POLITICS',
  SPORT = 'SPORT'
}

export enum ArticleBlockType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE'
}

export enum ArticleView {
  SMALL = 'SMALL',
  BIG = 'BIG'
}

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt'
}

export interface ArticleBlockBase {
  id: string
  type: ArticleBlockType
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT
  title: string
  paragraphs: string[]
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE
  src: string
  title?: string
}

export type ArticleBlock =
  | ArticleTextBlock
  | ArticleCodeBlock
  | ArticleImageBlock

export interface Article {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[]
  user: User
}
