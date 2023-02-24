import {collection, deleteDoc, doc, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {toast} from "react-toastify";
import {database, storage} from "../../firebaseConfig";
import {Link} from "react-router-dom";
import Loader from "../MiniComponents/Loader";
import {deleteObject, ref} from 'firebase/storage';
import Notiflix from 'notiflix';
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {saveProducts} from "../../redux/slices/productSlice";
import useFetchCollection from "../../hooks/useFetchCollection";
import {log} from "util";


export interface IProduct {
    brand: string,
    category: string,
    createdAt: any,
    description: string,
    id: string,
    imageURLs: string[],
    name: string,
    price: number
}

const ListGoods = () => {

    const {data, loading} = useFetchCollection('products')
    const {products} = useAppSelector(state => state.product)




  //  const [products, setProducts] = useState<any>([])
  //  const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(saveProducts(data))
    }, [data, dispatch])

  /*  useEffect(() => {
        const getProducts = () => {
            setLoading(true)

            try {

                const q = query(collection(database, 'products'), orderBy('createdAt', 'desc'));
                onSnapshot(q, async (querySnapshot) => {
                    // const cities = [];
                    console.log(querySnapshot)
                    const goods = querySnapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            }
                        }
                    )
                    console.log(goods)
                    setProducts(goods)
                    setLoading(false)
                    dispatch(saveProducts(goods))


                    /!*await querySnapshot.forEach((doc) => {
                        products.push(doc.data().name);
                    });*!/
                    // console.log("Current cities in CA: ", cities.join(", "));
                });


            } catch (e: any) {
                toast.error(e.message)
                setLoading(false)
            }
        }
        getProducts()
    }, [])*/

    const confirmRemove = (id: string, imageURLs: string[]) => {
        Notiflix.Confirm.show(
            'Remove the product',
            'Do you really want to remove the product?',
            'Remove',
            'Cancel',
            function okCb() {
                deleteGood(id, imageURLs)
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

    const deleteGood = async (id: string, imageURLs: string[]) => {
        try {
            await deleteDoc(doc(database, 'products', id))

           await imageURLs.forEach((imageUrl) => {
               deleteObject(ref(storage, imageUrl))
            })

            toast.success('The product was delete')


        } catch (e: any) {
            toast.error(e.message)
        }
    }

    if (loading) {
        return  <Loader />
    }


    return (
        <div className={'overflow-x-auto'}>
            <h2 className={'text-[44px] text-center font-bold'}>Product List</h2>
            {products.length === 0 ?
                <div className={'text-[22px] font-medium'}>Products wasn't found</div>
                :
                <>

                    <table className={'w-full border-collapse text-xl mb-10'}>
                        <thead className={'border-t-2 border-b-2 border-blue-500'}>
                        <tr className={'border-b border-gray-300'}>
                            <th className={'border border-gray-300 px-3'}>I\D</th>
                            <th className={'border border-gray-300 px-3'}>Image</th>
                            <th className={'border border-gray-300 px-3'}>Name</th>
                            <th className={'border border-gray-300 px-3'}>Category</th>
                            <th className={'border border-gray-300 px-3'}>Price</th>
                            <th className={'border border-gray-300 px-3'}>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product: IProduct, index: number) => (
                            <tr key={product?.id} className={`${index%2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                <td className={'align-middle text-center'}>{index + 1}</td>
                                <td><img src={product?.imageURLs[0]} className={'w-[120px] p-4 object-contain h-[120px] '}
                                         alt={product?.name}/></td>
                                <td >{product?.name.length > 40 ? `${product.name.slice(0, 40)}...` : product.name }</td>
                                <td className={'text-center'}>{product?.category}</td>
                                <td className={'text-center'}>{product?.price}$</td>
                                <td >
                                    <div className={'flex justify-center gap-3'}>
                                        <Link to={`/admin/add-good/${product.id}`}>
                                            <AiFillEdit size={22} className={'text-blue-500 '} />
                                        </Link>
                                        <AiFillDelete size={22} className={'text-red-500 cursor-pointer'}
                                                      onClick={() => confirmRemove(product.id, product?.imageURLs)} />
                                    </div>


                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </>

            }
        </div>
    );
};

export default ListGoods;