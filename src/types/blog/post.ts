export interface Post {
  id: string
  title: string
  slug: string
  content: string
  icon?: string
  description?: string
  date: string
  category: string
  colors?: string[]
  tags?: string[]
  notion?: string
  position: number
  published: boolean
  banner?: string
  created_at: string
  updated_at: string
  category_id: string
} 