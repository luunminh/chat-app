import { Collapse, Typography } from 'antd'
import React, { useContext, useMemo } from 'react'
import styles from './styles.module.scss'
import styled from 'styled-components'
import useFireStore from '../../../../hooks/useFireStore'
import { AppContext } from '../../../../Context/AppProvider'

const { Panel } = Collapse



const PanelStyled = styled(Panel)`
&&& {
    .ant-collapse-header, p {
        color: #FFF;
        letter-spacing: .4px;
        font-weight: 700;
        text-transform: uppercase;
        border:none;
    }
    .ant-collapse-content {
    }
}
`;
export default function RoomList() {
    const { rooms, setIsShowingModal, setSelectedRoomId } = useContext(AppContext)
    const handleAddRoom = () => {
        setIsShowingModal(true);
    }


    return (
        <Collapse ghost defaultActiveKey={['1']} className={styles.container}>
            <PanelStyled header="Danh sách các phòng" className={styles.list}>
                {rooms.map((room) => (
                    <Typography.Link onClick={() => {
                        setSelectedRoomId(room.id)
                        // console.log(room);
                    }} className={styles.item} key={room.id}>{room.name}</Typography.Link>
                ))}
                <button onClick={handleAddRoom} className={styles.addRoomBtn}>Thêm phòng</button>
            </PanelStyled>
        </Collapse>

    )
}
