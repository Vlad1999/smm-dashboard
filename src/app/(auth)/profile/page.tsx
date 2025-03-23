'use client'

import styles from './page.module.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "@/firebase/config";
import {useEffect, useRef, useState} from "react";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {signOut} from "@firebase/auth";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Avatar from 'react-avatar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProfilePage() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [timezone, setTimezone] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch user data from Firestore
    const getUser = async () => {
        try {
            setIsLoading(true);
            const uid = user?.uid;

            if (uid) {
                const userDoc = doc(db, 'users', uid);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const data = userSnapshot.data();
                    setUserData(data);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setUsername(data.username);
                    setPosition(data.position);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setLocation(data.location);
                    setTimezone(data.timezone);
                    setBase64Image(data.profilePic || null); // Fetch stored profile picture
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

    const handleSubmit = async () => {
        try {
            const uid = user?.uid;
            const formData = {
                firstName,
                lastName,
                username,
                position,
                email,
                phone,
                location,
                timezone,
                profilePic: base64Image,  // Save Base64 image string in Firestore
            };

            if (uid) {
                const userDoc = doc(db, 'users', uid);
                await updateDoc(userDoc, formData);
                await getUser();  // Refresh user data
                setIsEditing(false);
            }
        } catch (err: any) {
            console.error(err.message || 'Failed to update profile');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setBase64Image(reader.result as string);  // Set Base64 string
            };

            reader.readAsDataURL(file);
        }
    };

    const fullName = `${userData?.firstName || ''} ${userData?.lastName || ''}`;

    return (
        <main className={styles.container}>
            <div className={styles['user-info-block']}>
                <div className={styles['inner-container']}>
                    <div className={styles['user-info']}>
                        {isLoading ? (
                            <Skeleton  width={110} height={110} borderRadius='50%' />
                        ) : base64Image ? (
                            <Image className={styles['profile-picture']} src={base64Image} alt="Profile picture" width={110} height={110} />
                        ) : (
                            <Avatar
                                name={`${firstName} ${lastName}`}
                                size='110'
                                round='50%'
                                color="#ABB1BB"
                            />
                        )}
                        {isLoading ? (
                            <div className={styles['text-wrapper']}>
                                <Skeleton  width={300} height={28} borderRadius='8px' />
                                <Skeleton  width={300} height={28} borderRadius='8px' />
                            </div>
                            ) : (
                            <div className={styles['text-wrapper']}>
                                <p className={styles.name}>{fullName}</p>
                                <p className={styles.position}>{userData?.position || ''}</p>
                                <p className={styles.location}>{userData?.location || ''}, {userData?.timezone || ''}</p>
                            </div>
                            )
                        }
                    </div>
                    <div className={styles.buttons}>
                        <Button variant='primary' text='Upload New Photo' onClick={() => {
                            if(fileInputRef?.current !== null) {
                                fileInputRef.current.click()
                            }
                        }} />
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

                        <Button
                            variant='secondary'
                            text='Delete'
                            onClick={() => {
                                setBase64Image('')
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Form to update user details */}
            <div className={styles['form-container']}>
                <div className={styles['form-inner-wrapper']}>
                    <Input
                        label='First Name'
                        value={firstName}
                        onChange={setFirstName}
                        placeholder='eg. Vagho'
                    />
                    <Input
                        label='Last Name'
                        value={lastName}
                        onChange={setLastName}
                        placeholder='eg. Pirumyan'
                    />
                </div>
                <div className={styles['form-inner-wrapper']}>
                    <Input
                        label='Username'
                        value={username}
                        onChange={setUsername}
                        placeholder='eg. pirumyan777'
                    />
                    <Input
                        label='Position'
                        value={position}
                        onChange={setPosition}
                        placeholder='eg. Developer'
                    />
                </div>
            </div>
            <div className={styles['form-container']}>
                <div className={styles['form-inner-wrapper']}>
                    <Input
                        label='Email Address'
                        value={email}
                        onChange={setEmail}
                        leftIcon='/icons/Mail.svg'
                    />
                    <Input
                        label='Phone Number'
                        value={phone}
                        onChange={setPhone}
                        leftIcon='/icons/Phone.svg'
                    />
                </div>
            </div>
            <div className={styles['form-container']}>
                <Input
                    label='Location'
                    value={location}
                    onChange={setLocation}
                    leftIcon='/icons/location.svg'
                />
                <Input
                    label='Time Zone'
                    value={timezone}
                    onChange={setTimezone}
                    leftIcon='/icons/clock.svg'
                />
            </div>
            <div className={styles['form-container']}>
                <div className={styles['form-inner-wrapper']}>
                    <Input
                        label='Current Password'
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        leftIcon='/icons/key.svg'
                        type='password'
                    />
                    <Input
                        label='New Password'
                        value={newPassword}
                        onChange={setNewPassword}
                        leftIcon='/icons/key.svg'
                        type='password'
                    />
                </div>
                <Input
                    label='Confirm Password'
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    leftIcon='/icons/key.svg'
                    type='password'
                />
            </div>
            <div className={styles.buttons} style={{ justifyContent: 'flex-end' }}>
                <Button variant='secondary' text='Cancel' onClick={() => {}} />
                <Button variant='primary' text='Save Changes' onClick={handleSubmit} />
            </div>
        </main>
    );
}

export default withAuth(ProfilePage);
