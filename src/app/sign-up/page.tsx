'use client'

import React, { useState, FormEvent, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from '@/firebase/config'
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {doc, serverTimestamp, setDoc} from "@firebase/firestore";
import Link from "next/link";

const SignUp: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

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

    const addUser = async (uid: string, email: string) => {
        try {
            const userDoc = doc(db, 'users', uid);
            await setDoc(userDoc, {
                uid,
                email,
                displayName: "",
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error adding user to Firestore: ", error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            if (userCredential?.user) {
                await addUser(userCredential.user.uid, userCredential.user.email!);
            }
            setEmail('');
            setPassword('');
            router.push('/profile');
        } catch (error) {
            console.error("Error signing up: ", error);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign Up</h2>
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
                <button type="submit" className={styles.button}>Sign Up</button>
                <p className={styles.linkContainer}>
                    Have an account? <Link href='/login' className={styles.link}>Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
