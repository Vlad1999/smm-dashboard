'use client'

import styles from './page.module.css';
import withAuth from "@/lib/withAuth";

function CalendarPage() {
    return (
        <main className={styles.container}>
            Calendar
        </main>
    );
}

export default withAuth(CalendarPage);
