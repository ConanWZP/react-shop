import React, {FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchDoc from "../hooks/useFetchDoc";
import {useAppSelector} from "../hooks/customHooks";
import StarsRating from 'react-star-rate';
import {addDoc, collection, Timestamp} from "firebase/firestore";
import {database} from "../firebaseConfig";
import {toast} from "react-toastify";

const CreatingReviewPage = () => {

    const [rate, setRate] = useState<any>(0)
    const [reviewText, setReviewText] = useState('')

    const {userID, userName, avatar} = useAppSelector(state => state.auth)

    const params = useParams()

    const [productData, setProductData] = useState<any>()

    const {documentData, loading} = useFetchDoc('products', params?.id)

    useEffect(() => {
        setProductData(documentData)
    }, [documentData])


    const handleSubmitReview = async (e: FormEvent) => {
        e.preventDefault()


        const date = new Date();
        const currentDate = date.toDateString()

        const reviewData = {
            rate,
            reviewText,
            reviewDate: currentDate,
            userID,
            userName,
            productID: params?.id,
            createdAt: Timestamp.fromDate(new Date())
        }

        try {
            await addDoc(collection(database, 'reviews'), reviewData)
            toast.success('The review was created')
            setReviewText('')
            setRate(0)

        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return (
        <section className={`w-full flex-auto bg-gray-100`}>
            <div className={`pt-20 max-w-[900px] mx-auto px-2 pb-2`}>
                {
                    productData ?
                        <>
                            <h2 className={`text-[32px] font-bold`}>Rate the product</h2>
                            <div className={`flex flex-col items-center`}>
                                <div className={`text-[22px] font-[600] mb-2`}>{productData?.name}</div>
                                <div className={`flex flex-wrap bg-white w-full items-center justify-center gap-2 p-1`}>
                                    {
                                        productData?.imageURLs.map((imageURL: string, index: number) => (
                                            <img key={index} src={imageURL} className={`w-[200px] h-[200px] object-contain`}/>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className={`shadow-xl bg-white px-2 py-3 rounded-[10px]`}>
                                <form onSubmit={handleSubmitReview}>
                                    <div className={`flex flex-col mb-4 text-[20px]`}>
                                        <label>Rating:</label>
                                        <StarsRating
                                            value={rate}
                                            onChange={rate => {
                                                setRate(rate);
                                            }}
                                        />
                                    </div>
                                    <div className={`flex flex-col mb-4 text-[20px]`}>
                                        <label className={`mb-1`}>Text of review:</label>
                                        <textarea value={reviewText} required
                                                  onChange={(e) => setReviewText(e.target.value)}
                                                  rows={8} className={` rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none`}/>

                                    </div>
                                    <div className={`text-center`}>
                                        <button type={'submit'} className={`px-5 py-2 bg-green-500 text-white font-medium 
                                    text-[22px] rounded-[10px] transition-all duration-300 ease-in-out 
                                    hover:bg-green-600 active:bg-green-700`}>
                                            Create a review
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </>
                        :
                        null
                }

            </div>
        </section>
    );
};

export default CreatingReviewPage;