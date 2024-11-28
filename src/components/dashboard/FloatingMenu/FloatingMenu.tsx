import { BubbleMenu, Editor } from '@tiptap/react';
import { Bold, Italic, Code, Link, List, ListOrdered, Type, Palette } from 'lucide-react';
import styles from './FloatingMenu.module.css';

interface FloatingMenuProps {
  editor: Editor;
}

export const FloatingMenu = ({ editor }: FloatingMenuProps) => {
  const colors = ['#f67373', '#4ade80', '#60a5fa', '#c084fc', '#ffffff'];

  return (
    <BubbleMenu 
      className={styles.bubbleMenu} 
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${styles.menuItem} ${editor.isActive('bold') ? styles.isActive : ''}`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${styles.menuItem} ${editor.isActive('italic') ? styles.isActive : ''}`}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${styles.menuItem} ${editor.isActive('code') ? styles.isActive : ''}`}
      >
        <Code size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${styles.menuItem} ${editor.isActive('bulletList') ? styles.isActive : ''}`}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${styles.menuItem} ${editor.isActive('orderedList') ? styles.isActive : ''}`}
      >
        <ListOrdered size={16} />
      </button>
      <div className={styles.divider} />
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${styles.menuItem} ${editor.isActive('codeBlock') ? styles.isActive : ''}`}
      >
        <Code size={16} />
      </button>
      <div className={styles.colorPicker}>
        <button className={styles.menuItem}>
          <Palette size={16} />
        </button>
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => editor.chain().focus().setColor(color).run()}
              className={styles.colorButton}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </BubbleMenu>
  );
}; 