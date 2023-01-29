import { useContext, useMemo, useState } from 'react'
import React from 'react'
import Modal from 'antd/es/modal/Modal'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { Avatar, Select, Spin } from 'antd'
import styles from './styles.module.scss'
import { debounce } from 'lodash'
import { db } from '../../firebase/config'


function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    // Search

    // flag is used for catching when we call api to shows a loading animation
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);


    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true);


            // promise
            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                // [{label(displayName), value(uid), photoURL}] => custom data
                options.map(opt => (
                    <Select.Option key={opt.value}>
                        <Avatar size='small' src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label.charAt(0).toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                )

                )
            }
        </Select>
    )
}



export default function InviteModal() {

    const [memberName, setMemberName] = useState([])
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const handleCancel = () => {
        setMemberName([]);
        setIsInviteMemberVisible(false);
    }
    const handleOk = () => {

        // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId)

        roomRef.update({
            members: [...selectedRoom.members, ...memberName.map(val => val.value)]
        })

        setIsInviteMemberVisible(false);

        setMemberName([]);

    }

    async function fetchUserList(search, curMembers) {
        return db.collection('users').where('keywords', 'array-contains', search).orderBy('displayName', 'asc').limit(20).get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL
                })).filter(opt => !curMembers.includes(opt.value))
            })
    }

    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form action="" className={styles.formAddRoom}>
                    <DebounceSelect
                        mode='multiple'
                        label='Tên các thành viên'
                        value={memberName}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setMemberName(newValue)} //* */
                        style={{ width: '100%', margin: '10px 0' }}
                        currentMembers={selectedRoom.members}
                    />
                </form>
            </Modal>
        </div>
    )
}
