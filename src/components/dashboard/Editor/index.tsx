import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import styles from './Editor.module.css'

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className={styles.editorWrapper}>
      <EditorContent editor={editor} />
    </div>
  )
} 