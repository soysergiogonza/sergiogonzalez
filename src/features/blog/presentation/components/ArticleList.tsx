interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  error
}) => {
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4">
      {articles.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  );
}; 