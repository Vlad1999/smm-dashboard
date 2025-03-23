'use client'

import React, {useState, FormEvent, useEffect} from 'react';
import styles from './page.module.css';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import Link from "next/link";


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
            router.push('/profile')
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
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Login</button>
                    <p className={styles.linkContainer}>
                        Don't have an account? <Link href='/sign-up' className={styles.link}>Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
