'use client';

import withAuth from '@/lib/withAuth';
import styles from './page.module.css';

function CalculatorPage() {
  return <main className={styles.container}>Calculator</main>;
}

export default withAuth(CalculatorPage);
