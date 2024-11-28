import { useCallback, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { debounce } from '@/utils/debounce';
import styles from './EditableDescription.module.css';
import css from 'styled-jsx/css';
import { FloatingMenu } from '../FloatingMenu/FloatingMenu';
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'


const lowlight = createLowlight(common);
lowlight.register('js', javascript);
lowlight.register('ts', typescript);

interface EditableDescriptionProps {
  postId: string;
}

export const EditableDescription = ({ postId }: EditableDescriptionProps) => {
  const { currentPost, isSaving, updatePost } = useDashboardStore();

  const matches = postId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
  const uuid = matches ? matches[0] : null;

  const debouncedSync = useCallback(
    debounce((id: string, description: string) => {
      updatePost(id, { description });
    }, 1000),
    []
  );

  const handleDescriptionChange = useCallback((newDescription: string) => {
    if (!currentPost || !uuid) return;
    updatePost(uuid, { description: newDescription });
    debouncedSync(uuid, newDescription);
  }, [currentPost, uuid, updatePost]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Agregar descripción...',
      }),
    ],
    content: currentPost?.description || '',
    editorProps: {
      attributes: {
        class: styles.editor,
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleDescriptionChange(html);
    }
  });

  useEffect(() => {
    if (editor && currentPost?.description) {
      editor.commands.setContent(currentPost.description);
    }
  }, [currentPost?.description, editor]);

  if (!currentPost) return null;

  return (
    <blockquote className={`${styles.descriptionContainer} ${currentPost?.description ? styles.hasContent : ''}`}>
      {editor && <FloatingMenu editor={editor} />}
      <EditorContent 
        editor={editor} 
        className={styles.editorContent}
      />
      {isSaving && (
        <div className={styles.savingIndicator}>
          Guardando...
        </div>
      )}
    </blockquote>
  );
};