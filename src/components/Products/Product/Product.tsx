import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {database} from "../../../firebaseConfig";
import Loader from "../../MiniComponents/Loader";
import {toast} from "react-toastify";
import { BiArrowBack } from 'react-icons/bi';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {useDebounce} from "../../../hooks/useDebounce";

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

    const [productAmount, setProductAmount] = useState<number>(1)

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
            /*setTimeout(() => {
                setAddClass(false)
                setCurInd(ind)

            }, 350)*/
            fundWithDeb(ind)


        }

      //  }

       // }

    }

    const fundWithDeb = useDebounce((ind: number) => {
        setTimeout(() => {
            setAddClass(false)
            setCurInd(ind)

        }, 350)
    }, 300)

    const extrFunc = (ind: number) => {
        setAddClass(true)
        setTimeout(() => {
            setAddClass(false)
            setCurInd(ind)

        }, 350)
    }

    useEffect(() => {
        showImage(false)
        getProductData()

    }, [params.id])

    const [imageIsShow, setImageIsShow] = useState(false)

    const swipeNext = () => {
        setCurInd( curInd === productData?.imageURLs.length - 1 ? 0 : curInd+1)
        setExtraInd( curInd === productData?.imageURLs.length - 1 ? 0 : curInd+1)


    }

    const swipePrevious = () => {
        setCurInd( curInd === 0 ? productData?.imageURLs.length - 1 : curInd-1)
        setExtraInd( curInd === 0 ? productData?.imageURLs.length - 1 : curInd-1)


    }

    const showImage = (option: boolean) => {

        setImageIsShow(option)

    }





    if (loading) {
        return <Loader />
    }

    if (imageIsShow) {
        return (
            <div className={`flex-auto flex`}>
                <button className={`h-[calc(100vh_-_128px)] bg-gray-200 w-1/6 flex items-center justify-center my-auto 
                hover:bg-gray-100 transition-all duration-300 ease-in-out`}
                        onClick={swipeNext}>
                    <FaArrowLeft size={40}/>
                </button>
                <img src={productData?.imageURLs[curInd]} alt="" className={`w-4/6 h-[calc(100vh_-_128px)] object-contain`}/>
                <button className={`h-[calc(100vh_-_128px)] bg-gray-200 w-1/6 flex items-center justify-center my-auto relative 
                hover:bg-gray-100 transition-all duration-300 ease-in-out`}
                        onClick={swipePrevious}>
                    <AiOutlineClose onClick={() => showImage(false)} size={50} className={`absolute top-2 right-2`} />
                    <FaArrowRight size={40} className={``}/>
                </button>
            </div>
        )
    }

    return (
        <section className={'flex-auto bg-gray-50'}>

            <div className={'max-w-[1280px] mx-auto pt-5'}>
                <h2 className={`font-bold text-2xl mb-3`}>{productData?.name}</h2>
                <Link to={`/#product-list`}>
                    <button className={`flex gap-1 bg-blue-400 px-5 py-1 items-center rounded mb-4
                    hover:bg-blue-600 transition-all duration-300 ease-in-out active:bg-blue-700`}>
                        <BiArrowBack color={'white'} size={22}/>
                        <span className={`text-[22px] text-white`}>Back to products page</span>
                    </button>

                </Link>
                <div className={`bg-white rounded-tl-[5px] rounded-tr-[5px] rounded-b-[15px] flex justify-between shadow-xl`}>
                    <div className={'p-2 flex gap-10'}>
                        <div className={'flex flex-col'}>
                            {
                                productData?.imageURLs.map((imageURL: string, index: number) => (
                                    <img key={index} src={imageURL} onMouseOver={() => changeBool(true, index)}
                                         onClick={() => showImage(true)}
                                         /*onMouseLeave={() => changeBool(false, index)}*/
                                         className={`w-[100px] h-[100px] object-contain border-l-[3px] mb-2 cursor-zoom-in pl-5 ${index === extraInd ? 'border-green-400' : ''}`} alt="Load..."/>
                                ))
                            }
                        </div>
                        <div className={`p-3 transition-opacity duration-300 ease-in ${addClass ? 'opacity-0' : ''}`}>
                            <img src={productData?.imageURLs[curInd]} alt="Load..." onClick={() => showImage(true)}
                                 className={`w-[450px] h-[450px] object-contain cursor-zoom-in`}/>
                        </div>

                    </div>
                    <div className={'flex flex-col w-1/2 gap-3 pr-2'}>
                        <span className={'text-[22px] font-medium'}>Brand: {productData?.brand}</span>
                        <p className={``}>{productData?.description}</p>
                        <div className={'flex items-center gap-2 justify-end'}>
                            <div className={`text-[22px] font-medium`}>Price: {productData?.price}$</div>
                            <div className={`flex flex-col items-center`}>
                                <div className={`flex text-[24px] gap-2 mb-2`}>
                                    <button disabled={productAmount === 1}
                                    className={`bg-green-500 rounded-full p-2 
                                    transition-all duration-300 easy-in-out text-white
                                    ${productAmount === 1 ? `opacity-80`: `hover:bg-green-600`}`}
                                            onClick={() => setProductAmount(productAmount-1)}><AiOutlineMinus/></button>
                                    <span>{productAmount}</span>
                                    <button className={`bg-green-500 rounded-full p-2 text-white
                                    transition-all duration-300 easy-in-out hover:bg-green-600`}
                                        onClick={() => setProductAmount(productAmount+1)}><AiOutlinePlus/></button>
                                </div>
                                <button className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}>Add to Cart</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;