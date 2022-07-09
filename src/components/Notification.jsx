import React, { useContext, useEffect } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

import { useSelector, useDispatch } from 'react-redux' 
import { setShowNotification } from '../features/notification/notificationSlice'

function Notification() {

    const { notification } = useSelector((store) => store.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setShowNotification(false))
        }, 3000)
    }, [notification, setShowNotification])

    return (
        <div className={`${notification.includes('wrong') ? 'bg-red-200 text-red-800':'bg-green-200 text-green-800'}
        p-3 w-full h-1/2
        rounded-xl shadow-md flex items-center justify-between font-bold text-xl`}>
            <h1 className='text-sm'>{notification}</h1>
            <div onClick={() => dispatch(setShowNotification(false))} className='cursor-pointer flex items-center'>
                <CancelIcon color='error' />
            </div>
        </div>
    )
}

export default Notification
