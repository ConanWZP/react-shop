import React, {FC, ReactNode} from 'react';
import {useAppSelector} from "../../hooks/customHooks";

interface AdminAccessProps {
    children: ReactNode,
}


const AdminAccessNotUsed:FC<AdminAccessProps> = ({children}) => {

    const {email} = useAppSelector(state => state.auth)

    if (email === 'yaroslav2281337@gmail.com') {
        return (
            <div>
                {children}
            </div>
        )
    } else {
        return null
    }


};

export default AdminAccessNotUsed