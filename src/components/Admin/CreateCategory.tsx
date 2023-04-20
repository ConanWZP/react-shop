import React, {useState} from 'react';
import {collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {database} from "../../firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import {toast} from "react-toastify";

const CreateCategory = () => {

    const [categoryName, setCategoryName] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const q = query(collection(database, 'categories'))
            const querySnapshot = await getDocs(q);
            let dataArray: any = []
            querySnapshot.forEach((doc) => dataArray.push(doc.data()));

            console.log(querySnapshot)

            console.log(dataArray)

            let foundCategory = dataArray.find((element: any) => element.categoryName.toLowerCase() === categoryName.toLowerCase())
            console.log(foundCategory)
            if (!foundCategory) {
                const uid = uuidv4()
                const docRef = doc(database, 'categories', uid)
                await setDoc(docRef, {
                    uid,
                    categoryName
                })
                toast.success('Category was created')
            } else {
                toast.error('This category already exist')
            }

        } catch (e: any) {
            toast.error(e.message)
        }


    }

    return (
        <div className={`px-2`}>
            <h2 className={'text-[40px] font-bold text-center max-[500px]:text-[32px]'}>Create Category</h2>
            <form className={'shadow-xl p-4 rounded-[10px] flex flex-col max-w-[1280px]'} onSubmit={handleSubmit}>
                <div className={'text-[22px] mb-1'}>Category Name:</div>
                <div className={`mx-auto w-full flex flex-col`}>
                    <input type="text" placeholder={'Example: Phones'} value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)} className={` rounded-[10px]
                        p-3 border-2 border-gray-300 text-[22px] focus:border-blue-500 outline-none mb-2`}/>
                    <button className={`bg-blue-500 rounded text-[24px] text-white px-6 py-2 hover:bg-blue-600 
                transition-all duration-300 ease-in-out `}>Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;