import Link from 'next/link';
import styles from './Sidebar.module.css';
const Sidebar = () => (
  <nav className={styles.sidebar}>
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
