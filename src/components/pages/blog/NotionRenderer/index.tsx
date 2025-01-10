"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./NotionRenderer.module.css";
import { CopyButton } from "../CopyButton";
import { useImageSize } from "@/hooks/useImageSize";
import { ImageZoom } from "../ImageZoom";
import { NotionColor, NOTION_COLORS } from "@/lib/notion/colors";
import type { NotionData, NotionBlock } from "@/features/blog/types";
import type { TitlePropertyValue } from "@notionhq/client/build/src/api-endpoints";

interface RichTextItem {
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    color?: NotionColor;
  };
  href?: string;
  plain_text?: string;
}

export const NotionRenderer = ({ notionData }: { notionData: NotionData }) => {
  const blocks = Array.isArray(notionData.blocks) ? notionData.blocks : [];
  const titleProperty = notionData.page?.properties?.title as TitlePropertyValue;
  const pageTitle = titleProperty?.title?.[0]?.plain_text;

  const renderRichText = (richText: RichTextItem[]) => {
    if (!richText || !Array.isArray(richText)) return null;

    return richText.map((text, index) => {
      const color = text?.annotations?.color as NotionColor;
      const textColor = NOTION_COLORS[color] || NOTION_COLORS.default;

      return (
        <span
          key={`${text?.plain_text}-${index}`}
          className={`
            ${text?.annotations?.bold ? "font-bold" : ""}
            ${text?.annotations?.italic ? "italic" : ""}
            ${text?.annotations?.code ? "bg-code-inline-bg text-code-inline-color px-2 py-0.5 rounded font-mono text-sm" : ""}
            ${text?.annotations?.strikethrough ? "line-through" : ""}
            ${text?.annotations?.underline ? "underline" : ""}
          `}
          style={{
            color: color && color !== "default" ? textColor : undefined,
            backgroundColor: color?.includes("background") ? textColor : undefined,
          }}
        >
          {text?.href ? (
            <a
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-transparent hover:border-primary transition-colors"
            >
              {text?.plain_text || ""}
            </a>
          ) : (
            text?.plain_text || ""
          )}
        </span>
      );
    });
  };

  const renderChildren = (block: NotionBlock) => {
    if (!block.children || !Array.isArray(block.children)) return null;

    return block.children.map((child) => (
      <div key={child.id || `child-${Math.random()}`} className={styles.block}>
        {renderBlock(child)}
      </div>
    ));
  };

  const renderBlock = (block: NotionBlock) => {
    if (!block || !block.id) return null;

    switch (block.type) {
      case "paragraph":
        return (
          <p className={styles.paragraph}>
            {renderRichText(block?.paragraph?.rich_text)}
          </p>
        );

      case "heading_1":
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

      case "heading_2":
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

      case "heading_3":
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

      case "numbered_list_item":
        return (
          <li className={styles.numberedItem}>
            {renderRichText(block.numbered_list_item.rich_text)}
            {block.has_children && (
              <ol className={styles.nestedList}>
                {renderChildren(block)}
              </ol>
            )}
          </li>
        );

      case "bulleted_list_item":
        return (
          <li className={styles.bulletItem}>
            {renderRichText(block.bulleted_list_item.rich_text)}
            {block.has_children && (
              <ul className={styles.nestedList}>
                {renderChildren(block)}
              </ul>
            )}
          </li>
        );

      case "toggle":
        return (
          <details className={styles.toggle} open={true} name='toggle'>
            <summary className={styles.toggleSummary}>
              {renderRichText(block.toggle.rich_text)}
            </summary>
            <div className={styles.toggleContent}>
              {block.has_children && renderChildren(block)}
            </div>
          </details>
        );

      case "code":
        const codeContent = block?.code?.rich_text?.[0]?.plain_text || "";
        return (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLanguage}>
                {block?.code?.language || "text"}
              </span>
              <CopyButton text={codeContent} />
            </div>
            <SyntaxHighlighter
              language={block?.code?.language || "text"}
              style={vscDarkPlus}
              showLineNumbers
              className={styles.codeContent}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 8px 8px",
              }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        );

      case "image":
        const imageUrl =
          block?.image?.type === "file"
            ? block?.image?.file?.url
            : block?.image?.external?.url;

        const caption = block?.image?.caption?.[0]?.plain_text || "";

        if (!imageUrl) return null;

        return (
          <ImageZoom
            key={block.id}
            src={imageUrl}
            alt={caption || "Article image"}
            caption={caption}
          />
        );

      case "video":
        const videoUrl =
          block?.video?.type === "file"
            ? block?.video?.file?.url
            : block?.video?.external?.url;

        const getYouTubeEmbedUrl = (url: string) => {
          try {
            if (!url) return "";

            let videoId = "";

            if (url.includes("youtu.be/")) {
              videoId = url.split("youtu.be/")[1];
            } else if (url.includes("youtube.com/watch")) {
              const urlParams = new URLSearchParams(new URL(url).search);
              videoId = urlParams.get("v") || "";
            }

            videoId = videoId.split("&")[0];

            if (!videoId) return "";

            return `https://www.youtube-nocookie.com/embed/${videoId}`;
          } catch (error) {
            console.error("Error parsing YouTube URL:", error);
            return "";
          }
        };

        if (
          videoUrl?.includes("youtube.com") ||
          videoUrl?.includes("youtu.be")
        ) {
          const embedUrl = getYouTubeEmbedUrl(videoUrl);
          if (!embedUrl) return null;

          return (
            <div className={styles.videoContainer}>
              <div className={styles.videoEmbed}>
                <iframe
                  src={`${embedUrl}?rel=0&modestbranding=1`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer'
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
                preload='metadata'
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          );
        }

        return null;

      case "column_list":
        return (
          <div key={block.id} className={styles.columnList}>
            {block.children &&
              Array.isArray(block.children) &&
              block.children.map((column) => (
                <div 
                  key={column.id || `column-${Math.random()}`} 
                  className={styles.column}
                >
                  {column.children &&
                    Array.isArray(column.children) &&
                    column.children.map((child) => (
                      <div 
                        key={child.id || `column-child-${Math.random()}`}
                        className={styles.columnChild}
                      >
                        {renderBlock(child)}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        );

      case "column":
        return (
          <div className={styles.columnContent}>
            {block.children &&
              Array.isArray(block.children) &&
              block.children.map((child) => (
                <div 
                  key={child.id || `column-content-${Math.random()}`}
                  className={styles.columnContentItem}
                >
                  {renderBlock(child)}
                </div>
              ))}
          </div>
        );

      case "divider":
        return <hr className={styles.divider} />;

      case "quote":
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
      {pageTitle && <h1 className={styles.pageTitle}>{pageTitle}</h1>}
      {blocks.map((block) => (
        <div key={block.id || `block-${Math.random()}`} className={styles.block}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
};
