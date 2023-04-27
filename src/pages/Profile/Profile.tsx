import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {useNavigate} from "react-router-dom";
import avatarBlank
    from '../../assets/img/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent (1).png'
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {database, storage} from "../../firebaseConfig";
import {AiFillCamera} from 'react-icons/ai';
import {BsFillTrashFill} from 'react-icons/bs';
import style from './profile.module.scss'
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {setChangeAvatar} from '../../redux/slices/authSlice';
import Notiflix from "notiflix";
import {clearCart} from "../../redux/slices/cartSlice";

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isAuth, userName, avatar, userID, email} = useAppSelector(state => state.auth)
    const [createdAt, setCreatedAt] = useState<any>()
    const [image, setImage] = useState<any>()
    const inputRef = useRef<any>()

    /* const showImageState = (e: any) => {
         setImage(e.target.files[0])
         console.log(e.target.files[0])
     }*/

    useEffect(() => {
        console.log(image)
    }, [image])

    const chooseFile = () => {
        inputRef.current.click()
    }


    // deleteObject(ref(storage, imageUrl)) тут imageURL может быть как буквально ссылка https://
    // так и путь в storag'e    название папки/название файла

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
        if (image) {
            const loadPhoto = async () => {

                if (avatar !== '') {
                    await deleteObject(ref(storage, avatar))
                }

                const storageRef = ref(storage, `avatars/${new Date().getTime()} - ${image.name}`)
                const uploadedFile = await uploadBytes(storageRef, image)

                const url = await getDownloadURL(uploadedFile.ref)
                console.log(url)
                if (userID) {
                    await updateDoc(doc(database, 'users', userID), {
                        avatar: url
                    })
                }

                dispatch(setChangeAvatar(url))

            }
            loadPhoto()
        }


    }, [image])

    const deleteProfilePhoto = () => {
        Notiflix.Confirm.show(
            'Deleting photo',
            'Do you really want to delete photo?',
            'Delete',
            'Cancel',
            function okCb() {
                deleteImage()
            },
            function cancelCb() {

            },
            {
                width: '320px',
                borderRadius: '8px',
                titleColor: 'rgb(59,130,246)',
                okButtonBackground: 'rgb(59,130,246)'
                // etc...
            },
        );
    }

    const deleteImage = async () => {
        await deleteObject(ref(storage, avatar))
        if (userID) {
            await updateDoc(doc(database, 'users', userID), {
                avatar: ''
            })
        }
        dispatch(setChangeAvatar(''))
    }


    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }

    }, [isAuth])

    return (
        <div className={'flex-auto max-w-[1280px] mx-auto flex flex-col items-center justify-center'}>
            <div className={`flex flex-col items-center`}>
                <div className={`text-[28px] font-[600]`}>{userName}</div>
                <div>{email}</div>
                <div>Account was created at: {createdAt}</div>
                <div className={`relative ${style.imageBlock} mt-4`}>
                    <img className={`w-[180px] h-[180px] rounded-full`} src={avatar === '' ? avatarBlank : avatar} alt=""/>
                    <div className={`cursor-pointer transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 
                    translate-x-[-50%] translate-y-[-50%] ${style.overlay}`} >
                        <div className={`text-[34px] flex flex-col items-center gap-2 text-black `}>
                            <AiFillCamera onClick={chooseFile}/>
                            {
                                avatar !== '' ?
                                    <BsFillTrashFill onClick={deleteProfilePhoto}/>
                                    :
                                    null
                            }
                            <input className={`hidden`} ref={inputRef}
                                   type="file" accept={'image/*'}
                                   onChange={(event: any) => setImage(event.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col items-center mt-2 text-[22px] font-[600]`}>
                    <div onClick={chooseFile} className={`cursor-pointer`}>Change photo</div>
                    <div onClick={deleteProfilePhoto} className={`cursor-pointer`}>Delete photo</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;