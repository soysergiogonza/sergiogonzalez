import { supabase } from '@/lib/supabase'
import type { Category } from '@/types/categories'

export const categoriesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data as Category[]
  },

  async create(name: string, icon?: string) {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name, icon })
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  async update(id: string, name: string, icon?: string) {
    const { data, error } = await supabase
      .from('categories')
      .update({ name, icon })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}