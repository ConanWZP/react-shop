import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/customHooks";
import {useNavigate} from "react-router-dom";
import avatarBlank from '../assets/img/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent (1).png'
import { doc, getDoc } from 'firebase/firestore';
import {database} from "../firebaseConfig";

const Profile = () => {

    const navigate = useNavigate()
    const { isAuth, userName, avatar, userID, email } = useAppSelector(state => state.auth)
    const [createdAt, setCreatedAt] = useState<any>()

    useEffect(() => {
        const getData = async () => {
            if (userID) {
                const docRef = doc(database, "users", userID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                   // console.log("Document data:", docSnap.data());
                    setCreatedAt(docSnap.data().createdAt.toDate().toDateString())
                  //  console.log(createdAt.toDate().toDateString())
                }
            }

        }
        getData()

    }, [])

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }

    }, [isAuth])

    return (
        <div className={'flex-auto pt-20 max-w-[1280px] mx-auto'}>
            <div className={`flex flex-col items-center`}>
                <div className={`text-[26px] font-[600]`}>{userName}</div>
                <div>{email}</div>
                <div>Account was created at: {createdAt}</div>
                <div>
                    <img className={`w-[180px] rounded-full`} src={avatar === '' ? avatarBlank : avatar} alt=""/>
                </div>
                <div>
                    <div>Change photo</div>
                    <div>Delete photo</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;