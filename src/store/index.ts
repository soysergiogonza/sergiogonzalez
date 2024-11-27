import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Post } from '@/types/blog/post'

interface BlogState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  updatePost: (id: string, post: Post) => void
  deletePost: (id: string) => void
}

export const useBlogStore = create<BlogState>()(
  devtools(
    persist(
      (set) => ({
        posts: [],
        setPosts: (posts) => set({ posts }),
        addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
        updatePost: (id, updatedPost) =>
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, ...updatedPost } : post
            ),
          })),
        deletePost: (id) =>
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
          })),
      }),
      {
        name: 'blog-storage',
      }
    )
  )
)
