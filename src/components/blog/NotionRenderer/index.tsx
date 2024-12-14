'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './NotionRenderer.module.css';
import { CopyButton } from '../CopyButton';
import { useImageSize } from '@/hooks/useImageSize';
import { ImageZoom } from '../ImageZoom';
import { NotionColor } from '@/lib/notion/colors';
import { NOTION_COLORS } from '@/lib/notion/colors';

interface NotionRendererProps {
  notionData: {
    page: any;
    blocks: any[];
  };
}

export const NotionRenderer = ({ notionData }: NotionRendererProps) => {
  console.log('Datos completos:', {
    page: notionData.page,
    pageTitle: notionData.page?.properties?.title?.title?.[0]?.plain_text,
    blocksLength: notionData.blocks?.length
  });

  const blocks = Array.isArray(notionData.blocks) ? notionData.blocks : [];
  const pageTitle = notionData.page?.properties?.title?.title?.[0]?.plain_text;

  const renderRichText = (richText: any[]) => {
    if (!richText || !Array.isArray(richText)) return null;
    
    return richText.map((text: any, index: number) => {
      const color = text?.annotations?.color as NotionColor;
      const textColor = NOTION_COLORS[color] || NOTION_COLORS.default;
      
      return (
        <span 
          key={index}
          className={`
            ${text?.annotations?.bold ? styles.bold : ''}
            ${text?.annotations?.italic ? styles.italic : ''}
            ${text?.annotations?.code ? styles.inlineCode : ''}
            ${text?.annotations?.strikethrough ? styles.strikethrough : ''}
            ${text?.annotations?.underline ? styles.underline : ''}
          `}
          style={{
            color: color && color !== 'default' ? textColor : undefined,
            backgroundColor: color?.includes('background') ? textColor : undefined,
          }}
        >
          {text?.href ? (
            <a href={text.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {text?.plain_text || ''}
            </a>
          ) : (
            text?.plain_text || ''
          )}
        </span>
      );
    });
  };

  const renderBlock = (block: any) => {
    if (!block?.type) return null;

    const renderChildren = (blockChildren: any[]) => {
      if (!Array.isArray(blockChildren)) return null;
      return blockChildren.map((child: any) => (
        <div key={child.id} className={styles.block}>
          {renderBlock(child)}
        </div>
      ));
    };

    switch (block.type) {
      case 'paragraph':
        return (
          <p className={styles.paragraph}>
            {renderRichText(block?.paragraph?.rich_text)}
          </p>
        );

      case 'heading_1':
        return (
          <div className={styles.headingWrapper}>
            <h1 id={`heading-${block.id}`} className={styles.heading1}>
              {renderRichText(block?.heading_1?.rich_text)}
            </h1>
            <div className={styles.headingAnchor}>
              <a href={`#heading-${block.id}`}>#</a>
            </div>
          </div>
        );

      case 'heading_2':
        return (
          <div className={styles.headingWrapper}>
            <h2 id={`heading-${block.id}`} className={styles.heading2}>
              {renderRichText(block?.heading_2?.rich_text)}
            </h2>
            <div className={styles.headingAnchor}>
              <a href={`#heading-${block.id}`}>#</a>
            </div>
          </div>
        );

      case 'heading_3':
        return (
          <div className={styles.headingWrapper}>
            <h3 id={`heading-${block.id}`} className={styles.heading3}>
              {renderRichText(block?.heading_3?.rich_text)}
            </h3>
            <div className={styles.headingAnchor}>
              <a href={`#heading-${block.id}`}>#</a>
            </div>
          </div>
        );

      case 'numbered_list_item':
        return (
          <li className={styles.numberedItem}>
            {renderRichText(block.numbered_list_item.rich_text)}
            {block.has_children && (
              <ol className={styles.nestedList}>
                {renderChildren(block.children)}
              </ol>
            )}
          </li>
        );

      case 'bulleted_list_item':
        return (
          <li className={styles.bulletItem}>
            {renderRichText(block.bulleted_list_item.rich_text)}
            {block.has_children && (
              <ul className={styles.nestedList}>
                {renderChildren(block.children)}
              </ul>
            )}
          </li>
        );

      case 'toggle':
        return (
          <details className={styles.toggle} open={true} name='toggle'>
            <summary className={styles.toggleSummary}>
              {renderRichText(block.toggle.rich_text)}
            </summary>
            <div className={styles.toggleContent}>
              {block.has_children && renderChildren(block.children)}
            </div>
          </details>
        );

      case 'code':
        const codeContent = block?.code?.rich_text?.[0]?.plain_text || '';
        return (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLanguage}>
                {block?.code?.language || 'text'}
              </span>
              <CopyButton text={codeContent} />
            </div>
            <SyntaxHighlighter 
              language={block?.code?.language || 'text'}
              style={vscDarkPlus}
              showLineNumbers
              className={styles.codeContent}
              customStyle={{
                margin: 0,
                borderRadius: '0 0 8px 8px',
              }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        );

      case 'image':
        const imageUrl = block?.image?.type === 'file' 
          ? block?.image?.file?.url 
          : block?.image?.external?.url;
          
        const caption = block?.image?.caption?.[0]?.plain_text || '';
        
        if (!imageUrl) return null;

        return (
          <ImageZoom
            key={block.id}
            src={imageUrl}
            alt={caption || 'Article image'}
            caption={caption}
          />
        );

      case 'video':
        const videoUrl = block?.video?.type === 'file' 
          ? block?.video?.file?.url 
          : block?.video?.external?.url;
          
        const getYouTubeEmbedUrl = (url: string) => {
          try {
            if (!url) return '';
            
            let videoId = '';
            
            if (url.includes('youtu.be/')) {
              videoId = url.split('youtu.be/')[1];
            } else if (url.includes('youtube.com/watch')) {
              const urlParams = new URLSearchParams(new URL(url).search);
              videoId = urlParams.get('v') || '';
            }
            
            videoId = videoId.split('&')[0];
            
            if (!videoId) return '';
            
            return `https://www.youtube-nocookie.com/embed/${videoId}`;
          } catch (error) {
            console.error('Error parsing YouTube URL:', error);
            return '';
          }
        };

        if (videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be')) {
          const embedUrl = getYouTubeEmbedUrl(videoUrl);
          if (!embedUrl) return null;

          return (
            <div className={styles.videoContainer}>
              <div className={styles.videoEmbed}>
                <iframe
                  src={`${embedUrl}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          );
        }
            
        if (videoUrl) {
          return (
            <div className={styles.videoContainer}>
              <video 
                controls
                className={styles.video}
                src={videoUrl}
                preload="metadata"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          );
        }

        return null;

      case 'column_list':
        return (
          <div className={styles.columnList}>
            {block.children && Array.isArray(block.children) && 
              block.children.map((column: any) => (
                <div key={column.id || Math.random()} className={styles.column}>
                  {column.children && Array.isArray(column.children) &&
                    column.children.map((child: any) => renderBlock(child))}
                </div>
              ))}
          </div>
        );

      case 'column':
        return (
          <div className={styles.columnContent}>
            {block.children && Array.isArray(block.children) &&
              block.children.map((child: any) => renderBlock(child))}
          </div>
        );

      case 'divider':
        return <hr className={styles.divider} />;

      case 'quote':
        return (
          <blockquote className={styles.quote}>
            {renderRichText(block?.quote?.rich_text)}
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.notionContent}>
      {pageTitle && (
        <h1 className={styles.pageTitle}>
          {pageTitle}
        </h1>
      )}
      {blocks && blocks.length > 0 && blocks.map((block: any) => (
        <div key={block?.id || Math.random()} className={styles.block}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}; 