import styles from "./Blog.module.css";
import { Aside } from "@/components/blog";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Blog",
	description: "Frontend Developer",
	icons: {
		icon: "assets/icons/favicon.svg",
	},
};

const LayoutBlog = async ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.layout}>
					<Aside />
					<main className={styles.main}>{children}</main>
				</div>
			</div>
		</div>
	);
};

export default LayoutBlog;
