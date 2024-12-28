'use client'

import styles from './page.module.css';
import withAuth from "@/lib/withAuth";

 function Home() {

  return (
    <div className={styles.page}>
    </div>
  );
}

export default withAuth(Home);