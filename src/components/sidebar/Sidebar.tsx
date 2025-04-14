import { Link } from '@/i18n/navigation';

import styles from './Sidebar.module.css';
const Sidebar = () => (
  <nav className={styles.sidebar}>
    <h1 className={styles.logo}>Optify</h1>
    <ul>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/calculator">Calculator</Link>
      </li>
      <li>
        <Link href="/calendar">Calendar</Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
