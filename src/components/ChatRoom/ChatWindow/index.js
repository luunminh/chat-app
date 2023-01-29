import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, Button, Tooltip, Spin, Alert } from 'antd'
import { UserAddOutlined } from '@ant-design/icons/lib/icons'
import styles from './styles.module.scss'
import Message from './Message'
import { AppContext } from '../../../Context/AppProvider'
import { addDocument } from '../../../firebase/services'
import { AuthContext } from '../../../Context/AuthProvider'
import useFirestore from '../../../hooks/useFireStore'

export default function ChatWindow() {
    const user = useContext(AuthContext)
    const inputRef = useRef(null);
    const messageListRef = useRef(null)
    const { selectedRoom, members,
        setIsInviteMemberVisible } = useContext(AppContext);
    const [inputMsg, setInputMsg] = useState('');

    const handleChangeInput = (e) => {
        setInputMsg(e.target.value);
    }
    const handleSubmit = (e) => {
        console.log({ user });
        e.preventDefault();

        addDocument('messages', {
            text: inputMsg,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName
        })

        setInputMsg('');
        if (inputRef?.current) {
            setTimeout(() => {
                inputRef.current.focus();
            });
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDocument('messages', {
                text: inputMsg,
                uid: user.uid,
                photoURL: user.photoURL,
                roomId: selectedRoom.id,
                displayName: user.displayName
            })

            setInputMsg('');
            if (inputRef?.current) {
                setTimeout(() => {
                    inputRef.current.focus();
                });
            }
        }
    }

    const msgCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id])

    const messages = useFirestore('messages', msgCondition)
    // console.log(messages);

    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

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
                        <div className={styles.messageList} ref={messageListRef}>
                            {messages.map(msg => {
                                // console.log(msg);
                                return (
                                    <Message key={msg.id}
                                        displayName={msg.displayName}
                                        text={msg.text}
                                        img={msg.photoURL}
                                        uid={msg.uid}
                                        time={msg.createdAt}
                                    />
                                )
                            })}
                        </div>
                        <form className={styles.msgForm}>
                            <input type="text" onKeyPress={handleKeyPress} placeholder='Nhập tin nhắn' ref={inputRef} className={styles.inputMsg} value={inputMsg} onChange={handleChangeInput} />
                            <div className={styles.btnSend} onClick={handleSubmit}>Gửi</div>
                        </form>
                    </div>
                </>) : <Alert message='Hãy chọn phòng' type='info' showIcon style={{ margin: '0px 5px 5px' }} closable />
            }

        </div>
    )
}
