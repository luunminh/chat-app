import { Col, Row } from 'antd'
import React from 'react'
import UserInfo from './UserInfo'
import styles from './styles.module.scss'
import RoomList from './RoomList'

export default function SideBar() {
    return (
        <div className={styles.sidebarWrap}>
            <Row >
                <Col style={{ height: 60 }} span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
            <div className={styles.copyRight}>@2023 made by <b>Luunminh</b></div>
        </div>
    )
}
