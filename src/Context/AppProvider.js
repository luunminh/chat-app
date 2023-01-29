import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';
import { AuthContext } from './AuthProvider';
import useFireStore from '../hooks/useFireStore';

// instead of using redux for complicated and longthy code, we use useContext to save some properties and data that can be use in many components
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    // {name, description, members: [uid1, uid2]}

    const [isShowingModal, setIsShowingModal] = useState(false);

    const [selectedRoomId, setSelectedRoomId] = useState('');

    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)

    const user = useContext(AuthContext)
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
        };
    }, [user.uid]);


    const rooms = useFireStore('rooms', roomsCondition)
    // console.log({ rooms });
    // const firstRoomId = rooms[0].newId;

    const selectedRoom = useMemo(() =>
        rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const membersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,

        }
    }, [selectedRoom.members])

    const members = useFireStore('users', membersCondition);
    // console.log({ members });


    return (
        <AppContext.Provider value={{
            rooms, members, isShowingModal, setIsShowingModal, selectedRoomId, setSelectedRoomId, selectedRoom, isInviteMemberVisible
            , setIsInviteMemberVisible
        }}>
            {children}
        </AppContext.Provider>
    )
}
