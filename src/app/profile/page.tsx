'use client'

import styles from './page.module.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "@/firebase/config";
import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {signOut} from "@firebase/auth";
import withAuth from "@/lib/withAuth";
import Image from "next/image";

function ProfilePage() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ displayName: '', email: '' });

    useEffect(() => {
        (async () => {
            try {
                const uid = user?.uid;

                if (uid) {
                    const userDoc = doc(db, 'users', uid);

                    const userSnapshot = await getDoc(userDoc);

                    if (userSnapshot.exists()) {
                        const data = userSnapshot.data();
                        setUserData(data);
                        setFormData({ displayName: data.displayName || '', email: data.email || '' });
                    } else {
                        console.error('User not found in Firestore');
                    }
                }
            } catch (err: any) {
                console.error(err.message || 'An error occurred');
            }
        })()

    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const uid = user?.uid;

            if (uid) {
                const userDoc = doc(db, 'users', uid);
                await updateDoc(userDoc, formData);
                setUserData((prev) => ({ ...prev, ...formData }));
                setIsEditing(false);
            }
        } catch (err: any) {
            console.error(err.message || 'Failed to update profile');
        }
    };

    return (
        <div className={styles.profilePage}>
            <h1 className={styles.title}>User Profile</h1>
            <div className={styles.profileCard}>
                <Image
                    width={150}
                    height={120}
                    className={styles.profileImage}
                    src="/myprofilepic.png"
                    alt="Profile Picture"
                />
                <div className={styles.profileDetails}>
                    {!isEditing ? (
                        <>
                            <h2 className={styles.name}>{userData?.displayName}</h2>
                            <p className={styles.email}>{userData?.email}</p>
                            <div className={styles.buttons}>
                                <button className={styles.primaryButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
                                <button className={styles.secondaryButton} onClick={() => signOut(auth)}>Log Out</button>
                            </div>
                        </>
                    ) : (
                        <form className={styles.editForm} onSubmit={handleSubmit}>
                            <div className={styles.inputs}>
                                <div className={styles.formInputContainer}>
                                    <label htmlFor="displayName">Full Name</label>
                                    <input
                                        className={styles.formInput}
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                        placeholder="Display Name"
                                    />
                                </div>
                                <div className={styles.formInputContainer}>
                                    <label htmlFor="text">Username</label>
                                    <input
                                        className={styles.formInput}
                                        type="text"
                                        name="username"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Username"
                                    />
                                </div>
                                <div className={styles.formInputContainer}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className={styles.formInput}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className={styles.formInputContainer}>
                                    <label htmlFor="text">Adress</label>
                                    <input
                                        className={styles.formInput}
                                        type="text"
                                        name="adress"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Address"
                                    />
                                </div>
                                <div className={styles.formInputContainer}>
                                    <label htmlFor="text">Telephone number</label>
                                    <input
                                        className={styles.formInput}
                                        type="text"
                                        name="telephone number"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Telephone number"
                                        
                                    />
                                    
                                <div className={styles.buttons}>
                                <button className={styles.primaryButton} type="submit">Upload Photo</button>
                                <button
                                    className={styles.secondaryButton}
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                >
                                   Delete
                                </button>

                            </div>
                                </div>
                                <div className={styles.buttons}>
                                <button className={styles.primaryButton} type="submit">Save</button>
                                <button
                                    className={styles.secondaryButton}
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                                </div>
                        </form>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default withAuth(ProfilePage);
