import React, {FC, useEffect, useState} from 'react';
import ProductsFilters from "./ProductsFilters";
import ProductsList from "./ProductsList";
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {savePriceRange, saveProducts} from "../../redux/slices/productSlice";
import SkeletonLoader from "../MiniComponents/SkeletonLoader";
import conditionalProducts from "./conditionalProducts";
import {IProduct} from "../../types";
import styles from './products.module.scss';
import {AiOutlineClose} from "react-icons/ai";


interface ProductsProps {
    productListRef: React.Ref<any>
}

const Products:FC<ProductsProps> = ({productListRef}) => {

    const dispatch = useAppDispatch()
    const {data, loading} = useFetchCollection('products')
    const {products} = useAppSelector(state => state.product)
    const [searchValue, setSearchValue] = useState('')
    const [sortValue, setSortValue] = useState('last')
    const [currentCategory, setCurrentCategory] = useState('All')
    const [currentBrand, setCurrentBrand] = useState('All')
    const [currentPrice, setCurrentPrice] = useState(200)

    const [hideFilters, setHideFilters] = useState(true)


    useEffect(() => {
        dispatch(saveProducts(data))
    }, [data, dispatch])

    useEffect(() => {

        let filteredBySearchValueProducts: IProduct[]

        if (searchValue !== '') {
            filteredBySearchValueProducts = products.filter((product: IProduct) => {
                return (
                    product?.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.category.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.brand.toLowerCase().includes(searchValue.toLowerCase())
                )
            })
        } else {
            filteredBySearchValueProducts = products
        }

        const {productsArray} = conditionalProducts(filteredBySearchValueProducts, currentBrand, currentCategory)
        dispatch(savePriceRange({
            products: productsArray
        }))

    }, [dispatch, products, currentBrand, currentCategory, searchValue])


    if (!hideFilters) {
        document.body.classList.add(`${styles.locked}`)
    } else {
        document.body.classList.remove(`${styles.locked}`)
    }

    useEffect(() => {
        return () => {
            document.body.classList.remove(`${styles.locked}`)
        }
    }, [])

    // min-h-[calc(100vh_-_196px)]

    return (
        <section className={'w-full bg-gray-50 min-h-[calc(100vh_-_128px)]'}>
            <div className={'max-w-[1280px] mx-auto flex relative pt-16'} ref={productListRef}>
                <aside
                    className={hideFilters ?
                        `w-1/5 transition-all duration-300 ease-in-out max-[970px]:w-full max-[970px]:bg-gray-50 
                        max-[970px]:fixed top-0 max-[970px]:left-[-200%]  max-[970px]:z-20 pl-2
                         max-[970px]:h-[calc(100%-_64px)] max-[970px]:flex max-[970px]:flex-col max-[970px]:justify-center`
                        :
                        `w-1/5 transition-all duration-300 ease-in-out max-[970px]:w-full max-[970px]:bg-gray-50 
                        max-[970px]:fixed max-[970px]:h-[calc(100%-_64px)] max-[970px]:z-20 top-0 left-0 px-1 flex flex-col justify-center`}>
                    <>

                    {
                        loading ?
                            null
                            :
                            <ProductsFilters setSortValue={setSortValue}
                                             setSearchValue={setSearchValue}
                                             searchValue={searchValue}
                                             setCurrentCategory={setCurrentCategory}
                                             currentCategory={currentCategory}
                                             setCurrentBrand={setCurrentBrand}
                                             currentBrand={currentBrand}
                                             setCurrentPrice={setCurrentPrice}
                                             currentPrice={currentPrice}
                            />
                    }
                    </>
                </aside>
                {
                        <div className={`fixed top-16 right-1 z-40 pt-2  ${hideFilters ? 'invisible ' : 'transition-all visible delay-300 duration-300 ease-in-out'}   `}>
                            <AiOutlineClose size={28} className={'cursor-pointer text-black'}
                                            onClick={() => setHideFilters(true)}/>
                        </div>
                }
                <div className={'w-4/5 px-1 max-[970px]:w-full max-[720px]:px-0.5'}  >
                    {
                        loading ?
                            <div className={'grid grid-cols-3 gap-3'}>
                                {[...new Array(9)].map((e, index) => (
                                    <SkeletonLoader key={index} />
                                ))}
                            </div>
                            :
                            <ProductsList productListRef={productListRef}
                                products={products}
                                          setSearchValue={setSearchValue}
                                          setSortValue={setSortValue}
                                          searchValue={searchValue}
                                          sortValue={sortValue}
                                          currentCategory={currentCategory}
                                          currentBrand={currentBrand}
                                          setCurrentPrice={setCurrentPrice}
                                          currentPrice={currentPrice}
                                          setHideFilters={setHideFilters}
                                          hideFilters={hideFilters}

                            />
                    }
                </div>
            </div>
        </section>
    );
};

export default Products;