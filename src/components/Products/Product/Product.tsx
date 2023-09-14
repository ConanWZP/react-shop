import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
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
import {log} from "util";
import avatarBlank
    from "../../../assets/img/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent (1).png";

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

        // setBool - лишнее
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

   /* const extrFunc = (ind: number) => {
        setAddClass(true)
        setTimeout(() => {
            setAddClass(false)
            setCurInd(ind)

        }, 350)
    }*/

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

    const [avatars, setAvatars] = useState<any>()


    let usersIDFromReviews = data.map((review: any) => review.userID)
    //console.log(array)


    let usersDataFromUsers: any[] = []


    let modifiedUsersDataFromUsers: any[] = []
    /*let changeData = data*/



    useEffect(() => {
        const gettingUsers = async () => {
            /*const querySnapshot = await getDocs(collection(database, "users"));
            querySnapshot.forEach((doc) => {
                for (let i = 0; i < array.length; i++) {
                    if (doc.id === array[i])
                        extraArray.push(doc.data())
                }

            });*/


            // Создаем массив с информацией о пользователях, которые оставили отзывы
            for (let i = 0; i < usersIDFromReviews.length; i++) {
               const reviewer = await getDoc(doc(database, 'users', usersIDFromReviews[i]))
                if (reviewer.exists()) {
                    usersDataFromUsers.push(reviewer.data())
                }
            }
            // в массиве отзывов для каждого отзыва добавляем поле с аватаркой пользователя
            modifiedUsersDataFromUsers = data.map((el: any) => {
                for (let i = 0; i < usersDataFromUsers.length; i++) {
                    if (el.userID === usersDataFromUsers[i].uid) {
                        return {
                            ...el,
                            ava: usersDataFromUsers[i].avatar
                        }
                    }
                }
            })


            setReviewData(modifiedUsersDataFromUsers)



        }
        gettingUsers()
        //console.log(changeData)

    }, [data])

    //console.log(changeData)

    /*useEffect(() => {
        setReviewData(data)

    }, [data])*/

   // console.log(reviewData)

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
        <section className={'flex-auto bg-gray-50 pt-20 px-2 max-[600px]:px-1'}>

            <div className={'max-w-[1280px] mx-auto pt-5'}>
                <h2 className={`font-bold text-2xl mb-3 max-[420px]:text-[22px]`}>{productData?.name}</h2>
                {/*<Link to={'/#product-list'}>*/}
                <div>

                    <button onClick={() => navigate(-1)}
                            className={`mb-6 py-1.5 px-5 bg-blue-500 transition-all duration-300 ease-in-out
                                rounded-r-full rounded-l-full inline-flex items-center text-white 
                                hover:bg-blue-600 gap-1 max-[420px]:px-3 max-[420px]:py-1`}>
                        <BiArrowBack color={'white'} className={`text-[22px] max-[420px]:text-[20px]`}/>
                        <span className={`text-[22px] text-white max-[420px]:text-[20px]`}>Back to products page</span>
                    </button>


                </div>
                {/* </Link>*/}
                <div className={`bg-white rounded-tl-[5px] border border-slate-200 p-2 max-[600px]:p-1
                rounded-tr-[5px] mb-8 rounded-b-[15px] flex justify-between shadow-xl max-[970px]:flex-col`}>
                    <div className={'p-2 flex gap-6 w-1/2 max-[1280px]:gap-2 max-[970px]:w-full max-[970px]:flex-col-reverse max-[520px]:p-0.5 '}>
                        <div className={'flex flex-col max-[970px]:flex-row  max-[970px]:overflow-x-scroll max-[970px]:mx-auto'}>
                            {
                                productData?.imageURLs.map((imageURL: string, index: number) => (
                                    <img key={index} src={imageURL} onMouseOver={() => changeBool(true, index)}
                                         onClick={() => showImage(true)}
                                        /*onMouseLeave={() => changeBool(false, index)}*/
                                         className={`w-[100px] h-[100px] max-[1280px]:w-[80px] max-[1280px]:h-[80px] min-[601px]:w-[120px] min-[601px]:h-[120px]
                                          object-contain border-l-[3px] mb-2 cursor-zoom-in pl-5 max-[970px]:pb-5 max-[970px]:pl-1 max-[970px]:border-l-0 max-[970px]:border-b-[3px] max-[970px]:mr-2 
                                          ${index === extraInd ? 'border-green-400' : ''}`}
                                         alt="Load..."/>
                                ))
                            }
                        </div>
                        <div className={`p-3 transition-opacity duration-300 ease-in max-[1280px]:p-1 
                        max-[520px]:p-0 max-[520px]:pb-1 ${addClass ? 'opacity-0' : ''}`}>
                            <img src={productData?.imageURLs[curInd]} alt="Load..." onClick={() => showImage(true)}
                                 className={`w-[450px] h-[450px] object-contain cursor-zoom-in 
                                 max-[1280px]:w-[350px] max-[1280px]:h-[350px] max-[970px]:mx-auto min-[601px]:w-[450px] min-[601px]:h-[450px] max-[420px]:w-[280px] max-[420px]:h-[280px]`}/>
                        </div>

                    </div>
                    <div className={'flex flex-col w-1/2 gap-3 pr-2 max-[970px]:w-full max-[970px]:pr-0'}>
                        <span className={'text-[22px] font-medium'}>Brand: {productData?.brand}</span>
                        <p className={``}>{productData?.description}</p>
                        <div className={'flex items-center gap-2 justify-end max-[600px]:justify-center max-[500px]:gap-1'}>

                            <div className={`text-[22px] font-medium flex flex-col gap-4 max-[500px]:text-[18px]`}>
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
                                        <div className={`flex text-[24px] gap-2 mb-2 max-[500px]:text-[18px] items-center max-[500px]:gap-0.5`}>
                                            <button onClick={() => decreaseCurrentItem(currentItem)}
                                                    className={`bg-green-500 rounded-full p-2 
                                    transition-all duration-300 easy-in-out text-white max-[500px]:p-1`}>
                                                <AiOutlineMinus/>
                                            </button>
                                            <span>{currentItem.count}</span>
                                            <button onClick={() => addItemToCart(productData)}
                                                    className={`bg-green-500 rounded-full p-2 text-white
                                    transition-all duration-300 easy-in-out hover:bg-green-600 max-[500px]:p-1`}>
                                                <AiOutlinePlus/>
                                            </button>
                                            in cart
                                        </div>
                                        :
                                        null
                                }

                                <button onClick={() => addItemToCart(productData)}
                                        className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700 max-[500px]:text-[18px] max-[500px]:px-2.5 max-[500px]:py-1`}>
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`bg-white mb-8 rounded-[15px] p-3 shadow-xl border border-slate-200 max-[600px]:p-1`}>
                    <h2 className={`text-[28px] font-bold  max-[600px]:text-[22px]`}>Product reviews</h2>
                    <div>
                        {
                            reviewData.length > 0 ?
                                reviewData.map((review, index) =>
                                    <div key={index} className={`mt-14`}>
                                        <div
                                            className={`flex justify-between border-slate-200 border-t-2 pt-2 items-center`}>
                                            <div className={`text-[22px] max-[600px]:text-[18px]`}>
                                                <img className={`w-[100px] h-[100px] rounded-full`} src={review.ava === '' ? avatarBlank : review.ava} alt=""/>
                                                <b>Created by: {review.userName}</b>
                                            </div>
                                            <span className={`text-gray-500`}>
                                                <b>{review.reviewDate}</b>
                                            </span>
                                        </div>

                                        <StarsRating value={review.rate} disabled/>
                                        <div className={`flex flex-col gap-2 text-[18px] max-[600px]:text-[16px]`}>
                                            <b>Comment:</b>
                                            <p>{review.reviewText}</p>
                                        </div>
                                    </div>
                                )
                                :
                                <div>There are no reviews for this product yet</div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;