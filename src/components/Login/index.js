import clsx from 'clsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase, { auth, db } from '../../firebase/config';
import users from '../../Storage'
import styles from './style.module.scss';
import { addDocument, generateWords } from '../../firebase/services'
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {

    const handleLogin = async (provider, e) => {
        e.preventDefault();
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider)
        // console.log({ data });
        if (additionalUserInfo.isNewUser) {
            addDocument('users',
                {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    // provider Id : website that we use to login like fb, google,...
                    keywords: generateWords(user.displayName)
                }
            )
        }

    }


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.appTitle}>Chat App</h2>
                <h2 className={styles.loginTitle}>Đăng nhập</h2>
                <form className={styles.loginForm}>
                    <div className={clsx(styles.btnLogin)} onClick={(e) => { handleLogin(fbProvider, e) }}>Đăng nhập bằng Facebook</div>
                    <div className={clsx(styles.btnLogin)} onClick={(e) => { handleLogin(googleProvider, e) }}>Đăng nhập bằng Google</div>
                </form>
            </div>
        </div>
    )
}

