'use client';

import withAuth from '@/lib/withAuth';
import styles from './page.module.css';

function CalendarPage() {
  return <main className={styles.container}>Calendar</main>;
}

export default withAuth(CalendarPage);
