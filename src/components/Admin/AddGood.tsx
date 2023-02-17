import React, {FormEvent, useEffect, useState} from 'react';
import {addDoc, collection, getDocs, query, Timestamp} from "firebase/firestore";
import {auth, database, storage} from "../../firebaseConfig";
import {AiOutlineArrowDown} from 'react-icons/ai';
import {v4 as uuidv4} from 'uuid'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {toast} from "react-toastify";
import Loader from "../Loader";
import {useNavigate} from "react-router-dom";



const AddGood = () => {

    const navigate = useNavigate()
    const [product, setProduct] = useState<any>({
        name: '',
        image: '',
        price: 0,
        category: '',
        brand: '',
        description: '',
        images: []
    })

    const [loading, setLoading] = useState(true)
    const [uploadingFile, setUploadingFile] = useState<any>(0)

    const [creatingProduct, setCreatingProduct] = useState(false)

    const [categories, setCategories] = useState<any>([])

    useEffect(() => {
        setCategories([])
        setLoading(true)
        const getCategories = async () => {
            const q = query(collection(database, 'categories'))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => setCategories((prevState: any) => [...prevState, doc.data()]));
            setLoading(false)
            console.log(categories)
        }
        getCategories()
    }, [])

    const {name, image, price, category, brand, description, images} = product

    const handleChange = (e: any) => {

        if (e.target.files) {
            setProduct({
                ...product,
                images: e.target.files
            })
        }

        if (!e.target.files) {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            })
        }

        console.log(product)
    }



    const createProduct = async (e: FormEvent) => {
        e.preventDefault()

        setCreatingProduct(true)

        try {

            const collectImage = async (image: any) => {
                return new Promise((resolve, reject) => {



                    const storageRef = ref(storage, `images/${auth.currentUser?.uid} - ${image.name} - ${uuidv4()}`)
                    const uploadTask = uploadBytesResumable(storageRef, image);
                    uploadTask.on('state_changed',
                        (snapshot) => {

                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            setUploadingFile(progress)


                        },
                        (error) => {
                            reject(error)
                            toast.error(error.message)
                        },
                        () => {

                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL)
                                console.log('File available at', downloadURL);
                                setProduct({
                                    ...product,
                                    image: downloadURL
                                })
                                toast.success('Image was uploaded')
                            });
                        }
                    );
                })
            }

            const imageURLs = await Promise.all(
                [...images].map(image => collectImage(image))
            ).catch(() => {
                toast.error(`Files weren't uploaded`)
                return
            })

            let copyFormData = {
                ...product,
                imageURLs,
                createdAt: Timestamp.fromDate(new Date())
            }

            delete copyFormData.price
            delete copyFormData.image
            delete copyFormData.images

            copyFormData = {
                ...copyFormData,
                price: Number(price)
            }

            const docRef = await addDoc(collection(database, 'products'), copyFormData)
            console.log(docRef)

            setProduct({
                name: '',
                image: '',
                price: 0,
                category: '',
                brand: '',
                description: '',
                images: []
            })
            setUploadingFile(0)
            setCreatingProduct(false)
            toast.success('The product was add')
            navigate('/admin/list-goods')

        } catch (e: any) {
            setCreatingProduct(false)
            console.log(e.message)
            toast.error(e.message)
        }
    }


    if (creatingProduct) {
        return <Loader/>
    }

    return (
        <>
            <h2 className={'text-[44px] font-bold text-center'}>Add New Good</h2>
            <form className={'shadow-xl p-8 mb-5'} onSubmit={createProduct}>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Name</span>
                    <input required name={'name'} type={'text'} placeholder={'Product Name'} value={name}
                           onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none`}/>
                </div>
                <div className={'border-2 border-black p-2 rounded-[8px] mb-4'}>
                    <div className={'flex flex-col'}>
                        {uploadingFile === 0 ?
                            null
                            :
                            <div className={'bg-gray-400 rounded-[10px] '}>
                                <div
                                    className={`bg-blue-500 rounded-[10px] text-white pl-2 py-1 font-medium whitespace-nowrap`}
                                    style={{width: `${uploadingFile}%`}}>
                                    {uploadingFile < 100 ?
                                        `Uploading ${uploadingFile}%`
                                        :
                                        `File was uploaded`
                                    }
                                </div>
                            </div>
                        }

                        <span className={'mb-1 text-[22px]'}>Image</span>
                        <input required name={'imageFile'} type={'file'} placeholder={'Product Image'}
                               accept={'image/*'} multiple
                               onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none mb-2`}/>

                        {
                            product.image === '' ?
                                null
                                :
                                <input required name={'imageFile'} type={'text'} value={image}
                                       onChange={handleChange} disabled className={`w-[50vw] rounded-[10px] p-3 border-2 
                               border-gray-300 text-[22px] focus:border-blue-500 outline-none`}/>
                        }

                    </div>

                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Price</span>
                    <input required name={'price'} type={'number'} placeholder={'Product Name'} value={price}
                           onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none`}/>
                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Category</span>
                    <div className={'relative'}>
                        <select required name={'category'} value={category} onChange={handleChange}
                                className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none appearance-none cursor-pointer`}>
                            {loading ?
                                <option value={''} disabled>Loading...</option>
                                :
                                <>
                                    <option value={''} disabled>
                                        -- empty --
                                    </option>
                                    {categories.map((categ: any) =>
                                        <option key={categ.uid} value={categ.categoryName}>
                                            {categ.categoryName}
                                        </option>
                                    )}
                                </>
                            }

                        </select>
                        <AiOutlineArrowDown size={22} className={'absolute right-7 top-5'}/>
                    </div>

                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Brand</span>
                    <input required name={'brand'} type={'text'} placeholder={'Product Brand'} value={brand}
                           onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none`}/>
                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Description</span>
                    <textarea required name={'description'} placeholder={'Description'} value={description}
                              onChange={handleChange} rows={8} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none`}/>
                </div>
                <button className={`bg-blue-500 rounded text-[24px] text-white px-6 py-2 hover:bg-blue-600 
                transition-all duration-300 ease-in-out`}>Add product
                </button>
            </form>
        </>
    );
};

export default AddGood;