import React, {FC, useEffect, useState} from 'react';
import ProductsFilters from "./ProductsFilters";
import ProductsList from "./ProductsList";
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {savePriceRange, saveProducts} from "../../redux/slices/productSlice";
import SkeletonLoader from "../MiniComponents/SkeletonLoader";
import conditionalProducts from "./conditionalProducts";
import {IProduct} from "../Admin/ListGoods";
import { FaCogs } from 'react-icons/fa';


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
    const [currentPrice, setCurrentPrice] = useState<any>(200)
    const {filteredResults} = useAppSelector(state => state.filters)

    const [hideFilters, setHideFilters] = useState(true)


    useEffect(() => {
        dispatch(saveProducts(data))



    }, [data, dispatch])

    useEffect(() => {

        let filteredBySearchValueProducts: any[] = []
      // let  filteredByPriceProducts =  products.filter((product) => product.price <= currentPrice)

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





    return (
        <section className={'w-full  bg-gray-50 pb-40'} >
            <div className={'max-w-[1280px] mx-auto flex relative pt-8'}>
                <aside
                    className={hideFilters ?
                        `w-1/5 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-gray-50 
                        max-[970px]:absolute max-[970px]:left-[-200%] max-[768px]:h-full max-[970px]:z-10 pl-2`
                        :
                        `w-1/5 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-gray-50 
                        max-[970px]:absolute max-[970px]:h-full max-[970px]:z-10 left-0 pl-2`}>
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
                </aside>
                <div className={'w-4/5 pl-2 max-[970px]:w-full'} ref={productListRef}>
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
                                          currentBrand={currentBrand}
                                          setCurrentPrice={setCurrentPrice}
                                          currentPrice={currentPrice} />
                    }
                    <div onClick={() => setHideFilters(!hideFilters)}
                        className={`hidden justify-center items-center absolute right-0 top-0 
                        cursor-pointer max-[970px]:flex`}>
                        <FaCogs size={`20`} className={`text-green-500`}/>
                        <span>{hideFilters ? `Show Filters` : `Hide Filters`}</span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Products;