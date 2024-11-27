import { supabase } from '@/lib/supabase'
import type { Post } from '@/types/blog/post'

export const articlesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('position', { ascending: true })

    if (error) throw error
    return data as Post[]
  }
}
