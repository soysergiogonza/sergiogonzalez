import { useCallback } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { debounce } from '@/utils/debounce';
import styles from './EditableTitle.module.css';

interface EditableTitleProps {
  postId: string;
}

export const EditableTitle = ({ postId }: EditableTitleProps) => {
  const { currentPost, isSaving, updatePostTitle, syncTitleToServer } = useDashboardStore();

  // Extraer el UUID del postId
  const matches = postId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
  const uuid = matches ? matches[0] : null;

  const debouncedSync = useCallback(
    debounce((id: string, title: string) => {
      syncTitleToServer(id, title);
    }, 1000),
    []
  );

  const handleTitleChange = (newTitle: string) => {
    if (!currentPost || !uuid) return;
    updatePostTitle(uuid, newTitle);
    debouncedSync(uuid, newTitle);
  };

  if (!currentPost) return null;

  return (
    <div className={styles.titleContainer}>
      <input
        type="text"
        value={currentPost.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className={styles.titleInput}
        placeholder="Título sin nombre"
      />
      {isSaving && (
        <div className={styles.savingIndicator}>
          Guardando...
        </div>
      )}
    </div>
  );
}; 