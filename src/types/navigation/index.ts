import type { CSSProperties } from "react";

export interface NavItemProps {
	name: string;
	url: string;
	style?: CSSProperties;
}

export interface NavigateUtils {
	articlesInCategory: any;
	previousArticle: any;
	nextArticle: any;
}
