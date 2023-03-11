import React, {FC, useEffect, useState} from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import SearchInput from "../MiniComponents/SearchInput";
import {IProduct} from "../Admin/ListGoods";
import ProductItem from "./ProductItem";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import { searchProducts, sortProductsBy } from '../../redux/slices/filtersSlice';
import conditionalProducts from "./conditionalProducts";
import Pagination from "../Pagination/Pagination";

interface IProductsListProps {
   products: IProduct[],
    setSearchValue: (e:string) => void,
    searchValue: string,
    setSortValue: (e: string) => void,
    sortValue: string,
    //setCurrentCategory: (e: string) => void,
    currentCategory: string,
   // setCurrentBrand: (e: string) => void,
    currentBrand: string,
    setCurrentPrice: (e: any) => void,
    currentPrice: any

}

const ProductsList:FC<IProductsListProps> = ({products, sortValue,
                                                 setSortValue, setSearchValue,
                                                 searchValue, currentCategory,
                                                 currentBrand, setCurrentPrice, currentPrice}) => {

    const dispatch = useAppDispatch()


    const { filteredResults } = useAppSelector(state => state.filters)
    // const {maxPrice} = useAppSelector(state => state.product)

    const [isGrid, setIsGrid] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberDisplayedProducts, setNumberDisplayedProducts] = useState(3)

    const lastProductIndexOfCurrentPage = currentPage * numberDisplayedProducts
    const firstProductIndexOfCurrentPage = lastProductIndexOfCurrentPage - numberDisplayedProducts

    const productsResult = filteredResults.slice(firstProductIndexOfCurrentPage, lastProductIndexOfCurrentPage)







    useEffect(() => {

        let filteredByPriceProducts: any[]

     //   if (searchValue !== '') {
            filteredByPriceProducts =  products.filter((product) => product.price <= currentPrice)
      //  } else {
       //     filteredByPriceProducts = products
       // }


        const {productsArray} = conditionalProducts(filteredByPriceProducts, currentBrand, currentCategory)
        setSortValue('last')
            dispatch(searchProducts({
                products: productsArray,
                searchValue
            }))

    }, [searchValue, dispatch, currentPrice])



    useEffect(() => {
        dispatch(sortProductsBy({
            products: filteredResults,
            sortValue
        }))
    }, [sortValue, dispatch])

    if (products.length === 0) {
        return <div>Nothing weren't found</div>
    }

    return (
        <div className={'w-full'} id={'product'}>
            <div className={'w-full border-b-2 border-slate-400 flex justify-between items-center mb-6'}>

                <div className={'flex gap-3 mb-1 items-center max-[720px]:flex-col-reverse'}>
                    <div className={`flex gap-3 items-center`}>
                        <FaThList size={22} className={`cursor-pointer ${!isGrid ? 'text-green-500' : ''}`} onClick={() => setIsGrid(false)} />
                        <BsGridFill size={22} className={`cursor-pointer ${isGrid ? 'text-green-500' : ''}`} onClick={() => setIsGrid(true)} />
                    </div>

                    <div>
                        <span>{filteredResults?.length}</span> products were found
                    </div>
                </div>

                <div className={'mb-1'}>
                    <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} />
                </div>

                <div className={'mb-1'}>
                    <span className={'font-bold'}>Sort by: </span>
                    <select value={sortValue} onChange={(e) => setSortValue(e.target.value)}
                        className={`w-[10vw] rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none appearance-none cursor-pointer`}>
                        <option value="last">Latest</option>
                        <option value="low-price">Lowest Price</option>
                        <option value="high-price">Highest Price</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
            </div>


            <div className={isGrid ? `grid grid-cols-3 gap-2 mb-4 max-[720px]:grid-cols-2` : `flex flex-col gap-4 mb-4`}>


                {
                    productsResult?.length > 0 ?
                        productsResult?.map((product) => (
                                    <ProductItem key={product.id} product={product} isGrid={isGrid} />
                            ))
                        :
                        <span>There are no goods</span>
                }
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        numberDisplayedProducts={numberDisplayedProducts} totalCountProducts={filteredResults.length} />
        </div>
    );
};

export default ProductsList;