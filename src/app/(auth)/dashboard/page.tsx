'use client'

import styles from './page.module.css';
import withAuth from "@/lib/withAuth";

function DashboardPage() {
    return (
        <main className={styles.container}>
            Dashboard
        </main>
    );
}

export default withAuth(DashboardPage);
