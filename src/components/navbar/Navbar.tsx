import React, {useEffect, useRef, useState} from 'react';
import styles from './Navbar.module.css';
import {usePathname, useRouter} from "next/navigation";
import {auth, db} from "@/firebase/config";
import {signOut} from "@firebase/auth";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Avatar from "react-avatar";
import {doc, getDoc} from "@firebase/firestore";
import useClickOutside from "@/hooks/useClickOutside";

interface NavbarProps {
    user: any;
}

const Navbar = ({ user }: NavbarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

    useClickOutside(popupRef, () => setIsPopupShown(false));

    const getUser = async () => {
        try {
            setIsLoading(true);
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

    return (
        <header className={styles.navbar}>
            <div className={styles["navbar-left"]}>
                <p>{pathname.replace('/','')}</p>
            </div>
            <div className={styles["navbar-right"]} ref={popupRef}>
                {isLoading ? (
                    <Skeleton
                        width={40}
                        height={40}
                        borderRadius='50%'
                    />
                ) : base64Image ? (
                    <Image
                        className={styles.avatar}
                        src={base64Image}
                        alt="Profile picture"
                        width={40}
                        height={40}
                        onClick={() => setIsPopupShown(!isPopupShown)}
                    />
                ) : (
                    <Avatar
                        className={styles.avatar}
                        name={`${firstName} ${lastName}`}
                        size='40px'
                        round='50%'
                        color="#ABB1BB"
                        onClick={() => setIsPopupShown(!isPopupShown)}
                    />
                )}
                {isPopupShown &&  (
                    <div className={styles["actions-popup"]}>
                        <button
                            className={styles.button}
                            onClick={() => {
                                setIsPopupShown(false)
                                router.push('/profile')
                            }}
                        >
                            Profile
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                setIsPopupShown(false)
                                signOut(auth)
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
