'use client'
import styles from './layout.module.css'
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import withAuth from "@/lib/withAuth";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/config";

function AuthLayout({
       children,
   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [user] = useAuthState(auth);

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles["main-content"]}>
                <Navbar user={user} />
                <main>{children}</main>
            </div>
        </div>
    );
}

export default withAuth(AuthLayout);
