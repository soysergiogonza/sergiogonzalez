import styles from "./Dashboard.module.css";
import { Aside } from "@/components/dashboard";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Panel de administración",
};

const DashboardLayout = ({
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

export default DashboardLayout; 