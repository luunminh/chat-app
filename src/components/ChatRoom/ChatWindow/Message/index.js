import React, { useContext } from 'react'
import { Avatar, Typography } from 'antd'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { AuthContext } from '../../../../Context/AuthProvider'
import { formatRelative } from 'date-fns/esm';
export default function Message({ text, displayName, time, img, uid }) {
    const user = useContext(AuthContext)

    function formatDate(seconds) {
        let formattedDate = '';

        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

        return formattedDate;
    }

    return (
        <div className={clsx({
            [styles.container]: !(user.uid === uid),
            [styles.container2]: (user.uid === uid)
        })}>
            <Avatar className={styles.ava} src={img}>{(img) ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
            <Typography.Text className={styles.name}>{displayName}</Typography.Text>
            <Typography.Text className={styles.text}>{text}</Typography.Text>
            <Typography.Text className={styles.time}>{(time) ? formatDate(time.seconds) : (Date.now.toString())}</Typography.Text>
        </div>

    )
}
