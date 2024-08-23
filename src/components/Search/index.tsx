'use client';

import { SearchBox } from '@orama/searchbox';
import { useState } from 'react';
import '@orama/searchbox/dist/index.css';

const oramaConfig = {
 theme: 'secondary',
 resultsMap: {
  path: 'url',
  title: 'title',
  description: 'description',
 },
 colorScheme: 'system',
 themeConfig: {},
};

export const Search = () => {
 const [show] = useState(true);

 const extraConfig = {
  show,
  summaryGeneration: true,
 };

 return (
  <>
   <SearchBox
    cloudConfig={{
     url: 'https://cloud.orama.run/v1/indexes/videogames-gopcp5',
     key: 'uexDrCao9JV50ZjpnqpPazHqLPn17mLM',
    }}
    {...oramaConfig}
    {...extraConfig}
   />
  </>
 );
};
