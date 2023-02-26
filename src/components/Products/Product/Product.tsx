import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {database} from "../../../firebaseConfig";
import Loader from "../../MiniComponents/Loader";
import {toast} from "react-toastify";
import styles from './product.module.scss'

const Product = () => {

    const params = useParams()
    console.log(params.id)

    const [productData, setProductData] = useState<any>()
    const [loading, setLoading] = useState(false)

    const getProductData = async () => {
        setLoading(true)
        try {
            if (params.id !== undefined) {

                const docRef = doc(database, 'products', params.id)
                const docData = await getDoc(docRef)

                if (docData.exists()) {

                    const dataObject = {
                        id: params.id,
                        ...docData.data()
                    }
                    setProductData(dataObject)
                    console.log(dataObject)
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

    const [bool, setBool] = useState(true)
    const [curInd, setCurInd] = useState<number>(0)
    const [extraInd, setExtraInd] = useState<number>(0)

    const [addClass, setAddClass] = useState(false)

    const changeBool = async (bol: boolean, ind: number) => {
        setBool(bol)

        setExtraInd(ind)
       // if (ind !== curInd && bol !== bool) {
        //if (bol) {

        if (ind !== curInd) {

          /*await  extrFunc(ind)*/
            setAddClass(true)
            setTimeout(() => {
                setAddClass(false)
                setCurInd(ind)

            }, 350)
        }

      //  }

       // }

    }

    const extrFunc = (ind: number) => {
        setAddClass(true)
        setTimeout(() => {
            setAddClass(false)
            setCurInd(ind)

        }, 350)
    }

    useEffect(() => {
        getProductData()

    }, [params.id])

    if (loading) {
        return <Loader />
    }

    return (
        <section className={'flex-auto bg-gray-50'}>

            <div className={'max-w-[1280px] mx-auto pt-5'}>
                <h2 className={`font-bold text-2xl mb-4`}>{productData?.name}</h2>
                <div className={`bg-white rounded-tl-[5px] rounded-tr-[5px] rounded-b-[15px] flex justify-between shadow-xl`}>
                    <div className={'p-2 flex gap-10'}>
                        <div className={'flex flex-col'}>
                            {
                                productData?.imageURLs.map((imageURL: string, index: number) => (
                                    <img key={index} src={imageURL} onMouseOver={() => changeBool(true, index)}
                                         /*onMouseLeave={() => changeBool(false, index)}*/
                                         className={`w-[100px] h-[100px] object-contain border-l-[3px] mb-2 cursor-zoom-in pl-5 ${index === extraInd ? 'border-green-400' : ''}`} alt="Load..."/>
                                ))
                            }
                        </div>
                        <div className={`p-3 transition-opacity duration-300 ease-in ${addClass ? 'opacity-0' : ''}`}>
                            <img src={productData?.imageURLs[curInd]} alt="Load..." className={`w-[450px] h-[450px] object-contain `}/>
                        </div>

                    </div>
                    <div className={'flex flex-col'}>
                        <span className={'text-[18px] font-medium'}>Brand: {productData?.brand}</span>
                       {/* <p>{productData.description}</p>*/}
                        <div className={'flex'}>
                            <div>{productData?.price}</div>
                            <button className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;