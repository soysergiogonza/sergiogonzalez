import { supabase } from '@/lib/supabase'
import type { Post } from '@/types/blog/post'

export const articlesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('position', { ascending: true })

    if (error) throw error
    return data as Post[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Post
  },

  async create(post: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  async update(id: string, post: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
