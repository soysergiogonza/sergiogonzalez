"use client";

import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from './Categories.module.css'

type Category = {
  id: string
  name: string
  created_at?: string
}

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
    
    if (error) {
      console.error('Error al cargar categorías:', error)
      return
    }
    
    if (data) {
      console.log('Categorías cargadas:', data)
      setCategories(data)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Articles</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          <Plus className={styles.plusIcon} />
        </button>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            loadCategories()
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

const CategoryModal = ({ onClose, onSuccess }: {
  onClose: () => void
  onSuccess: () => void
}) => {
  const [name, setName] = useState('')
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ 
          name,
          icon: '' // Por ahora dejamos el icono vacío
        }])
      
      if (error) {
        console.error('Error al crear la categoría:', error.message)
        return
      }

      console.log('Categoría creada exitosamente')
      onSuccess()
    } catch (error) {
      console.error('Error general:', error)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Nueva Categoría</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Categories 