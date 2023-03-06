import React, {FC, useEffect, useState} from 'react';
import ProductsFilters from "./ProductsFilters";
import ProductsList from "./ProductsList";
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {savePriceRange, saveProducts} from "../../redux/slices/productSlice";
import SkeletonLoader from "../MiniComponents/SkeletonLoader";
import conditionalProducts from "./conditionalProducts";


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
    const {filteredResults} = useAppSelector(state => state.filters)


    useEffect(() => {
        dispatch(saveProducts(data))



    }, [data, dispatch])

    useEffect(() => {

        const {productsArray} = conditionalProducts(products, currentBrand, currentCategory)


        dispatch(savePriceRange({
            products: productsArray
        }))

    }, [dispatch, products, currentBrand, currentCategory])





    return (
        <section className={'w-full pt-5 bg-gray-50 pb-40'} >
            <div className={'max-w-[1280px] mx-auto flex '}>
                <aside className={'w-1/5 transition-all duration-300 ease-in-out'}>
                    {
                        loading ?
                            null
                            :
                            <ProductsFilters setSortValue={setSortValue}
                                             setSearchValue={setSearchValue}
                                             setCurrentCategory={setCurrentCategory}
                                             currentCategory={currentCategory}
                                             setCurrentBrand={setCurrentBrand}
                                             currentBrand={currentBrand}/>
                    }
                </aside>
                <div className={'w-4/5 pl-2'} ref={productListRef}>
                    {
                        loading ?
                            <div className={'grid grid-cols-3 gap-3'}>
                                {[...new Array(9)].map((e, index) => (
                                    <SkeletonLoader key={index} />
                                ))}
                            </div>
                            :
                            <ProductsList products={products}
                                          setSearchValue={setSearchValue}
                                          setSortValue={setSortValue}
                                          searchValue={searchValue}
                                          sortValue={sortValue}
                                          currentCategory={currentCategory}
                                          currentBrand={currentBrand} />
                    }

                </div>
            </div>
        </section>
    );
};

export default Products;