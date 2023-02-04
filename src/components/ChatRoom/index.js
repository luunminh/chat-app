import { Col, Row } from 'antd'
import React, { useContext, useEffect } from 'react'
import ChatWindow from './ChatWindow/index.js'
import SideBar from './SideBar'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { AppContext } from '../../Context/AppProvider.js'

export default function ChatRoom() {
    const { isSideMenuVisible } = useContext(AppContext)

    useEffect(() => {
        // console.log(isSideMenuVisible);
    }, [isSideMenuVisible])
    return (
        <div>
            <Row className={styles.wrap}>
                <Col span={6}><SideBar /> </Col>
                <Col span={18}><ChatWindow /> </Col>
            </Row>
            <Row className={clsx(styles.wrapMobile)}>
                <Col className={clsx(styles.sideMenu, {
                    [styles.sideMenuAppear]: isSideMenuVisible
                })} span={24}><SideBar /> </Col>
                <Col span={24}><ChatWindow /> </Col>
            </Row>
        </div>

    )
}
