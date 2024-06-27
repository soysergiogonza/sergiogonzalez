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
 tags: string[];
}

export interface MatterFile {
 slug: string;
 frontMatter: FrontMatter;
 content?: string;
 shortDescription: string;
 date: string;
}

// Convine FrontMatter and MatterFile interfaces into one
export interface Article extends MatterFile {
 date: string;
}
