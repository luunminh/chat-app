import React from 'react'
import { Avatar, Typography } from 'antd'
import styles from './styles.module.scss'
export default function Message({ text, displayName, time, img }) {
    return (
        <div className={styles.container}>
            <Avatar className={styles.ava} src={img}>TN</Avatar>
            <Typography.Text className={styles.name}>{displayName}</Typography.Text>
            <Typography.Text className={styles.text}>{text}</Typography.Text>
            <Typography.Text className={styles.time}>{time}</Typography.Text>
        </div>

    )
}
