import fs from 'fs/promises';  // Cambiamos a la versión de promesas
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Cambiamos a la versión RSC
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import styles from '../Blog.module.css';

interface Params {
    params: {
        slug: string;
    };
}

const ArticlePage = async ({ params }: Params) => {
    const { slug } = params;
    const filePath: string = path.join(
        process.cwd(),
        'src/data/blog/',
        `${slug}.mdx`,
    );

    try {
        const markdownWithMeta = await fs.readFile(filePath, 'utf-8');
        const { data: frontMatter, content } = matter(markdownWithMeta);

        const date: string = new Date(frontMatter.date)
            .toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            .toUpperCase();

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
                    <time dateTime={date} className={styles.date}>
                        {date}
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
      if (!src) return null; // O maneja el caso cuando no hay src

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
    }
  }}
/>
                <div className={styles.articlesDirections}>
                    <div className={styles.previousLinkContainer}>
                        {frontMatter.anterior && (
                            <Link href={frontMatter.anterior} className={styles.directionLink}>
                                <FaLongArrowAltLeft />
                                <span>Anterior artículo</span>
                            </Link>
                        )}
                    </div>
                    <div className={styles.nextLinkContainer}>
                        {frontMatter.siguiente && (
                            <Link href={frontMatter.siguiente} className={styles.directionLink}>
                                <span>Siguiente artículo</span>
                                <FaLongArrowAltRight />
                            </Link>
                        )}
                    </div>
                </div>
            </article>
        );
    } catch (error) {
        console.error("Error loading article:", error);
        notFound();
    }
};

export default ArticlePage;

export const generateStaticParams = async () => {
    try {
        const files = await fs.readdir(path.join(process.cwd(), 'src/data/blog/'));
        return files
            .filter(filename => filename.endsWith('.mdx'))
            .map((filename) => ({
                slug: filename.replace('.mdx', ''),
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
};

// Opcional: Agregar generateMetadata para SEO
export async function generateMetadata({ params }: Params) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'src/data/blog/', `${slug}.mdx`);

    try {
        const markdownWithMeta = await fs.readFile(filePath, 'utf-8');
        const { data: frontMatter } = matter(markdownWithMeta);

        return {
            title: frontMatter.title,
            description: frontMatter.excerpt || '',
            openGraph: {
                title: frontMatter.title,
                description: frontMatter.excerpt || '',
                images: [frontMatter.banner],
            },
        };
    } catch {
        return {
            title: 'Artículo no encontrado',
            description: 'El artículo que buscas no existe',
        };
    }
}
