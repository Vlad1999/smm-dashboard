import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { signOut } from '@firebase/auth';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import Avatar from 'react-avatar';
import { doc, getDoc } from '@firebase/firestore';
import { useLocale } from 'use-intl';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'next/navigation';
import SelectInput from '@/components/selectInput/SelectInput';
import useClickOutside from '@/hooks/useClickOutside';
import { auth, db } from '@/firebase/config';
import styles from './Navbar.module.css';

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const locale = useLocale();

  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, () => setIsPopupShown(false));

  const getUser = async () => {
    try {
      const uid = user?.uid;

      if (uid) {
        const userDoc = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setBase64Image(data.profilePic || null);
        } else {
          console.error('User not found in Firestore');
        }
      }
    } catch (err: any) {
      console.error(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, [user]);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace({ pathname }, { locale: nextLocale });
  };

  return (
    <header className={styles.navbar}>
      {/*<div className={styles['navbar-left']}>*/}
      {/*  <p>{pathname.replace('/', '')}</p>*/}
      {/*</div>*/}
      <SelectInput
        options={['en', 'hy']}
        value={locale}
        onChange={(value) => handleLocaleChange(value)}
      />
      <div className={styles['navbar-right']} ref={popupRef}>
        {isLoading ? (
          <Skeleton borderRadius="50%" height={40} width={40} />
        ) : base64Image ? (
          <Image
            alt="Profile picture"
            className={styles.avatar}
            height={40}
            src={base64Image}
            width={40}
            onClick={() => setIsPopupShown(!isPopupShown)}
          />
        ) : (
          <Avatar
            className={styles.avatar}
            color="#ABB1BB"
            name={`${firstName} ${lastName}`}
            round="50%"
            size="40px"
            onClick={() => setIsPopupShown(!isPopupShown)}
          />
        )}
        {isPopupShown && (
          <div className={styles['actions-popup']}>
            <button
              className={styles.button}
              onClick={() => {
                setIsPopupShown(false);
                router.push('/profile');
              }}
            >
              Profile
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setIsPopupShown(false);
                signOut(auth);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
