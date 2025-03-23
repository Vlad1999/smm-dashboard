'use client'

import styles from './page.module.css';
import withAuth from "@/lib/withAuth";

function CalculatorPage() {
    return (
        <main className={styles.container}>
            Calculator
        </main>
    );
}

export default withAuth(CalculatorPage);
