export interface Post {
  id: string
  title: string
  description?: string
  category_id: string
  created_at: string
  slug?: string
  content?: string
  icon?: string
  date?: string
  category?: string
  colors?: string[]
  tags?: string[]
  notion?: string
  position?: number
  published?: boolean
  banner?: string
  updated_at?: string
} 