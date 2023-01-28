import { Col, Row } from 'antd'
import React from 'react'
import ChatWindow from './ChatWindow/index.js'
import SideBar from './SideBar'
import styles from './styles.module.scss'

export default function ChatRoom() {
    return (
        <Row className={styles.wrap}>
            <Col span={6}><SideBar /> </Col>
            <Col span={18}><ChatWindow /> </Col>
        </Row>
    )
}
