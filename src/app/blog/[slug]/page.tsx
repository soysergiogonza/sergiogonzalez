import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import styles from "../Blog.module.css";
import "./Rehype.css";
import { ArticleBlogParams } from "@/types/blog";
import { getArticleBySlug, formatDate, navigateUtils } from "@/utils";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "@shikijs/transformers";
import { PrettyCodeWrapper } from "@/components/blog/PrettyCodeWrapper";
import { Icon } from "@/components/blog/Icon";

const ArticlePage = async ({ params }: ArticleBlogParams) => {
  const { slug } = params;

  const { previousArticle, nextArticle } = await navigateUtils(slug);
  const { frontMatter, content } = await getArticleBySlug(slug);
  const formattedDate = formatDate(frontMatter.date);

  const prettyCodeOptions = {
    theme: "monokai",
    keepBackground: true,
    grid: true,
    tokensMap: {
      fn: "entity.name.function",
    },
    transformers: [transformerNotationDiff()],
  };

  return (
    <article className={styles.article}>
      <p
        className={styles.category}
        style={{
          color: frontMatter?.colors?.[0],
        }}
      >
        {frontMatter?.tags?.map((tag: string) => (
          <span
            key={tag}
            className={styles.tag}
            style={{
              backgroundColor: frontMatter?.colors?.[1],
            }}
          >
            {tag}
          </span>
        ))}
      </p>
      <div className={styles.articleHead}>
        <time dateTime={formattedDate} className={styles.date}>
          {formattedDate}
        </time>
        <h1 className={styles.title}>{frontMatter.title}</h1>
      </div>
        {
            frontMatter.notion && (
                <Link href={frontMatter?.notion} target="_blank" className={styles.notion}>
                    <Icon
                        icon='/assets/icons/notion.svg'
                        size='1.2rem'
                        className='icon'
                    />
                    <span>Notion</span>
                </Link>
            )

        }
        {frontMatter?.description && (
            <p
                className={styles.description}
                style={{
            borderColor: frontMatter?.colors?.[1],
              backgroundColor:frontMatter?.colors?.[2]
          }}
        >
          {frontMatter.description}
        </p>
      )}
      {frontMatter.banner && (
        <picture className={styles.picture}>
          <Image
            src={frontMatter.banner}
            alt={frontMatter.title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            width={500}
            height={500}
            priority
          />
        </picture>
      )}
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={{
          img: ({ src, alt, ...props }: { src?: string; alt?: string }) => {
            if (!src) return null;
            return (
              <Image
                src={src}
                alt={alt || "Imagen"}
                width={500}
                height={300}
                className={styles.mdxImage}
                {...props}
              />
            );
          },
          pre: ({ children, ...props }) => (
            <PrettyCodeWrapper>
              <pre {...props}>{children}</pre>
            </PrettyCodeWrapper>
          ),
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code
                className='rounded bg-muted px-1.5 py-0.5 font-mono font-semibold'
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      />
      <div className={styles.articlesDirections}>
        {previousArticle && (
          <Link
            href={`/blog/${previousArticle.slug}`}
            className={styles.directionLink}
          >
            <FaLongArrowAltLeft />
            <span>Anterior artículo</span>
          </Link>
        )}
        {nextArticle && (
          <Link
            href={`/blog/${nextArticle.slug}`}
            className={styles.directionLink}
          >
            <span>Siguiente artículo</span>
            <FaLongArrowAltRight />
          </Link>
        )}
      </div>
    </article>
  );
};

export default ArticlePage;
