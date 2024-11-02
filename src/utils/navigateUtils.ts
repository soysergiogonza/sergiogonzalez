import { NavigateUtils } from "@/types/navigation";
import { getAllArticles, getArticleBySlug } from "@/utils";

export const navigateUtils = async (slug: string) => {
  const articles = await getAllArticles();
  const { frontMatter, content } = await getArticleBySlug(slug);

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

  return <NavigateUtils>{
    articlesInCategory,
    previousArticle,
    nextArticle,
  };
};
