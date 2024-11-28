import { useCallback, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { debounce } from '@/utils/debounce';
import styles from './EditableDescription.module.css';
import { FloatingMenu } from '../FloatingMenu/FloatingMenu';
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'


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

  // @ts-ignore
  const editor = useEditor({
    extensions: [
        StarterKit.configure(),
        Highlight.configure(),
        Typography.configure(),
        Color,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
        TextStyle,
        Placeholder,
        ListItem,
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