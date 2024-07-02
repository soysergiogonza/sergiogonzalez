export interface Page {
 name: string;
 url: string;
}

export interface Projects {
 name: string;
 image: string;
 description: string;
 urlGitHub: string;
 urlPreview: string;
 stack: string[];
}

export interface FrontMatter {
 title: string;
 date: string;
 description: string;
 tags: string[];
}

export interface MatterFile {
 slug: string;
 frontMatter: FrontMatter;
 content?: string;
 date: string;
}

export interface Article extends MatterFile {
 date: string;
}
