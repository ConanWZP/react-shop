import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {toast} from "react-toastify";
import {database} from "../../firebaseConfig";


interface IProduct {
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

    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
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
        getProducts()
    }, [])

    // console.log(products[0].imageURLs[0])


    return (
        <div className={'overflow-x-auto'}>
            <h2 className={'text-[44px] text-center font-bold'}>Product List</h2>
            {products.length === 0 ?
                <div>Products wasn't found</div>
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
                                <td className={'text-center'}>{product?.price}</td>
                                <td >
                                    <div className={'flex justify-center gap-3'}>
                                        <AiFillEdit className={'text-blue-500 '} />
                                        <AiFillDelete className={'text-red-500'} />
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