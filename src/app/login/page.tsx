'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '@/firebase/config';
import styles from './page.module.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/profile');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      router.push('/profile');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
          <p className={styles.linkContainer}>
            Don&apos;t have an account?{' '}
            <Link className={styles.link} href="/sign-up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
