'use client';

import withAuth from '@/lib/withAuth';
import styles from './page.module.css';

function Home() {
  return <div className={styles.page}></div>;
}

export default withAuth(Home);
