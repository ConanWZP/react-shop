import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {database} from "../../../firebaseConfig";
import Loader from "../../MiniComponents/Loader";
import {toast} from "react-toastify";
import {BiArrowBack} from 'react-icons/bi';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {AiOutlineClose, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {useDebounce} from "../../../hooks/useDebounce";
import {IProduct} from "../../Admin/ListGoods";
import {
    addProductToCart,
    cartItem,
    decreaseProductInCart,
    removeProductFromCart
} from "../../../redux/slices/cartSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/customHooks";
import Notiflix from "notiflix";
import useFetchDoc from "../../../hooks/useFetchDoc";
import useFetchCollection from "../../../hooks/useFetchCollection";
import StarsRating from "react-star-rate";

const Product = () => {

    const params = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {documentData, loading} = useFetchDoc('products', params?.id)
    let productData = documentData

    const [bool, setBool] = useState(true)
    const [curInd, setCurInd] = useState<number>(0)
    const [extraInd, setExtraInd] = useState<number>(0)

    const [addClass, setAddClass] = useState(false)

    const changeBool = async (bol: boolean, ind: number) => {
        setBool(bol)
        setExtraInd(ind)

        if (ind !== curInd) {
            setAddClass(true)
            fundWithDeb(ind)
        }
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
        /*  getProductData()*/

    }, [params.id])


    const [imageIsShow, setImageIsShow] = useState(false)

    const swipeNext = () => {
        setCurInd(curInd === productData?.imageURLs.length - 1 ? 0 : curInd + 1)
        setExtraInd(curInd === productData?.imageURLs.length - 1 ? 0 : curInd + 1)


    }

    const swipePrevious = () => {
        setCurInd(curInd === 0 ? productData?.imageURLs.length - 1 : curInd - 1)
        setExtraInd(curInd === 0 ? productData?.imageURLs.length - 1 : curInd - 1)


    }

    const showImage = (option: boolean) => {
        setImageIsShow(option)
    }


    const {items} = useAppSelector(state => state.cart)


    const currentItem = items.find((item) => item.id === productData?.id)


    const addItemToCart = (item: IProduct) => {
        dispatch(addProductToCart(item))
    }

    const decreaseCurrentItem = (item: cartItem) => {

        if (item.count > 1) {
            dispatch(decreaseProductInCart(item))
        } else {
            removeCurrentItem(item)
        }

    }

    const removeCurrentItem = (item: cartItem) => {
        Notiflix.Confirm.show(
            'Remove the product',
            'Do you really want to remove the product?',
            'Remove',
            'Cancel',
            function okCb() {
                dispatch(removeProductFromCart(item))
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

    // --- Reviews --- //

    const [reviewData, setReviewData] = useState<any[]>([])
    const {data} = useFetchCollection('reviews', 'productID', '==', params?.id)


    useEffect(() => {
        setReviewData(data)
    }, [data])

    console.log(reviewData)

    if (loading) {
        return <Loader/>
    }

    if (imageIsShow) {
        return (
            <div className={`flex-auto flex pt-16`}>
                <button className={`h-[calc(100vh_-_128px)] bg-gray-200 w-1/6 flex items-center justify-center my-auto 
                hover:bg-gray-100 transition-all duration-300 ease-in-out`}
                        onClick={swipeNext}>
                    <FaArrowLeft size={40}/>
                </button>
                <img src={productData?.imageURLs[curInd]} alt=""
                     className={`w-4/6 h-[calc(100vh_-_128px)] object-contain`}/>
                <button className={`h-[calc(100vh_-_128px)] bg-gray-200 w-1/6 flex items-center justify-center my-auto relative 
                hover:bg-gray-100 transition-all duration-300 ease-in-out`}
                        onClick={swipePrevious}>
                    <AiOutlineClose onClick={() => showImage(false)} size={50} className={`absolute top-2 right-2`}/>
                    <FaArrowRight size={40} className={``}/>
                </button>
            </div>
        )
    }

    return (
        <section className={'flex-auto bg-gray-50 pt-32'}>

            <div className={'max-w-[1280px] mx-auto pt-5'}>
                <h2 className={`font-bold text-2xl mb-3`}>{productData?.name}</h2>
                {/*<Link to={'/#product-list'}>*/}
                <div>

                    <button onClick={() => navigate(-1)}
                            className={`mb-6 py-1.5 px-5 bg-blue-500 transition-all duration-300 ease-in-out
                                rounded-r-full rounded-l-full inline-flex items-center text-white 
                                hover:bg-blue-600 gap-1`}>
                        <BiArrowBack color={'white'} size={22}/>
                        <span className={`text-[22px] text-white`}>Back to products page</span>
                    </button>


                </div>
                {/* </Link>*/}
                <div className={`bg-white rounded-tl-[5px] border border-slate-200 p-2
                rounded-tr-[5px] mb-8 rounded-b-[15px] flex justify-between shadow-xl`}>
                    <div className={'p-2 flex gap-10'}>
                        <div className={'flex flex-col'}>
                            {
                                productData?.imageURLs.map((imageURL: string, index: number) => (
                                    <img key={index} src={imageURL} onMouseOver={() => changeBool(true, index)}
                                         onClick={() => showImage(true)}
                                        /*onMouseLeave={() => changeBool(false, index)}*/
                                         className={`w-[100px] h-[100px] object-contain border-l-[3px] mb-2 cursor-zoom-in pl-5 ${index === extraInd ? 'border-green-400' : ''}`}
                                         alt="Load..."/>
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
                        <div className={'flex items-center gap-2 justify-end '}>

                            <div className={`text-[22px] font-medium flex flex-col gap-4`}>
                                {
                                    currentItem ?
                                        <div>
                                            Total price: {currentItem.count * currentItem.price}$
                                        </div>
                                        : null
                                }

                                <div>
                                    Price for 1: {productData?.price}$
                                </div>
                            </div>

                            <div className={`flex flex-col items-center`}>
                                {
                                    currentItem ?
                                        <div className={`flex text-[24px] gap-2 mb-2`}>
                                            <button onClick={() => decreaseCurrentItem(currentItem)}
                                                    className={`bg-green-500 rounded-full p-2 
                                    transition-all duration-300 easy-in-out text-white`}>
                                                <AiOutlineMinus/>
                                            </button>
                                            <span>{currentItem.count}</span>
                                            <button onClick={() => addItemToCart(productData)}
                                                    className={`bg-green-500 rounded-full p-2 text-white
                                    transition-all duration-300 easy-in-out hover:bg-green-600`}>
                                                <AiOutlinePlus/>
                                            </button>
                                            in cart
                                        </div>
                                        :
                                        null
                                }

                                <button onClick={() => addItemToCart(productData)}
                                        className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}>
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`bg-white mb-8 rounded-[15px] p-3 shadow-xl border border-slate-200`}>
                    <h2 className={`text-[28px] font-bold`}>Product reviews</h2>
                    <div>
                        {
                            reviewData.length > 0 ?
                                reviewData.map((review, index) =>
                                    <div key={index} className={`mt-14`}>
                                        <div className={`flex justify-between border-slate-200 border-t-2 pt-2 items-center`}>
                                            <span className={`text-[22px]`}>
                                                <b>Created by: {review.userName}</b>
                                            </span>
                                            <span className={`text-gray-500`}>
                                                <b>{review.reviewDate}</b>
                                            </span>
                                        </div>

                                        <StarsRating value={review.rate} disabled/>
                                        <div className={`flex flex-col gap-2 text-[18px]`}>
                                            <b>Comment:</b>
                                            <p>{review.reviewText}</p>
                                        </div>


                                    </div>
                                )
                                :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;