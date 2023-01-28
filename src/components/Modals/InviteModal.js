import { useContext, useMemo, useState } from 'react'
import React from 'react'
import Modal from 'antd/es/modal/Modal'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../Context/AuthProvider'
import { Avatar, Select, Spin } from 'antd'
import styles from './styles.module.scss'
import { debounce } from 'lodash'


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
            fetchOptions(value).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue
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

    const [memberName, setMemberName] = useState('')
    const user = useContext(AuthContext)
    const { isInviteMemberVisible, setIsInviteMemberVisible } = useContext(AppContext);
    const handleCancel = () => {
        setMemberName('');
        setIsInviteMemberVisible(false);
    }
    const handleOk = () => {


        setIsInviteMemberVisible(false);

        setMemberName('');

    }

    async function fetchUserList() {

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
                        onChange={newValue => setMemberName(newValue)}
                        style={{width: '100%', margin:'10px 0'}}
                    />
                </form>
            </Modal>
        </div>
    )
}
