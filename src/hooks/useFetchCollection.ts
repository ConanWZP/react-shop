import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {database} from "../firebaseConfig";
import {saveProducts} from "../redux/slices/productSlice";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useAppDispatch} from "./customHooks";


const useFetchCollection = (collectionName: string) => {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()


    const getFirebaseCollection = () => {
        setLoading(true)

        try {


            const docRef = collection(database, collectionName)

            const q = query(docRef, orderBy('createdAt', 'desc'));
            onSnapshot(q, async (querySnapshot) => {
                // const cities = [];
                console.log(querySnapshot)
                const fullData = querySnapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    }
                )
                console.log(fullData)
                setData(fullData)
                setLoading(false)
               // dispatch(saveProducts(fullData))


                /*await querySnapshot.forEach((doc) => {
                    products.push(doc.data().name);
                });*/
                // console.log("Current cities in CA: ", cities.join(", "));
            });


        } catch (e: any) {
            toast.error(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getFirebaseCollection()
    }, [])

    return {data, loading}

}


export default useFetchCollection