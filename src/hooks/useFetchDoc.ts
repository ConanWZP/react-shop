import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {database} from "../firebaseConfig";
import {toast} from "react-toastify";


const useFetchDoc = (documentPath: string, id?: string) => {

    const [documentData, setDocumentData] = useState<any>()
    const [loading, setLoading] = useState(false)

    const getDocumentData = async () => {
        setLoading(true)
        try {
            if (id !== undefined) {

                const docRef = doc(database, documentPath, id)
                const docData = await getDoc(docRef)

                if (docData.exists()) {

                    const dataObject = {
                        id: id,
                        ...docData.data()
                    }
                    setDocumentData(dataObject)
                  //  console.log(dataObject)
                } else {
                    toast.error(`The product data weren't found`)
                }

            } else {
                toast.error('Something went wrong')
            }
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDocumentData()
    }, [])

    return {documentData, loading}

}






export default useFetchDoc