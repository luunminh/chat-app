import { useContext, useState } from 'react'
import React from 'react'
import Modal from 'antd/es/modal/Modal'
import styles from './styles.module.scss'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../Context/AuthProvider'
export default function AddRoomModal() {

    const [roomName, setRoomName] = useState('')
    const [roomDesc, setRoomDesc] = useState('')
    const user = useContext(AuthContext)
    const { isShowingModal, setIsShowingModal } = useContext(AppContext);
    const handleCancel = () => {
        setRoomName('');
        setRoomDesc('');
        setIsShowingModal(false);
    }
    const handleAddRoom = () => {
        addDocument('rooms', {
            name: roomName,
            description: roomDesc,
            members: [user.uid],
        })

        setIsShowingModal(false);

        setRoomName('');
        setRoomDesc('');

    }
    return (
        <div>
            <Modal
                title='Tạo phòng'
                visible={isShowingModal}
                onOk={handleAddRoom}
                onCancel={handleCancel}
            >
                <form action="" className={styles.formAddRoom}>
                    <label htmlFor="" className={styles.lbAddRoom}>Tên phòng</label>
                    <input onChange={(e) => {
                        setRoomName(e.target.value)
                    }} value={roomName} type="text" className={styles.inputAdd} placeholder='Nhập tên phòng' />
                    <label htmlFor="" className={styles.lbAddRoom}>Mô tả phòng</label>
                    <input onChange={(e) => {
                        setRoomDesc(e.target.value)
                    }} value={roomDesc} type="text" className={styles.inputAdd} placeholder='Nhập mô tả' />
                </form>
            </Modal>
        </div>
    )
}
