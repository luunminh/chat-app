import React, { useContext, useEffect } from 'react'
import { Avatar } from 'antd'
import styles from './styles.module.scss'
import { auth, db } from '../../../../firebase/config'
import { AuthContext } from '../../../../Context/AuthProvider'
export default function UserInfo() {
    const user = useContext(AuthContext);

    return (
        <div className={styles.wrap}>
            <div className={styles.leffSide}>
                <Avatar src={user.photoURL}>{user.photoURL ? '' : user.displayName.charAt(0).toUpperCase()}</Avatar>
                <p className={styles.userNameText}>{user.displayName}</p>
            </div>

            <button className={styles.logoutBtn} onClick={() => { auth.signOut() }}>Đăng xuất</button>
        </div>
    )
}
