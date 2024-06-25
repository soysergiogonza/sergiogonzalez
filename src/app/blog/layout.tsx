import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Sergio González Sánchez',
 description: 'Frontend Developer',
 icons: {
  icon: 'assets/icons/favicon.svg',
 },
};

const LayoutArticleList = async ({ children }) => {
 return <div>{children}</div>;
};

export default LayoutArticleList;
