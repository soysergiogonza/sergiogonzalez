import { useRouter } from 'next/navigation';
import styles from '../../Blog.module.css';

const ArticlePage = () => {
 // const router = useRouter();
 // const { slug } = router.query;

 // Aquí podrías hacer fetch de los datos del artículo usando el slug
 // o usar datos estáticos para el ejemplo.
 const article = {
  title: 'Building a SaaS product as a software developer',
  author: 'Sergio González Sánchez',
  publishedDate: '31st June, 2021',
  readingTime: '3 minutes',
  content:
   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa maiores deleniti consectetur nobis et eaque.',
 };

 return (
  <div className={styles.article}>
   <h1>{article.title}</h1>
   <p>By {article.author}</p>
   <p>Published {article.publishedDate}</p>
   <p>Reading time {article.readingTime}</p>
   <div>{article.content}</div>
  </div>
 );
};

export default ArticlePage;
