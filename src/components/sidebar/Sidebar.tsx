import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import styles from './Sidebar.module.css';
const Sidebar = () => {
  const t = useTranslations('Sidebar');

  return (
    <nav className={styles.sidebar}>
      <h1 className={styles.logo}>Optify</h1>
      <ul>
        <li>
          <Link href="/dashboard">{t('dashboard')}</Link>
        </li>
        <li>
          <Link href="/calculator">{t('calculator')}</Link>
        </li>
        <li>
          <Link href="/calendar">{t('calendar')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
