import React, {FormEvent, useEffect, useState} from 'react';
import {addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc} from "firebase/firestore";
import {auth, database, storage} from "../../firebaseConfig";
import {AiOutlineArrowDown} from 'react-icons/ai';
import {v4 as uuidv4} from 'uuid'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {toast} from "react-toastify";
import Loader from "../MiniComponents/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {RiDeleteBinLine} from 'react-icons/ri'
import  './AddGood.module.scss'


const AddGood = () => {

    const params = useParams()
    console.log(params)
    const navigate = useNavigate()
    const [product, setProduct] = useState<any>({
        name: '',
        image: '',
        price: 0,
        category: '',
        brand: '',
        description: '',
        images: [],
        imageURLsPrev: []
    })

    useEffect(() => {
        setProduct({
            name: '',
            image: '',
            price: 0,
            category: '',
            brand: '',
            description: '',
            images: [],
            imageURLsPrev: []
        })
    }, [params.id])

    const [loading, setLoading] = useState(true)
    const [uploadingFile, setUploadingFile] = useState<any>(0)

    const [creatingProduct, setCreatingProduct] = useState(false)

    const [categories, setCategories] = useState<any>([])

    // сюда записываем урлы удаленных, и потом этот массив в сабмите формы проверяется на наличие строк, если строка есть, то фотка с таким урлом удалется из стораджа
    const [deletedImages, setDeletedImages] = useState<string[]>([])


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

        if (params.id !== 'add' && params.id !== undefined) {
                const getProductData = async (id: string) => {
                   let docData = await getDoc(doc(database, 'products', id))
                    if (docData.exists()) {
                        console.log(docData.data())
                        setProduct({
                            name: docData.data().name,
                            price: docData.data().price,
                            brand: docData.data().brand,
                            description: docData.data().description,
                            category: docData.data().category,
                            imageURLsPrev: docData.data().imageURLs,
                            images: []

                        })
                    }
                }
                getProductData(params.id)
        }
    }, [params.id])

    const {name, image, price, category, brand, description, images, imageURLsPrev} = product

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

    const deleteImage = (image: string) => {
        console.log(image)
        let newAr = imageURLsPrev.filter((imageURL: string) => {
            if(imageURL !== image) {
                return true
            } else {
                setDeletedImages([...deletedImages, image])
            }
        })
        setProduct({
            ...product,
            imageURLsPrev: newAr
        })

        console.log(deletedImages)

        //console.log(newAr)


    }

    const createProduct = async (e: FormEvent) => {
        e.preventDefault()

        setCreatingProduct(true)

        try {

            //let testIngArray = ['1f', '2d']

            if (images.length + imageURLsPrev.length > 6) {
                setCreatingProduct(false)
                toast.error('Maximum 6 images')
                return
            }

            if (images.length + imageURLsPrev.length === 0) {
                setCreatingProduct(false)
                toast.error('Minimum 1 image')
                return
            }


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

                                // using for update existed doc, for new product it doesn't matter
                                imageURLsPrev.push(downloadURL)
                                //

                                toast.success('Image was uploaded')
                            });
                        }
                    );
                })
            }

            console.log(product)
                const imageURLs = await Promise.all(

                    [...images].map(image => collectImage(image))
                ).catch(() => {
                    toast.error(`Files weren't uploaded`)
                    return
                })





            let copyFormData = {
                ...product,
                imageURLs: imageURLsPrev,
            }

            delete copyFormData.price
            delete copyFormData.image
            delete copyFormData.images
            delete copyFormData.imageURLsPrev

            copyFormData = {
                ...copyFormData,
                price: Number(price)
            }

            if (params.id !== 'add' && params.id !== undefined) {
                await deletedImages.forEach((imageUrl) => {
                    deleteObject(ref(storage, imageUrl))
                })
                copyFormData = {
                    ...copyFormData,
                    editedAt: Timestamp.fromDate(new Date())
                }
                await updateDoc(doc(database, 'products', params.id), copyFormData)
            } else {

                copyFormData = {
                    ...copyFormData,
                    createdAt: Timestamp.fromDate(new Date())
                }
                const docRef = await addDoc(collection(database, 'products'), copyFormData)
                console.log(docRef)
            }



            setProduct({
                name: '',
                image: '',
                price: 0,
                category: '',
                brand: '',
                description: '',
                images: [],
                imageURLsPrev: []
            })
            setUploadingFile(0)
            setCreatingProduct(false)
            if (params.id !== 'add' && params.id !== undefined) {
                toast.success('The product was edit')
            } else {
                toast.success('The product was add')
            }

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
            <h2 className={'text-[40px] font-bold text-center'}>{params.id === 'add' ? 'Add New Good' : 'Edit Product'}</h2>
            <form className={'shadow-xl p-8 mb-5 max-w-[1280px]'} onSubmit={createProduct}>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Name</span>
                    <input required name={'name'} type={'text'} placeholder={'Product Name'} value={name}
                           onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none max-[970px]:w-full`}/>
                </div>
                <div className={'border-2 border-black p-2 rounded-[8px] mb-4 w-[50vw]'}>
                    <div className={'flex flex-col w-full'}>
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

                        <div className={'mb-1 text-[22px] w-full'}>Image</div>
                        <input required={params.id === 'add'} name={'imageFile'} type={'file'} placeholder={'Product Image'}
                               accept={'image/*'} multiple
                               onChange={handleChange} className={`w-full rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none mb-2 max-[970px]:w-full`}/>

                        {
                            image === '' ?
                                null
                                :
                                <input required name={'imageFile'} type={'text'} value={image}
                                       onChange={handleChange} disabled className={`w-full rounded-[10px] p-3 border-2 
                               border-gray-300 text-[22px] focus:border-blue-500 outline-none mb-2 max-[970px]:w-full `}/>
                        }

                        {
                            imageURLsPrev?.length > 0 ?
                                <div className={'grid grid-cols-2 w-full'}>
                                    {imageURLsPrev.map((imageURL: string) =>
                                        <div key={imageURL} className={'w-full relative h-[220px] border border-black p-2 rounded-[10px]'}>
                                            <img className={'w-full object-contain h-full'} src={imageURL} alt={''} />
                                            <RiDeleteBinLine size={22} color={'red'}
                                              className={'absolute top-2 right-2 cursor-pointer'} onClick={()=>deleteImage(imageURL)} />
                                        </div>

                                    )}
                                </div>

                                :
                                null
                        }

                    </div>

                </div>
                <div className={'flex flex-col mb-4 '}>
                    <span className={'mb-1 text-[22px]'}>Price</span>
                    <div className={'relative '}>
                        <input required name={'price'} type={'number'} placeholder={'Product Price'} value={price}
                               onChange={handleChange} className={`w-[50%] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none pr-10`}/>
                        <div className={'text-[22px] absolute top-[14px] left-[46%] '}>$</div>
                    </div>

                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Category</span>
                    <div className={'relative'}>
                        <select required name={'category'} value={category} onChange={handleChange}
                                className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none rounded-r-none cursor-pointer max-[970px]:w-full`}>
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
                        {/*<AiOutlineArrowDown size={22} className={'absolute right-7 top-5'}/>*/}
                    </div>

                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Brand</span>
                    <input required name={'brand'} type={'text'} placeholder={'Product Brand'} value={brand}
                           onChange={handleChange} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none max-[970px]:w-full`}/>
                </div>
                <div className={'flex flex-col mb-4'}>
                    <span className={'mb-1 text-[22px]'}>Description</span>
                    <textarea required name={'description'} placeholder={'Description'} value={description}
                              onChange={handleChange} rows={8} className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none max-[970px]:w-full`}/>
                </div>
                <button className={`bg-blue-500 rounded text-[24px] text-white px-6 py-2 hover:bg-blue-600 
                transition-all duration-300 ease-in-out`}>{params.id === 'add' ? 'Add Product' : 'Edit Product'}
                </button>
            </form>
        </>
    );
};

export default AddGood;