import { BlogCard } from '@/components';
import type { MatterFile } from '@/types';
import { getArticles } from '@/utils/getArticles';

const BlogPage = async () => {
 const articles: MatterFile[] = await getArticles();

 return (
  <>
   {articles?.map(
    ({ slug, frontMatter, shortDescription, date }: MatterFile) => {
     return (
      <BlogCard
       frontMatter={frontMatter}
       date={date}
       slug={slug}
       shortDescription={shortDescription}
       key={slug}
      />
     );
    },
   )}
  </>
 );
};

export default BlogPage;
