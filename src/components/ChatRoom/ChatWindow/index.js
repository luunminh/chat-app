import React, { useContext, useMemo, useState } from 'react'
import { Avatar, Button, Tooltip, Spin, Alert } from 'antd'
import { UserAddOutlined } from '@ant-design/icons/lib/icons'
import styles from './styles.module.scss'
import Message from './Message'
import { AppContext } from '../../../Context/AppProvider'
import { debounce } from 'lodash'


export default function ChatWindow() {

    const { rooms, selectedRoom, members,
        setIsInviteMemberVisible } = useContext(AppContext);

    return (
        <div className={styles.container}>
            {
                selectedRoom.id ? (<>
                    <div className={styles.header}>
                        <div className={styles.leftSide}>
                            <p className={styles.roomName}>{(selectedRoom) ? selectedRoom.name : ''}</p>
                            <p className={styles.roomDesc}>{(selectedRoom) ? selectedRoom.description : ''}</p>
                        </div>
                        <div className={styles.rightSide}>
                            <Button icon={<UserAddOutlined />} className={styles.inviteBtn} onClick={() => {
                                setIsInviteMemberVisible(true);
                            }}>Mời</Button>
                            <Avatar.Group size='small' maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip title={member.displayName} key={member.id}>
                                        <Avatar src={member.photoURL}
                                        >{(member.photoURL) ? "" : member.displayName.charAt(0).toUpperCase()}</Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.messageList}>
                            <Message displayName='Toàn Ngô'
                                text='Mai mấy h đây ae'
                                time='16:12'
                            />
                            <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            />
                            <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            /> <Message displayName='Toàn Ngô'
                                text='Mai mấy h đádasdasdasdasdsadasdasdsdadadasdây ae'
                                time='16:12'
                            />
                        </div>
                        <form action="" className={styles.msgForm}>
                            <input type="text" placeholder='Nhập tin nhắn' className={styles.inputMsg} />
                            <div className={styles.btnSend}>Gửi</div>
                        </form>
                    </div>
                </>) : <Alert message='Hãy chọn phòng' type='info' showIcon style={{ margin:'0px 5px 5px' }} closable />
            }

        </div>
    )
}
