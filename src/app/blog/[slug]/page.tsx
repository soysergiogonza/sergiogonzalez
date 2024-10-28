import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import styles from '../Blog.module.css';
import { ArticleBlogParams } from '@/types/blog';
import { getAllArticles, getArticleBySlug } from '@/utils/blogUtils';
import { formatDate } from '@/utils/dateUtils';

const ArticlePage = async ({ params }: ArticleBlogParams) => {
  const { slug } = params;
  const { frontMatter, content } = await getArticleBySlug(slug);

  const articles = await getAllArticles();
  const articlesInCategory = articles.filter(
    ({ frontMatter: fm }) => fm.category === frontMatter.category,
  );

  const currentIndex = articlesInCategory.findIndex(
    ({ slug: articleSlug }) => articleSlug === slug,
  );

  const previousArticle =
    currentIndex > 0 ? articlesInCategory[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articlesInCategory.length - 1
      ? articlesInCategory[currentIndex + 1]
      : null;

  const formattedDate = formatDate(frontMatter.date);

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
      <picture className={styles.picture}>
        <Image
          src={frontMatter.banner}
          alt={frontMatter.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={500}
          height={500}
          priority
        />
      </picture>
      <MDXRemote
        source={content}
        components={{
          img: ({ src, alt, ...props }: { src?: string; alt?: string }) => {
            if (!src) return null;
            return (
              <Image
                src={src}
                alt={alt || 'Imagen'}
                width={500}
                height={300}
                className={styles.mdxImage}
                {...props}
              />
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
