'use client';
import { BlogCard } from '@/components';
import styles from './Blog.module.css';

const Blog = () => {
 return (
  <div className={styles.ContainerBlog}>
   <BlogCard />
  </div>
 );
};

export default Blog;
