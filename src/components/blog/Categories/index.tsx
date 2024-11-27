"use client";

import styles from "./Categories.module.css";
import Link from "next/link";
import { Icon } from "../Icon";
import { useEffect } from "react";
import { useBlogStore } from "@/store";
import { articlesService } from "@/services/articles/articles.services";

export const Categories = () => {
  const { posts, setPosts } = useBlogStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await articlesService.getAll();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  );

  return (
    <section className={styles.routes}>
      {categories.map((category, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index}>
          <details name='category' className={styles.details}>
            <summary className={styles.summary}>
              <h4 className={styles.categoryTitle}>{category}</h4>
            </summary>
            <div className={styles.articleList}>
              {posts
                .filter((post) => post.category === category)
                .sort((a, b) => (a.position || 0) - (b.position || 0))
                .map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className={styles.articleTitle}
                  >
                    <Icon
                      icon={post.icon}
                      size='1.2rem'
                      className='icon'
                    />
                    <span>{post.title}</span>
                  </Link>
                ))}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
};
