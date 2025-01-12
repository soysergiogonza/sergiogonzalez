export const BlogPage: React.FC = () => {
  const { articles, isLoading, error } = useArticles();
  const { categories } = useCategories();

  return (
    <div>
      <h1>Blog</h1>
      <CategorySelector categories={categories} />
      <ArticleList 
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}; 